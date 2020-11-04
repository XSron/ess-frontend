import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/common/app-config';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { ProductModel } from 'src/app/model/ProductModel';
import { CategoryService } from 'src/app/services/categoryservice.service';
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
  public categorys: CategoryModel[];
  public Layout = Layout;
  public iconFolderPath = '../../../assets/icons';
  public searchForm: FormGroup;
  public searchFormSubmitted = false;
  public isLoading: boolean = true;

  get productLayout(): Layout {
    return AppConfig.layout;
  }

  private subscription: Subscription;

  // MARK: - Angular Core functions
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Search form setup
    this.searchForm = this.formBuilder.group({
      searchOption: ['0'],
      searchKeyword: [''],
    });

    // Load products
    this.subscription = this.productService.getAllProducts().subscribe((products: any) => {
      // Load category
      this.categoryService.getAllCategory().subscribe((categorys: CategoryModel[]) => {
        this.categorys = categorys;
        this.products = products['content'];
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      })
    }, error => {
      alert('No Product To Display!')
      this.isLoading = false;
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
    if (this.searchForm.invalid) return;
    this.productService.getProductByName(this.searchForm.controls.searchKeyword.value).subscribe((products: ProductModel[]) => {
      if(products) this.products = products.slice();
    }, error => {
      alert('Product Not Found!');
      this.products = null;
    })
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

  public changeCategory() {
    const categoryId: number = this.searchForm.controls.searchOption.value;
    this.productService.getProductByCategoryId(categoryId).subscribe((products: ProductModel[]) => {
      this.products = products['content'];
    })
  }

}
