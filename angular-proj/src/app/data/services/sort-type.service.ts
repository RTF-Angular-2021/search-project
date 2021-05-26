import { Injectable } from '@angular/core';
import { CategoryItemView } from '../models/categoryItemView';
import { ChannelItemView } from '../models/channelItemView';
import { MyItem } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class SortTypeService {
  public sortType: string;

  constructor() {
    this.sortType = "relevance";
  }

  execSort<T extends MyItem>(array: T[]) {
    switch(this.sortType) {
      case "descending": {
        this.sortById(true, array);
        break;
      }
      case "ascending": {
        this.sortById(false, array);
        break;
      }
      default: {
        break;
      }
    }
  }

  private sortById<T extends MyItem>(isDescending: boolean, array: T[]) {
    array.sort( (a: T, b: T) => {
      let aNum = a.id as unknown as number;
      let bNum = b.id as unknown as number;
      return isDescending ? bNum - aNum : aNum - bNum;
    })
  }
}
