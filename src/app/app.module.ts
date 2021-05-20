import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ErrorComponent } from './search/components/error/error.component';
import { HistoryComponent } from './search/components/history/history.component';
import { SearchViewComponent } from './search/components/search-view/search-view.component';
import { SearchComponent } from './search/components/search/search.component';
import { SettingsComponent } from './search/components/settings/settings.component';


@NgModule({
  declarations: [
    SettingsComponent,
    HistoryComponent,
    ErrorComponent,
    SearchComponent,
    AppComponent,
    SearchViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }