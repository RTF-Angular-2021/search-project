import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Settings } from './search/components/settings/settings.component';
import { UserModel } from './search/data/models/identify-user.model';
import { RepositoryModel } from './search/data/models/repository.model';
import { IdentifyUserService } from './search/data/services/identify-user.service';
import { LocalStorageService } from './search/data/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public changingValue: Subject<void> = new Subject();
  public findControl: FormControl = new FormControl();
  public setting = Settings;
  public user: UserModel = null;
  public repository: RepositoryModel = null;
  public error: boolean = false;
  public isUserSearchActive: boolean = true; //по умолчанию поиск по пользователям
  public isRepoSearchActive: boolean = false;
  public showSettings: boolean = false;
  public sortFromOldToNew: boolean = true;
  public sortFromNewToOld: boolean = false;
  public sortRelev: boolean = false;
  public responseCount: number = 0;
  public searchTitleUser: string;
  public searchTitleRepo: string;

  constructor(
    private githubService: IdentifyUserService,
    private localStorageService: LocalStorageService
  ) { }

  public ngAfterViewInit(): void {
    this.findControl.valueChanges
      .pipe(
        debounceTime(1000),
        tap((val: string): void => {
          this.localStorageService.addToLocalStorage(val, { user: this.isUserSearchActive, repo: this.isRepoSearchActive, normalSort: this.sortFromNewToOld, reverseSort: this.sortFromOldToNew });
        }),
        distinctUntilChanged(),
        switchMap(e => {
          if (e !== "") {
            if (this.isUserSearchActive) {
              this.searchTitleUser = e;
              return this.githubService.searchUser(e);
            } else {
              this.searchTitleRepo = e;
              return this.githubService.searchRepository(e);
            }
          } else {
            return of(null)
          }
        })
      )
      .subscribe(response => {
        if (response && response.total_count) {
          this.responseCount = response.total_count;
        }
        if (response === null) {
          this.user = null;
          this.repository = null;
          this.error = false;
        } else if (response !== null && response.total_count === 0) {
          this.error = true;
        }

        if (this.isUserSearchActive && response !== null && response.total_count) {
          this.githubService.setUser(response as UserModel);
          this.user = this.githubService.getUser();
        } else if (this.isRepoSearchActive && response !== null && response.total_count) {
          this.githubService.setRepository(response as RepositoryModel);
          this.repository = this.githubService.getRepo();
        }
      });
  }

  public send(e: any) {
    if (e[2].user) {
      this.githubService.setUser(e[0]);
      this.user = this.githubService.getUser();
      if (this.user && this.user.total_count) {
        this.responseCount = this.user.total_count;
      }
    } else if (e[2].repo) {
      this.githubService.setRepository(e[0]);
      this.repository = this.githubService.getRepo();
      if (this.repository && this.repository.total_count) {
        this.responseCount = this.repository.total_count;
      }
    }
  }

  public checkButton(event: Event): void {
    if (!this.isUserSearchActive) {
      this.isUserSearchActive = (event as unknown as Settings === this.setting.users) ? true : false;
      if (this.isUserSearchActive) {
        this.isRepoSearchActive = false;
      }
    }
    if (!this.isRepoSearchActive) {
      this.isRepoSearchActive = (event as unknown as Settings === this.setting.repository) ? true : false;
      if (this.isRepoSearchActive) {
        this.isUserSearchActive = false;
      }
    }
    this.sortFromNewToOld = (event as unknown as Settings === this.setting.newToOld) ? true : false;
    this.sortFromOldToNew = (event as unknown as Settings === this.setting.oldToNew) ? true : false;
    this.sortRelev = (event as unknown as Settings === this.setting.relevance) ? true : false;
    this.changingValue.next();
  }

  public changeStatus(status: boolean): void {
    this.showSettings = status;
  }

}

