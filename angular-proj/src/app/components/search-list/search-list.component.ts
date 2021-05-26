import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

import { ChannelItemView } from '../../data/models/channelItemView';
import { TwichHttpService } from '../../data/services/twich-http.service';
import { CategoryItemView } from '../../data/models/categoryItemView';
import { SortTypeService } from '../../data/services/sort-type.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit{
  public categories: CategoryItemView[];
  public channels: ChannelItemView[];
  public showNfMessage: boolean;
  public isCategory: boolean;

  constructor(
    private twichService: TwichHttpService,
    private sortService: SortTypeService
  ) {
    this.isCategory = this.twichService.requestType === "categories";
    this.showNfMessage = false;
    this.categories = [];
    this.channels = [];
  }

  ngOnInit() {
    this.twichService.execRequest().subscribe(async json_obj => {
      await this.getItemFromJson(json_obj);
      this.sortResponseArray();
      this.showNfMessage = this.categories.length === 0 && this.channels.length === 0;
    })
  }

  

  private getItemFromJson(json_obj: JSON) {
    const objArr = JSON.parse(JSON.stringify(json_obj)).data;
    if (this.isCategory) {
      this.categories = objArr ? objArr.map( (obj: any) => {
        return new CategoryItemView(obj);
      }) : [];
    } else {
      this.channels = objArr ? objArr.map( (obj: any) => {
        return new ChannelItemView(obj);
      }) : [];
    }
  }

  private sortResponseArray() {
    this.sortService.execSort(this.isCategory ? this.categories : this.channels);
  }
}
