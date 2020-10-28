import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authservice.service';
import { map } from 'rxjs/operators';
import { AuthModel } from '../model/AuthModel';

export class RouteProtection implements CanActivate {
    constructor(private authService: AuthenticationService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.userSubject.pipe(map((auth: AuthModel) => {
            return !!auth;
        }))
    }
}