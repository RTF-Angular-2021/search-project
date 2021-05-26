import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { QueryFilterComponent } from './components/query-filter/query-filter.component';
import { RequestInfoComponent } from './components/request-info/request-info.component';
import { SearchItemChannelComponent } from './components/search-item-channel/search-item-channel.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HistoryComponent } from './components/history/history.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  { path: "", component: SearchBarComponent },
  { path: "history", component: HistoryComponent },
  { path: "**", component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchListComponent,
    SearchItemComponent,
    QueryFilterComponent,
    RequestInfoComponent,
    SearchItemChannelComponent,
    HeaderMenuComponent,
    HistoryComponent,
    NotFoundComponent,
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
