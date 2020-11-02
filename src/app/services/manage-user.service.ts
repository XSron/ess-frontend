import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) {

  }

  public getAllUsers(): Observable<any> {
    return this.http.get(Endpoint.MANAGER_USER_ENDPOINT.ALL_USER_ENDPOINT);
  }
}
