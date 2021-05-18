import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/data.service";

export interface CardResult{
  name:string;
  img_user:string;
  url:string;
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

export class AppComponent implements OnInit {
  title = 'search-project';
  visibility: boolean = false;
  visibility2: boolean = false;
  search_object:string = "rep";
  cards:CardResult[] = [];
  historyRequests:History[] = [
    {title_request:"Angular",info:"12.03.2001"},
    {title_request:"React",info:"13.03.2001"},
    {title_request:"JS",info:"14.03.2001"},
    {title_request:"TypeScript",info:"15.03.2001"},
  ];

  constructor(private httpService: HttpService){};

  show_settings(){
    this.visibility=!this.visibility;
    if (this.visibility === true && this.visibility2 == true)
      this.visibility2 = false;
  }

  show_history() {
    this.visibility2=!this.visibility2;
    if (this.visibility2 === true && this.visibility == true)
      this.visibility = false;
  }

  search_request() {
    let search_query = document.querySelector("input").value;
    if (this.search_object === "users")
      this.httpService.getUserData(search_query).subscribe((data) => this.cards = data);
    else if (this.search_object === "rep")
      this.httpService.getRepositoryData(search_query).subscribe((data) => this.cards = data);
  }

  ngOnInit(){
    let select_obj:HTMLSelectElement = document.querySelector(".objectType");
    let select_sort:HTMLSelectElement = document.querySelector(".sortType");
    select_obj.addEventListener('change', () => {
      this.search_object = select_obj.value;
      console.log(select_obj.value)
    });
    select_sort.addEventListener('change', () => {
      console.log(select_sort.value);
    });
  }
}
