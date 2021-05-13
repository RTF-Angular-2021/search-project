import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IdentifyUserModule } from './search/components/identify-user/shared/identify-user.module';
import { ErrorComponent } from './search/components/error/error.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IdentifyUserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
