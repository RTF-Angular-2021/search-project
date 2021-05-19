import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorComponent } from './search/components/error/error.component';
import { SearchComponent } from './search/components/search/search.component';
import { UserComponent } from './search/components/user/user.component';
import { RepositoryComponent } from './search/components/repository/repository.component';
import { SettingsComponent } from './search/components/settings/settings.component';
import { HistoryComponent } from './search/components/history/history.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent, 
    RepositoryComponent, 
    SettingsComponent,
    HistoryComponent,
    ErrorComponent,
    SearchComponent,
    AppComponent
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