import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../model/AuthModel';
import { AuthenticationService } from '../services/authservice.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    private auth: AuthModel 
    constructor(private authService: AuthenticationService) {
        this.authService.userSubject.subscribe((auth: AuthModel) => {
            this.auth = auth;
        });
    }
    intercept(http: HttpRequest<any>, next: HttpHandler) {
        let cloneHttpRequest: HttpRequest<any>;
        if(this.auth) {
            cloneHttpRequest = http.clone({
                headers: http.headers.set("Authorization", `bearer ${this.auth.accessToken}`)
            });
            return next.handle(cloneHttpRequest);
        }
        return next.handle(http);
    }
}