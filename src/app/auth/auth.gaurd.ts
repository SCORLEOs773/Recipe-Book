import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(map(user => {
      const isAuth = !!user
      if(isAuth)
      {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }))
  }
}

