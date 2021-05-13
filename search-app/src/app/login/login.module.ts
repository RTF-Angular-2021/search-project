import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    FormsModule,
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginModule { }
