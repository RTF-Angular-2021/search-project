import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentifyUserComponent } from '../identify-user/identify-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from '../user/user.component';
import { RepositoryComponent } from '../repository/repository.component';
import { SettingsComponent } from '../settings/settings.component';
import { HistoryComponent } from '../history/history.component';
import { ErrorComponent } from '../error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [
    IdentifyUserComponent, 
    UserComponent, 
    RepositoryComponent, 
    SettingsComponent,
    HistoryComponent,
    ErrorComponent,
    SearchComponent
  ],
  exports: [
    IdentifyUserComponent,
    UserComponent, 
    RepositoryComponent, 
    SettingsComponent,
    HistoryComponent,
    ErrorComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IdentifyUserModule { }
