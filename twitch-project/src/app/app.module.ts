import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchedComponent } from './search/searched/searched.component';
import { ResultComponent } from './search/result/result.component';
import { CategoryComponent } from './search/categories/categories.component';
import { RequestSetupComponent } from './request-setup/request-setup.component';
import {HistoryComponent} from './history/history.component'
import { ChannelsComponent } from './search/channels/channels.component';

const appRoutes: Routes = [
  { path: "", component: SearchedComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SearchedComponent,
    ResultComponent,
    CategoryComponent,
    RequestSetupComponent,
    ChannelsComponent,
    HistoryComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


