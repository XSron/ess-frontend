import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../../common/endpoint';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent{

  private file: File = null;
  constructor(private http: HttpClient) {}

  handleFileInput(files: FileList): void {
    this.file = files.item(0);
  }
  uploadFile(): any {
    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.http.post(Endpoint.UPLOAD_ENDPOINT.UPLOAD, formData).subscribe((result) => {
      return result;
    }, error => {
      return error;
    });
  }
}
