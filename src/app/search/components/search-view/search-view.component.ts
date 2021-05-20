import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '../../data/models/identify-user.model';
import { RepositoryModel } from '../../data/models/repository.model';

@Component({
  selector: 'app-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./styles/search-view.component.css']
})
export class SearchViewComponent {

  @Input()
  public user: UserModel;

  @Input()
  public title: string;

  @Input()
  public changing: Subject<boolean>;

  @Input()
  public repository: RepositoryModel;

  @Input()
  public sortFromOldToNew: boolean = true;

  @Input()
  public sortRelev: boolean;

  constructor() { }

  public ngOnInit(): void {
    //чтобы следующий поиск был с выбранными настройками
    if (this.sortFromOldToNew) {
      this.sortReverse();
    } else if (!this.sortFromOldToNew && !this.sortRelev) {
      this.sortNormal();
    } else if (this.sortRelev) {
      this.sortRelevancy();
    }

    // сортировка когда уже введен запрос
    this.changing.subscribe(() => {
      if (this.sortFromOldToNew) {
        this.sortNormal();
      } else if (!this.sortFromOldToNew && !this.sortRelev) {
        this.sortReverse();
      } else if (this.sortRelev) {
        this.sortRelevancy();
      }
    });
  }

  public sortNormal(): void {
    if (this.repository) {
      this.repository.items.sort((a, b) => parseInt(a.created_at) - parseInt(b.created_at));
    } else if (this.user) {
      this.user.items.sort((a, b) => a.id - b.id);
    }
  }

  public sortReverse(): void {
    if (this.repository) {
      this.repository.items.sort((a, b) => parseInt(b.created_at) - parseInt(a.created_at));
    } else if (this.user) {
      this.user.items.sort((a, b) => b.id - a.id);
    }
  }

  public sortRelevancy(): void {
    if (this.repository) {
      const outputData = this.repository.items.filter(d => d.name.includes(this.title));
      this.repository.items.length = 1;
      for (let item in outputData) {
        this.repository.items.push(outputData[item]);
      }
    } else if (this.user) {
      const outputData = this.user.items.filter(d => d.login.includes(this.title));
      this.user.items.length = 1;
      for (let item in outputData) {
        this.user.items.push(outputData[item]);
      }
    }
  }

}
