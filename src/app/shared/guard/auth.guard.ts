import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn) {
      if (route?.routeConfig?.path === "login" || route?.routeConfig?.path === "signup") {
        return true;
      }
      this.router.navigate(['login'])
    } else if (this.authService.isAdmin){
      if (route?.routeConfig?.path === "admin"){
        return true;
      }
      this.router.navigate(['admin'])
    } else {
      if (route?.routeConfig?.path === "user") {
        return true;
      }
      this.router.navigate(['user'])
    }
    return true;
  }

}
