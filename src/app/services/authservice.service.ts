import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../model/AuthModel';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable()
export class AuthenticationService {
    private clientId: string = 'group3';
    private secretKey: string = 'JwtSecretKey';
    public userSubject: BehaviorSubject<AuthModel> = new BehaviorSubject<AuthModel>(null);
    constructor(private http: HttpClient) {}
    public signUp(username: string, password: string): Observable<AuthModel> {
        return null;
    }
    public signIn(username: string, password: string): Observable<AuthModel> {
        let httpHeaders: HttpHeaders = new HttpHeaders()
                                            .set("Content-type", "application/x-www-form-urlencoded; charset=utf-8")
                                            .set("Authorization", `Basic ${btoa(`${this.clientId}:${this.secretKey}`)}`);
        let httpParams: HttpParams = new HttpParams()
                                                .set("username", username)
                                                .set("password", password)
                                                .set("grant_type", 'password');
        return (
            this.http.post<AuthModel>(`https://pm-authentication-service.herokuapp.com/oauth/token`, {}, {
                headers: httpHeaders,
                params: httpParams
            })
        )
    }
    public broadcastUserFromLocalStorage() {
        let auth: AuthModel = JSON.parse(localStorage.getItem("auth"));
        if(auth)
            this.userSubject.next(auth);
    }
}