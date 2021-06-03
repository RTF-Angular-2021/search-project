import { Component, Input } from '@angular/core';
import { CategoryModels } from './categories.models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoryComponent {
  @Input() category!: CategoryModels;
  constructor() { }
}
