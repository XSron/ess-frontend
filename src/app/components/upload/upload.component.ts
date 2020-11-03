import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  imageSrc: any;
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });

  constructor(private uploadService: UploadService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  // uploadMedia(): void {
  //   const formData = new FormData();
  //   formData.append('file', this.imageSrc[0]);
  //   this.uploadService.uploadFile(formData).subscribe(
  //     data => {
  //         console.log('success ' + data);
  //     },
  //     err => {
  //       console.log('error ' + err.message);
  //     });
  // }

  // tslint:disable-next-line: typedef
  // get f(){
  //   return this.myForm.controls;
  // }

  // onFileChange(event): void {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.imageSrc = event.target.files;
  //       this.myForm.patchValue({
  //         fileSource: reader.result
  //       });
  //     };
  //   }
  // }

  postMethod(files: FileList): void {
    this.imageSrc = files.item(0);
    this.uploadService.uploadFile(this.imageSrc).subscribe(
        data => {
            console.log('success ' + data);
        },
        err => {
          console.log('error ' + err.message);
        });
    }
}
