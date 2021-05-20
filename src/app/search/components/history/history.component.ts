import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { UserModel } from '../../data/models/identify-user.model';
import { RepositoryModel } from '../../data/models/repository.model';
import { IdentifyUserService } from '../../data/services/identify-user.service';
import { IOptions, LocalStorageService } from '../../data/services/local-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./styles/history.component.css']
})
export class HistoryComponent implements OnInit {

  public data: any[] = [];

  @Output()
  public repeat: EventEmitter<any> = new EventEmitter();

  constructor(
    private githubService: IdentifyUserService,
    private localStorageService: LocalStorageService
  ) { }

  public ngOnInit(): void {
    fromEvent(window, 'storage')
    interval(500).subscribe(
      () => this.data = JSON.parse(this.localStorageService.getFromLocalStorage("data1"))
    )
  }

  public resetHistory(): void {
    this.localStorageService.removeFromLocalStorage("data1");
  }

  public repeatAction(id: number): void {
    const options = JSON.parse(this.localStorageService.getFromLocalStorage("data1"))[id].options;
    if (options.user) {
      this.githubService.searchUser(JSON.parse(this.localStorageService.getFromLocalStorage("data1"))[id].value).subscribe(response => {
        this.githubService.setUser(response as UserModel);
      });
      const userObject: IRepeatAction = {
        result: this.githubService.getUser(),
        id,
        options
      }
      this.repeat.emit(userObject);
    } else if (options.repo) {
      this.githubService.searchRepository(JSON.parse(this.localStorageService.getFromLocalStorage("data1"))[id].value).subscribe(response => {
        this.githubService.setRepository(response as RepositoryModel);
      });
      const repoObject: IRepeatAction = {
        result: this.githubService.getRepo(),
        id,
        options
      }
      this.repeat.emit(repoObject)
    }
  }
}

export interface IRepeatAction {
  result: UserModel | RepositoryModel,
  id: number,
  options: IOptions
}
