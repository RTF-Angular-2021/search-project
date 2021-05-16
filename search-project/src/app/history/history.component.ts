import {Component,Input} from '@angular/core';
import {History} from "../app.component";

@Component({
  selector:'app-history',
  templateUrl:'./history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent{

  @Input() request:History;
}
