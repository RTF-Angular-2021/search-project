import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TwitchApiService } from './twitch-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    protected api: TwitchApiService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {    
    if (route.url[0].path === 'login') {
      return this.api.isAuthenticated() ? this.router.parseUrl('/') : true;
    } 
    return this.api.isAuthenticated() ? true : this.router.parseUrl('/login');
  }
}
