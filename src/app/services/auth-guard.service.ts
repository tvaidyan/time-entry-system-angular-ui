import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): boolean {
        if (!this.loginService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
        return this.loginService.isLoggedIn();
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
}
