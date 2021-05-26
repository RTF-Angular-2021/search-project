import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  public showFilter: boolean;
  public showRequestInfo: boolean;

  constructor() {
    this.showFilter = false;
    this.showRequestInfo = false;
  }

  ngOnInit() {}

  onToggleFilter() {
    this.showFilter = !this.showFilter;
  }
  
  onToggleRequestInfo() {
    this.showRequestInfo = !this.showRequestInfo;
  }
}
