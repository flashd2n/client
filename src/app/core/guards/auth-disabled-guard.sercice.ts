import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './../auth.service';

@Injectable()
export class AuthDisabledGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/home']);
        }
        return true;
    }
}
