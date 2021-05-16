import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `<div class="container">
                <p>Найдите то, что ищете!</p>
                <input class="container__search" [formControl]="searchControl">
              </div>`,
  styleUrls: ['./styles/search.component.css']
})
export class SearchComponent {

  @Input()
  public searchControl: FormControl;

  constructor() { }
}
