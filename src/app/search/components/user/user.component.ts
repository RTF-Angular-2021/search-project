import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '../../../../app/search/data/models/identify-user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./styles/user.component.css']
})
export class UserComponent {

  @Input()
  public title: string;

  @Input()
  public changing: Subject<boolean>;

  @Input()
  public user: UserModel;

  @Input()
  public sortFromNewToOld: boolean;

  @Input()
  public sortFromOldToNew: boolean;

  @Input()
  public sortRelev: boolean;

  constructor() { }

  public ngOnInit(): void {
    //чтобы следующий поиск был с выбранными настройками
    if (this.sortFromNewToOld) {
      this.sortReverse();
    } else if (this.sortFromOldToNew) {
      this.sortNormal();
    } else if (this.sortRelev) {
      this.sortRelevancy();
    }

    // сортировка когда уже введен запрос
    this.changing.subscribe(() => {
      if (this.sortFromOldToNew) {
        this.sortNormal();
      } else if (this.sortFromNewToOld) {
        this.sortReverse();
      } else if (this.sortRelev) {
        this.sortRelevancy();
      }
    });
  }

  public sortNormal(): void {
    this.user.items.sort((a, b) => a.id - b.id);
  }

  public sortReverse(): void {
    this.user.items.sort((a, b) => b.id - a.id);
  }

  public sortRelevancy(): void {
    const outputData = this.user.items.filter(d => d.login.includes(this.title));
    this.user.items.length = 1;
    for (let item in outputData) {
      this.user.items.push(outputData[item]);
    }
  }

}
