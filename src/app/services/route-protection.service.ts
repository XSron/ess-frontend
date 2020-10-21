import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authservice.service';
import { map } from 'rxjs/operators';
import { UserModel } from '../model/UserModel';

export class RouteProtection implements CanActivate {
    constructor(private authService: AuthenticationService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.userSubject.pipe(map((user: UserModel) => {
            return !!user;
        }))
    }
}