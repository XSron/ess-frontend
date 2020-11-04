import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  public uploadFile(formData): any {
    this.http.post(Endpoint.UPLOAD_ENDPOINT.UPLOAD_LOCAL, formData).subscribe((result) => {
      console.log(result);
      return result;
    }, error => {
      console.log(error.message);
      return error.message;
    });
  }
}

