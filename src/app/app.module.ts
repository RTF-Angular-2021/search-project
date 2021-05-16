import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IdentifyUserModule } from './search/components/shared/identify-user.module';

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
