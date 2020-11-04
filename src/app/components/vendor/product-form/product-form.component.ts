import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {VendorService} from '../../../services/vendor.service';
import {Subscription} from 'rxjs';
import { ProductVendorModel } from '../../../model/ProductVendorModel';
import {CategoryModel} from '../../../model/CategoryModel';
import {CategoryService} from '../../../services/categoryservice.service';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { UploadService } from 'src/app/services/upload.service';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../../../common/endpoint';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public productEditing: ProductVendorModel;
  public categoryList: CategoryModel[];

  public imageSrc: File;
  public form: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private vendorService: VendorService,
    private authService: AuthenticationService,
    private uploadService: UploadService,
    private http: HttpClient
  ) {
    // Load init data
    this.productEditing = this.router.getCurrentNavigation().extras.state as ProductVendorModel;
  }

  ngOnInit(): void {

    // Form setup
    this.form = this.formBuilder.group({
      productName: [this.productEditing ? this.productEditing.name : '', Validators.required],
      unitPrice: [this.productEditing ? this.productEditing.unitPrice : '', Validators.required],
      unitsInStock: [this.productEditing ? this.productEditing.unitsInStock : '', Validators.required],
      description: [this.productEditing ? this.productEditing.description : '', Validators.required],
      categoryId: [this.productEditing ? this.productEditing.categoryId : '', Validators.required],
      vendorId: this.authService.userId,
      // imageSrc: [this.productEditing ? this.productEditing.imageUrl : '']
      // file: ['', Validators.required],
      // fileSource: ['', Validators.required],
    });

    // Load category data
    this.categoryService.getAllCategory().subscribe((categories: CategoryModel[]) => {
      this.categoryList = categories;
    });

  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  // onFileChange(event): void {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     this.imageSrc  = event.target.files[0];
  //     this.uploadFile();
  //   }
  // }

  // uploadFile(): string{
  //   const formData: FormData = new FormData();
  //   formData.append('file', this.imageSrc, this.imageSrc.name);
  //   return this.uploadService.uploadFile(formData);
  // }

  handleFileInput(files: FileList): void{
    this.imageSrc = files.item(0);
  }
  uploadFile(): void {
    const formData: FormData = new FormData();
    formData.append('file', this.imageSrc, this.imageSrc.name);
    this.http.post(Endpoint.UPLOAD_ENDPOINT.UPLOAD_LOCAL, formData).subscribe((result) => {
      alert(JSON.stringify(result));
    }, error => {
      alert(JSON.stringify(error));
    });
  }


  submitAction(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const product: ProductVendorModel = this.getProduct();
    if (this.productEditing) {
      // Editing Product Mode
      const sub: Subscription = this.vendorService
        .editProductById(this.productEditing.id, product)
        .subscribe(result => {
          sub.unsubscribe();
          this.router.navigate(['/vendor/product']);
        }, error => {
          alert(JSON.stringify(error));
          sub.unsubscribe();
        });
    } else {
      // Add New Product Mode
      const sub: Subscription = this.vendorService
        .addNewProduct(product)
        .subscribe(result => {
          sub.unsubscribe();
          this.router.navigate(['/vendor/product']);
        }, error => {
          alert(JSON.stringify(error));
          sub.unsubscribe();
        });
    }
  }

  // https://www.itsolutionstuff.com/post/angular-10-image-upload-with-preview-exampleexample.html
  getProduct(): ProductVendorModel {
    return new ProductVendorModel({
      name: this.form.value.productName,
      categoryId: this.form.value.categoryId,
      unitPrice: this.form.value.unitPrice,
      unitsInStock: this.form.value.unitsInStock,
      description: this.form.value.description,
      active: false,
      imageUrl: this.form.value.imageUrl,
      vendorId: this.authService.userId
    });
  }

}
