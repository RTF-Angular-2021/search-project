import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TwitchApiService } from 'src/app/twitch-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  @Input() searchQuery: string = '';

  foundItems: Array<{name: string, id: string, box_art_url: string}> = [];
  scrolled: boolean = false;

  constructor(
    private twitchService: TwitchApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  public searchNew() {
    this.twitchService.trySearchCategories(this.searchQuery, false)
    .subscribe(succeed => {
      if (!succeed) {
        console.log(`Поиск по запросу неуспешен`);
      } else {
        this.foundItems = this.twitchService.getLastSearchData();
        console.log(this.foundItems);
      }
    });

  }

  public doDisplaySearchResult() : boolean {
    return this.searchQuery !== '';
  }

  public handleInput() {
    this.scrolled = false;

    if (this.searchQuery)
      this.searchNew();
  }

  public onScroll(event: Event) {
    const searchResult = event.currentTarget as any;

    if (searchResult.scrollHeight - searchResult.scrollTop -  searchResult.clientHeight <= 40 && !this.scrolled) {
      this.scrolled = true;

      this.twitchService.trySearchCategories(this.searchQuery, true)
      .subscribe(succeed => {
        if (!succeed) {
          console.log(`Поиск по запросу неуспешен`);
        } else {
          this.foundItems = this.foundItems.concat(this.twitchService.getLastSearchData());
          this.scrolled = false;
        }
      });
    }
  }

}
