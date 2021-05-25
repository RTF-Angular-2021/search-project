import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ResultComponent } from "./result/result.component";
import {HistoryComponent} from "./history/history.component";
import {HttpService} from "./services/data.service";
import {SortService} from "./services/sort.service";

@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    SortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
