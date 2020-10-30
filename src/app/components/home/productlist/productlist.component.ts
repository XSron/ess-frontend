import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/common/app-config';
import { ProductModel } from 'src/app/model/ProductModel';
import { ProductService } from 'src/app/services/productservice.service';
import { Layout } from '../../../common/enum';

@Component({
  selector: 'productlist',
  templateUrl: 'productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  // MARK: - Properties

  public products: ProductModel[];
  public Layout = Layout;
  public iconFolderPath = '../../../assets/icons';
  public searchForm: FormGroup;
  public searchFormSubmitted = false;

  get productLayout(): Layout {
    return AppConfig.layout;
  }

  private subscription: Subscription;

  // MARK: - Angular Core functions

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Search form setup
    this.searchForm = this.formBuilder.group({
      searchOption: ['all'],
      searchKeyword: ['', Validators.required],
    });

    // Load products
    this.products = [];
    this.subscription = this.productService.productSubject.subscribe((products: ProductModel[]) => {
      this.products = products.slice();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // MARK: - Toolbar functions

  get f(): { [p: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  onSubmit(): void {
    this.searchFormSubmitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    console.log(this.searchForm.value);
    alert('SUCCESS!! :-)\n' + JSON.stringify(this.searchForm.value, null, 5));
  }

  changeLayout(): void {
    switch (AppConfig.layout) {
      case Layout.grid:
        AppConfig.layout = Layout.list;
        break;
      case Layout.list:
        AppConfig.layout = Layout.grid;
        break;
      default:
        AppConfig.layout = Layout.grid;
    }
  }

}
