import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AuthGuard {
    constructor (private authServices: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let check = this.authServices.isAuthenticated()
    if(!check)
    {
       return this.router.navigate(['authentication/login'],{ queryParams: { returnUrl: state.url } })
    }
     return true
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.canActivate(childRoute,state)
    }
}
