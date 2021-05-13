import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SearchPageComponent } from './search/search-page/search-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
