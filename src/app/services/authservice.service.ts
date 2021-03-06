import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../model/AuthModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { AppConfig } from '../common/app-config';
import { RoleModel } from '../model/RoleModel';

@Injectable()
export class AuthenticationService {
    public userSubject: BehaviorSubject<AuthModel> = new BehaviorSubject<AuthModel>(null);
    public userId: number;
    public username: string;
    public roles: string[];
    constructor(private http: HttpClient) {}
    public signUp(username: string, password: string, roleId: number): Observable<any> {
        return (
            this.http.post(Endpoint.USER_ENDPOINT.USER_SIGNUP, {
                username: username,
                password: password,
                roles: [{
                    id: roleId
                }]
            })
        )
    }
    public signUpMultipleRoles(username: string, password: string, role: RoleModel[]): Observable<any> {
      return (
          this.http.post(Endpoint.USER_ENDPOINT.USER_SIGNUP, {
              username: username,
              password: password,
              roles: role
          })
      )
  }
    public signIn(username: string, password: string): Observable<AuthModel> {
        let httpHeaders: HttpHeaders = new HttpHeaders()
                                            .set("Authorization", `Basic ${btoa(`${AppConfig.CLIENT_ID}:${AppConfig.SECRET_KEY}`)}`);
        let httpParams: HttpParams = new HttpParams()
                                                .set("username", username)
                                                .set("password", password)
                                                .set("grant_type", 'password');
        return (
            this.http.post<AuthModel>(Endpoint.AUTH_ENDPOINT.SIGN_IN_ENDPOINT, {}, {
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
