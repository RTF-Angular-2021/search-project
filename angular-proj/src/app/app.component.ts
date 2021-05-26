import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public showMenu: boolean;

  constructor(private eRef: ElementRef) {
    this.showMenu = false;
  }

  onToggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
