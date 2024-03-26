import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.user.pipe(map(user => {
      return !!user;
    }))
  }
}

