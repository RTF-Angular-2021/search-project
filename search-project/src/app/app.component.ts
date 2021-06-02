import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {SearchResult,QueryObj} from './SearchResult'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Wiki-app';
  pages:Array<SearchResult>=[];
  history:Array<String>=[];
  orderBy: string = 'relevance';
  averageWordCount:number = 0;
  constructor(private http:HttpClient){}  
  ngOnInit(): void {
    for (let i = 0;i < localStorage.length;i++) {
      this.history.push(localStorage[i.toString()]);
    }
  }

  ClearHistory(e : Event) {
    this.history = [];
    localStorage.clear();
  }

  ShowHistory(e : any) {
    const history = document.querySelector('.history-list');
    if (history?.classList.contains('show-history-list')) {
      history?.classList.remove('show-history-list');
    }
    else 
      history?.classList.add('show-history-list');
  }

  ShowSettings(e : any) {
    const settings = document.querySelector('.settings-panel');
    if (settings?.classList.contains('show-settings')) {
      settings?.classList.remove('show-settings');
    }
    else 
    settings?.classList.add('show-settings');
  }

  SelectFilterOption(e : any) {
    this.orderBy = (document.querySelector('.filter') as HTMLSelectElement).value;
    console.log(this.orderBy);
  }

  async GetInfoFromWiki(input: string) {
    return this.http.get<any>('https://ru.wikipedia.org/w/api.php', {
            params:{
                action:'query',
                list:'search',
                srsearch: input || "evgen",
                utf8:'1',
                format:'json',
                origin:'*',
                srlimit: 100,
                srsort:this.orderBy
            }
        })
  }

  onClick(e : any) {
    e.preventDefault();
    const container = document.querySelector('.container');
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    let input = searchInput.value;
    if (e.target.tagName == 'LI') {
      input = e.target.textContent;
      searchInput.value = input;
    }
    else {
      localStorage.setItem(this.history.length.toString(),input);
      this.history.push(input);
    }
    const searchGif = document.querySelector('.searching-gif');
    const notFound = document.querySelector('.not-found');
    const error = document.querySelector('.error');
    this.pages = [];
    
    searchGif?.classList.remove('hide');
    notFound?.classList.add('hide');
    error?.classList.add('hide');
    this.GetInfoFromWiki(input)
    .then(response => {
      container?.classList.add('zero-top');
      setTimeout(() => {
        response.subscribe(x => {
          this.pages = x.query.search;
          if (document.contains(document.querySelector('.no-match'))) {
            document.querySelector('.no-match')?.remove();
          }
          if (this.pages.length == 0) {
            const notFound = document.querySelector('.not-found');
            notFound?.classList.remove('hide');
          }
          else {
            notFound?.classList.add('hide');
          }
          let avg = 0;
          this.pages.forEach(item => {
            avg += item.wordcount;
            var wrapper= document.createElement('li');
            wrapper.insertAdjacentHTML('beforeend',item.snippet);
            item.snippet = wrapper.textContent + '...' || '' + '...';
          })
          if (this.pages.length != 0)
            this.averageWordCount = Math.round(avg / this.pages.length);
        },(err) => {
          error?.classList.remove('hide');
          
        })
        searchGif?.classList.add('hide');
      },1000)
    })
  }
}
