import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/data.service";
import {SortService} from "./services/sort.service";

export interface CardResult{
  name:string;
  img_user:string;
  url:string;
  keyword:string;
  create_date:string;
  total_count:number;
}

export interface History{
  request:string;
  count:number;
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
  search_sort:string = "relevance";
  cards:CardResult[] = [];
  historyRequests:History[] = [];

  constructor(private httpService: HttpService,private sortService:SortService){};

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

  errorCheck(search_query) {
    if (this.cards.length == 0){
      alert("Произошла ошибка поиска");
    }
    else {
      let req = {request: search_query, count: this.cards[0].total_count}
      this.historyRequests.push(req);
      localStorage.setItem(req.request + req.count,JSON.stringify(req));
    }
  }

  search_request() {
    let search_query = document.querySelector("input").value;
    if (this.search_object === "users") {
      switch (this.search_sort){
        case "relevance":
          this.httpService.getUserData(search_query).subscribe((data) => this.cards = this.sortService.sortByRelevance(data),
            () => "lol", () => this.errorCheck(search_query));
          break;
        case "new-old":
          this.httpService.getUserData(search_query).subscribe((data) => this.cards = this.sortService.sortByOldToNew(data).reverse(),
            () => "lol", () => this.errorCheck(search_query));
          break;
        case "old-new":
          this.httpService.getUserData(search_query).subscribe((data) => this.cards = this.sortService.sortByOldToNew(data),
            () => "lol", () => this.errorCheck(search_query));

      }
    }
    else if (this.search_object === "rep"){
      switch (this.search_sort){
        case "relevance":
          this.httpService.getRepositoryData(search_query).subscribe((data) => this.cards = this.sortService.sortByRelevance(data),
            () => "lol", () => this.errorCheck(search_query));
          break;
        case "new-old":
          this.httpService.getRepositoryData(search_query).subscribe((data) => this.cards = this.sortService.sortByOldToNew(data).reverse(),
            () => "lol", () => this.errorCheck(search_query));
          break;
        case "old-new":
          this.httpService.getRepositoryData(search_query).subscribe((data) => this.cards = this.sortService.sortByOldToNew(data),
            () => "lol", () => this.errorCheck(search_query));
      }
    }
  }

  ngOnInit(){
    let keys = Object.keys(localStorage);
    let count = keys.length;

    for (let i=0; i < count; i++) {
      this.historyRequests.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    let select_obj:HTMLSelectElement = document.querySelector(".objectType");
    let select_sort:HTMLSelectElement = document.querySelector(".sortType");
    select_obj.addEventListener('change', () => {
      this.search_object = select_obj.value;
      console.log(select_obj.value)
    });
    select_sort.addEventListener('change', () => {
      this.search_sort = select_sort.value;
      console.log(select_sort.value);
    });
  }
}
