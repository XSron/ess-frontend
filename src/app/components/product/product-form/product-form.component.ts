import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() productEditing: ProductModel;

  public imageSrc: string;
  public form: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Form setup
    this.form = this.formBuilder.group({
      productName: [this.productEditing ? this.productEditing.name : '', Validators.required],
      unitPrice: [this.productEditing ? this.productEditing.unitPrice : '', Validators.required],
      unitsInStock: [this.productEditing ? this.productEditing.unitsInStock : '', Validators.required],
      description: [this.productEditing ? this.productEditing.description : '', Validators.required],
      file: ['', Validators.required],
      fileSource: ['', Validators.required],
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

  submitAction(): boolean {
    this.submitted = true;
    return this.form.invalid === false;
  }

  // https://www.itsolutionstuff.com/post/angular-10-image-upload-with-preview-exampleexample.html
  getProduct(): ProductModel {
    return new ProductModel({
      name: this.form.value.productName,
      unitPrice: this.form.value.unitPrice,
      unitsInStock: this.form.value.unitsInStock,
      description: this.form.value.description,
    });
  }

}
