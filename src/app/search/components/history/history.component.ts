import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { IdentifyUserService } from '../../data/services/identify-user.service';
import { LocalStorageService } from '../../data/services/local-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./styles/history.component.css']
})
export class HistoryComponent implements OnInit {

  public data: any[] = [];

  constructor(
    private githubService: IdentifyUserService,
    private localStorageService: LocalStorageService
  ) { }

  public ngOnInit(): void {
    fromEvent(window, 'storage')
    interval(1000).subscribe(
      () => this.data = JSON.parse(this.localStorageService.getFromLocalStorage("data"))
    )
  }

  public resetHistory(): void {
    this.localStorageService.removeFromLocalStorage("data");
  }

  public repeatAction(e: string): void {
    this.githubService.getUser(e);
  }
}
