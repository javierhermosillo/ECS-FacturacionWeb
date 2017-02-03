import { Injector, Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { tokenNotExpired } from "angular2-jwt";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (tokenNotExpired("AuthToken")) {
      return true;
    }

    this.router.navigate(["/welcome"]);
    return false;
  }
}