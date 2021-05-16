import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../data/models/repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input()
  public repository: Repository;

  @Input()
  public sortFromNewToOld: boolean;

  @Input()
  public sortFromOldToNew: boolean = true;

  constructor() { }

  public ngOnInit(): void {
    if (this.sortFromNewToOld) {
      this.sortNormal();
    } else if (this.sortFromOldToNew) {
      this.sortReverse();
    }
  }

  public sortNormal() {
    this.repository.items.sort((a, b) => parseInt(a.created_at) - parseInt(b.created_at));
  }

  public sortReverse() {
    this.repository.items.sort((a, b) => parseInt(b.created_at) - parseInt(a.created_at));
  }

}
