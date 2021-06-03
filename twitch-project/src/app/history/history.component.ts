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
    const item = localStorage.getItem("queryStorage");
    const stringArray = item ? JSON.parse(item) : [];
    for (const item of stringArray){
      this.history.push(new History(item));
    }
  } 
}




