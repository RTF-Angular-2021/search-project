import {Component,Input} from '@angular/core';
import {CardResult} from "../app.component";

@Component({
  selector:'app-result',
  templateUrl:'./result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent{

  @Input() card:CardResult;
}

