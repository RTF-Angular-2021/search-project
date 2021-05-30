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
      case "new": {
        this.sortById(true, array);
        break;
      }
      case "old": {
        this.sortById(false, array);
        break;
      }
      default: {
        break;
      }
    }
  }

  private sortById<T extends Item>(isNew: boolean, array: T[]) {
    array.sort( (a: T, b: T) => {
      let Number = a.id as unknown as number;
      let Numbers = b.id as unknown as number;
      return isNew ? Numbers - Number : Number - Numbers;
    })
  }
}
