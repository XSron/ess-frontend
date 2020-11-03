import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {VendorService} from '../../../services/vendor.service';
import {Subscription} from 'rxjs';
import { ProductVendorModel } from '../../../model/ProductVendorModel';
import {CategoryModel} from '../../../model/CategoryModel';
import {CategoryService} from '../../../services/categoryservice.service';
import { AuthenticationService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public productEditing: ProductVendorModel;
  public categoryList: CategoryModel[];

  public imageSrc: string;
  public form: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private vendorService: VendorService,
    private authService: AuthenticationService
  ) {
    // Load init data
    this.productEditing = this.router.getCurrentNavigation().extras.state as ProductVendorModel;
  }

  ngOnInit(): void {

    // Form setup
    this.form = this.formBuilder.group({
      productName: [this.productEditing ? this.productEditing.name : '', Validators.required],
      category: [this.productEditing ? this.productEditing.categoryId : '', Validators.required],
      unitPrice: [this.productEditing ? this.productEditing.unitPrice : '', Validators.required],
      unitsInStock: [this.productEditing ? this.productEditing.unitsInStock : '', Validators.required],
      description: [this.productEditing ? this.productEditing.description : '', Validators.required],
      categoryId: [this.productEditing ? this.productEditing.categoryId : '', Validators.required],
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

  onFileChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          fileSource: reader.result
        });
      };
    }
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
      categoryId: this.form.value.category,
      unitPrice: this.form.value.unitPrice,
      unitsInStock: this.form.value.unitsInStock,
      description: this.form.value.description,
      active: false,
      vendorId: this.authService.userId
    });
  }

}
