import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/search/data/models/identify-user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./styles/user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public sortFromNewToOld: boolean;

  @Input()
  public sortFromOldToNew: boolean = true;

  constructor() { }

  public ngOnInit(): void {
    console.log('555');
    if (this.sortFromNewToOld) {
      this.sortNormal();
      console.log("===");
    } else if (this.sortFromOldToNew) {
      this.sortReverse();
      console.log("444");
    }
  }

  public sortNormal() {
    this.user.items.sort((a, b) => a.id - b.id);
  }

  public sortReverse() {
    this.user.items.sort((a, b) => b.id - a.id);
  }

}
