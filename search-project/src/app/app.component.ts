import { Component } from '@angular/core';

export interface CardResult{
  title_nick:string;
  description:string
}

export interface History{
  title_request:string;
  info:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'search-project';
  visibility: boolean = false;
  visibility2: boolean = false;
  cards:CardResult[] = [
    {title_nick:"Github profile 1",description:"description "},
    {title_nick:"Github profile 2",description:"description description "},
    {title_nick:"Github profile 3",description:"description description description"},
    {title_nick:"Github profile 4",description:"description description description description"}
    ];
  historyRequests:History[] = [
    {title_request:"Angular",info:"12.03.2001"},
    {title_request:"React",info:"13.03.2001"},
    {title_request:"JS",info:"14.03.2001"},
    {title_request:"TypeScript",info:"15.03.2001"},
  ]

  show(){
    this.visibility=!this.visibility;
    if (this.visibility === true && this.visibility2 == true)
      this.visibility2 = false;
  }

  show2() {
    this.visibility2=!this.visibility2;
    if (this.visibility2 === true && this.visibility == true)
      this.visibility = false;
  }

}
