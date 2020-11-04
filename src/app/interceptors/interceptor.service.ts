import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from '../common/endpoint';
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
        //handle image upload logic
        const httpHeader: HttpHeaders = (http.url != Endpoint.UPLOAD_ENDPOINT.UPLOAD)? 
                                         http.headers.set("Content-type", "application/json; charset=utf-8"): http.headers;
        if(this.auth) { 
            cloneHttpRequest = http.clone({
                headers: httpHeader.set("Authorization", `bearer ${this.auth.access_token}`)
            });
            return next.handle(cloneHttpRequest);
        } 
        return next.handle(http.clone({
            headers: httpHeader
        }));
    }
}