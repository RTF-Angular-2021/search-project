import { Injectable } from '@angular/core';
import { Item } from '../search/categories/categories.models';

@Injectable({
  providedIn: 'root'
})

export class SortType {
  public sortType: string;

  constructor() {
    this.sortType = "relevance";
  }

  execSort<T extends Item>(array: T[]) {
    switch(this.sortType) {
      case "old": {
        this.sortID(false, array);
        break;
      }
      case "new": {
        this.sortID(true, array);
        break;
      }
      default: {
        break;
      }
    }
  }
  private sortID<T extends Item>(isNew: boolean, array: T[]) {
    array.sort( (i: T, k: T) => {
      let Number = i.id as unknown as number;
      let Numbers = k.id as unknown as number;
      return isNew ? Numbers - Number : Number - Numbers;
    })
  }
}
