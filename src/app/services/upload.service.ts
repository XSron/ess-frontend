import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // constructor(
  //   private http: HttpClient
  // ) {}

  // uploadFile(imageSrc): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', imageSrc, imageSrc.name);
  //   return this.http.post(Endpoint.UPLOAD_ENDPOINT.UPLOAD_LOCAL, formData, {
  //     headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  //   });
  // }


  private baseUrl = Endpoint.UPLOAD_ENDPOINT.UPLOAD_LOCAL;

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}

