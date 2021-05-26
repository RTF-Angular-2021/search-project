import { Component, OnInit } from '@angular/core';

import { TwichHttpService } from '../../data/services/twich-http.service';
import { HistoryItem } from '../../data/models/historyItem';
import { SortTypeService } from '../../data/services/sort-type.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public history: HistoryItem[];

  constructor(
    private twichService: TwichHttpService,
    private sortService: SortTypeService
  ) {
    this.history = [];
  }

  ngOnInit(): void {
    const tmp = localStorage.getItem("queryStorage");
    const stringsArr = tmp ? JSON.parse(tmp) : [];
    for (const item of stringsArr){
      this.history.push(new HistoryItem(item));
    }
  }

  removeHistory() {
    this.history = [];
    localStorage.setItem("queryStorage", JSON.stringify([]));
  }

  makeRequest(item: HistoryItem) {
    this.twichService.requestType = item.requestType;
    this.twichService.first = item.quantity;
    this.sortService.sortType = item.sortType;
  }
}
