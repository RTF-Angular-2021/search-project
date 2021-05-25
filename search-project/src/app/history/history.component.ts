import {Component, Input, Output,EventEmitter} from '@angular/core';
import {History} from "../app.component";

@Component({
  selector:'app-history',
  templateUrl:'./history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent{

  @Input() request:History;

  @Output() Event = new EventEmitter<string>();

  callParent(query): void {
    document.querySelector("input").value = query;
    this.Event.next();
  }
}
