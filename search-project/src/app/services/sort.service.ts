import {Injectable} from '@angular/core';
import {CardResult} from "../app.component";

@Injectable()
export class SortService {

  sortByRelevance(cards:CardResult[]):CardResult[] {
    let Other:CardResult[] = [];
    let Top:CardResult[] = [];
    for (let i in cards){
      if (cards[i].name.match(new RegExp('^' + cards[i].keyword + '[a-zA-Z0-9]*', 'ig'))){
        Top.push(cards[i]);
      }
      else Other.push(cards[i]);
    }
    return Top.concat(Other);
  }

  sortByOldToNew(cards:CardResult[]):CardResult[] {
    return cards.sort((a, b) => a.create_date > b.create_date ? 1 : -1);
  }

}
