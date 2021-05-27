import { Component, Input, OnInit } from '@angular/core';
import {SearchResult} from '../SearchResult'

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  @Input() info! : SearchResult
  UpdatedAt : String = '';
  constructor() { }

  ngOnInit(): void {
    this.UpdatedAt = this.info.timestamp.slice(0,10);
  }

}
