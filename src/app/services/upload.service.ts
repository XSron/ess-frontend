import { HttpClient} from '@angular/common/http';
import {Injectable } from '@angular/core';
import { Endpoint } from '../common/endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private rs: string;
  constructor(private http: HttpClient) { }
  public uploadFile(formData): Observable<any> {
    return this.http.post(Endpoint.UPLOAD_ENDPOINT.UPLOAD, formData);
  }
}

