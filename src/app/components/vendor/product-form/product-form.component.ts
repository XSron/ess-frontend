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
  public imgurl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private vendorService: VendorService,
    private authService: AuthenticationService,
    private uploadService: UploadService,
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
      categoryId: [this.productEditing ? this.productEditing.category.id : '', Validators.required],
      vendorId: this.authService.userId,
      imageUrl: [this.productEditing ? this.productEditing.imageUrl : '', Validators.required]
    });
    this.imgurl = this.form.value.imageUrl;
    // Load category data
    this.categoryService.getAllCategory().subscribe((categories: CategoryModel[]) => {
      this.categoryList = categories;
    }, error => {
      this.categoryList = [];
    });

  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  handleFileInput(files: FileList): void {
    this.imageSrc = files.item(0);
  }

  uploadFile(): any {
    const formData: FormData = new FormData();
    if (this.imageSrc === undefined) {
      return;
    }
    formData.append('file', this.imageSrc, this.imageSrc.name);
    this.uploadService.uploadFile(formData).subscribe((result) => {
      this.imgurl = Object.values(result)[0].toString( );
      console.log(this.imgurl);
    }, error => {
      this.imgurl = error.message;
    });
    console.log(this.imgurl);
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

  getProduct(): ProductVendorModel {
    return new ProductVendorModel({
      name: this.form.value.productName,
      categoryId: this.form.value.categoryId,
      unitPrice: this.form.value.unitPrice,
      unitsInStock: this.form.value.unitsInStock,
      description: this.form.value.description,
      active: false,
      imageUrl: this.imgurl,
      vendorId: this.authService.userId
    });
  }

}
