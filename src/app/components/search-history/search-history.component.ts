import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent {
  public history?: Array<string>;

  constructor() {
    interval(1000).subscribe(() => {
      const localHistory = localStorage.getItem('history');
      if (localHistory) {
        this.history = JSON.parse(localHistory).reverse();
      }
    });
  }

  public clearHistory() {
    localStorage.setItem('history', JSON.stringify([]));
  }
}
