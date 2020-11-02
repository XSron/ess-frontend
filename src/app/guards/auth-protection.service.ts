import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../services/authservice.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProtection implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        let canActivate: boolean = false;
        if(this.authService.username) {
            const roles: string[] = this.authService.roles;
            switch(route.url[0].path) {
                case "user": 
                    canActivate = true;
                    break;
                case "admin":
                    if(this.hasRole(roles, "ROLE_ADMIN")) canActivate = true;                    
                    break;
                case "vendor":
                    if(this.hasRole(roles, "ROLE_VENDOR")) canActivate = true; 
                    break;
                case "client":
                    if(this.hasRole(roles, "ROLE_CLIENT")) canActivate = true; 
                    break;
            }
            return canActivate? true: this.router.createUrlTree(["/unauthorized"]);
        }
        return this.router.createUrlTree(["/signin"]);
    }
    public hasRole(currentUserRoles: string[], ...roles: string[]): boolean {
        if(currentUserRoles === null) return false;
        return currentUserRoles.findIndex((r: string) => {
          return roles.findIndex((rl: string) => {
            return rl.toUpperCase() === r.toUpperCase()
          }) > - 1
        }) > -1;
    }
}