import { Component, OnInit } from '@angular/core';
import { TwichApiService } from '../services/twitch-api.service';
import { History } from './history.models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public history: History[];

  constructor() {
    this.history = [];
  }

  public ngOnInit(): void {
    const tmp = localStorage.getItem("queryStorage");
    const stringsArr = tmp ? JSON.parse(tmp) : [];
    for (const item of stringsArr){
      this.history.push(new History(item));
    }
  } 
}




