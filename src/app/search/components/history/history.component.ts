import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { IdentifyUserService } from '../../data/services/identify-user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public data: any[] = [];

  constructor(private githubService: IdentifyUserService) { }

  public ngOnInit(): void {
    fromEvent(window, 'storage')
    interval(1000).subscribe(
      () => this.data = JSON.parse(localStorage.getItem("data"))
    )
  }

  public resetHistory(): void {
    localStorage.removeItem("data");
  }

  public repeatAction(e: string): void {
    this.githubService.getUser(e);
  }
}
