import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiNotificationsModule,
    TuiDialogModule,
    TuiPrimitiveYearMonthPaginationComponent,
} from '@taiga-ui/core';
	import {TuiRootModule} from '@taiga-ui/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TuiNotificationsModule,
        TuiDialogModule,
        TuiRootModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
