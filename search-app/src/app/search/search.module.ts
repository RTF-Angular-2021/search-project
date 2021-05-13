import { NgModule } from '@angular/core';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ], 
  exports: [
    SearchPageComponent
  ]
})
export class SearchModule { }
