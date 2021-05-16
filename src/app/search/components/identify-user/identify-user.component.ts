import { Component } from '@angular/core';
import { of } from 'rxjs';
import { IdentifyUserService } from '../../data/services/identify-user.service';
import { switchMap, debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
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

  public findControl: FormControl = new FormControl();
  public setting = Settings;
  public user: User = null;
  public repository: Repository = null;
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
        if (response === null) {
          this.user = null;
          this.repository = null;
          this.error = false;
        } else if (response !== null && response.total_count === 0) {
          this.error = true;
        }

        if (this.isUserSearchActive && response !== null && response.total_count) {
          this.user = response as User;
        } else if(this.isRepoSearchActive && response !== null && response.total_count) {
          this.repository = response as Repository;
        } 
      });
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
