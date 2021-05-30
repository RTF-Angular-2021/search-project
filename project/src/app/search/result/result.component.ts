import { Component, OnInit } from '@angular/core';
import { ChannelsModel } from '../channels/channels.models';
import { TwichApiService } from '../../services/twitch-api.service';
import { CategoryModels } from '../categories/categories.models';
import { SortType } from '../../services/sort-type.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit{
  public categories: CategoryModels[];
  public channels: ChannelsModel[];
  public isCategory: boolean;

  constructor(
    private twichService: TwichApiService,
    private sortService: SortType) {
    this.isCategory = this.twichService.requestType === "categories";
    this.categories = [];
    this.channels = [];
  }

  private sort () {
    this.sortService.execSort(this.isCategory ? this.categories : this.channels);
  }

  public ngOnInit() {
    this.twichService.execRequest().subscribe(async json_obj => {
      await this.getItem(json_obj);
      this.sort();
    })
  }  

  private getItem(json_obj: JSON) {
    const objArr = JSON.parse(JSON.stringify(json_obj)).data;
    if (this.isCategory) {
      this.categories = objArr ? objArr.map( (obj: any) => {
        return new CategoryModels(obj);
      }) : [];
    } else {
      this.channels = objArr ? objArr.map( (obj: any) => {
        return new ChannelsModel(obj);
      }) : [];
    }
  }


}
