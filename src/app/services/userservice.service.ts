import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { UserModel } from '../model/UserModel';
import { AuthenticationService } from './authservice.service';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {}
    public getUserById(): Observable<UserModel> {
        return this.http.get(Endpoint.USER_ENDPOINT.GET_USER_PROFILE_BY_ID);
    }
    public addUserAddress() {

    }
    public removeUserAddress() {

    }
    public updateUserAddress() {
        
    }
}