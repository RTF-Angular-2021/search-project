import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RepositoryModel } from '../../data/models/repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./styles/repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public changing: Subject<boolean>;

  @Input()
  public repository: RepositoryModel;

  @Input()
  public sortFromNewToOld: boolean;

  @Input()
  public sortFromOldToNew: boolean = true;
  
  @Input()
  public sortRelev: boolean;

  public arraySort = [];

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
    this.repository.items.sort((a, b) => parseInt(a.created_at) - parseInt(b.created_at));
  }

  public sortReverse(): void {
    this.repository.items.sort((a, b) => parseInt(b.created_at) - parseInt(a.created_at));
  }

  public sortRelevancy(): void {
    const outputData = this.repository.items.filter(d => d.name.includes(this.title));
    this.repository.items.length = 1;
    for (let item in outputData) {
      this.repository.items.push(outputData[item]);
    }
  }

}
