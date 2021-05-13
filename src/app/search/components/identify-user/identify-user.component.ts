import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, of } from 'rxjs';
import { IdentifyUserService } from '../../data/services/identify-user.service';
import { filter, switchMap, debounceTime, catchError, tap, distinctUntilChanged, map } from 'rxjs/operators';
import { User } from '../../data/models/identify-user.model';
import { Repository } from '../../data/models/repository.model';
import { Settings } from '../settings/settings.component';
import { LocalStorageService } from '../../data/services/local-storage.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-identify-user',
  templateUrl: './identify-user.component.html',
  styleUrls: ['./styles/identify-user.component.css']
})
export class IdentifyUserComponent {

  public findControl = new FormControl();
  public setting = Settings;
  public user: User;
  public repository: Repository;
  public error: boolean = false;
  public isUserSearchActive: boolean = true;
  public isRepoSearchActive: boolean = false;
  public showSettings: boolean = false;
  public sortFromOldToNew: boolean = true;
  public sortFromNewToOld: boolean = false;
  public responseCount: number = 0;
  
  constructor(
    private githubService: IdentifyUserService,
    private localStorageService: LocalStorageService
  ) { }

  public ngAfterViewInit(): void {
    this.findControl.valueChanges
      .pipe(
        debounceTime(1000),
        tap((val: string): void => {
          this.localStorageService.addToLocalStorage(val, {user: this.isUserSearchActive, repo: this.isRepoSearchActive, normalSort: this.sortFromNewToOld, reverseSort: this.sortFromOldToNew});
        }),
        distinctUntilChanged(),
        switchMap(e => {
          if (e !== "") {
            return this.isUserSearchActive ? this.githubService.getUser(e) : this.githubService.getRepository(e);
          } else {
            return of(null)
          }
        })
      )
      .subscribe(response => {
        this.responseCount = response.total_count;
        if (response && !response.total_count) {
          this.error = true;
        }
        if (!this.user && !this.repository) {
          this.isUserSearchActive ? this.user = response as User : this.repository = response as Repository; //переделать логику
        } else {
          this.user = null;
          this.repository = null;
          this.error = false;
        }
      });

    /* Ну будущее:
присваивать налл не нужно, он и так по умолчанию стоит
Всю эту логику желательно в сервисе держать, туда передавать nativeElement и все
Когда юзер засетиться его получить из того же сервиса, например используя BehaviorSubject, подписавшись на юзера (или репозиторий если речь про репозиторий) */
  }

  public checkButton(event: Event): void {
    this.isUserSearchActive = (event as unknown as Settings === this.setting.users) ? true : false;
    this.isRepoSearchActive = (event as unknown as Settings === this.setting.repository) ? true : false;
    this.sortFromNewToOld = (event as unknown as Settings === this.setting.newToOld) ? true : false;
    this.sortFromOldToNew = (event as unknown as Settings === this.setting.oldToNew) ? true : false;
  }

  public changeStatus(status: boolean): void {
    this.showSettings = status;
  }

}
