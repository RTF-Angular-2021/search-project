import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
=======
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { SearchItemComponent } from './search-item/search-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
>>>>>>> михайловский-евгений
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
