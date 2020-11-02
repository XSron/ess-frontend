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

  public changeStatusUser(username: string, enable: boolean): Observable<any> {
    return this.http.put(Endpoint.MANAGER_USER_ENDPOINT.CHANGE_STATUS_USER_ENDPOINT + `/${username}/${enable}`, null);
  }

}
