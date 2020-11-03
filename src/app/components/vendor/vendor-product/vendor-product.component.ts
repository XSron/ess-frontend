import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {Subscription} from 'rxjs';
import {VendorService} from '../../../services/vendor.service';
import {NavigationExtras, Router} from '@angular/router';
import {UserModel} from '../../../model/UserModel';
import {UserService} from '../../../services/userservice.service';
import {AuthenticationService} from '../../../services/authservice.service';

@Component({
  selector: 'vendor-product',
  templateUrl: 'vendor-product.component.html'
})

export class VendorProductComponent implements OnInit, OnDestroy {

  // MARK: - Properties

  public products: ProductModel[];
  public isLoading = true;

  private productSubscription: Subscription;
  private user: UserModel;

  // MARK: - Angular Core functions

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Load product data
    this.productSubscription = this.vendorService.
    getAllProducts()
      .subscribe((products: ProductModel[]) => {
        this.products = products;
        this.isLoading = false;
      });

    // Load vendor information
    // this.userService
    //   .getUserByName(this.authService.username)
    //   .subscribe((user: UserModel) => {
    //     this.user = user;
    //   });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  // MARK: - View Actions

  public addNewProductAction(): void {
    this.router.navigate(['/vendor/product-form']);
  }

  public editProductAction(productId: number): void {
    const navigationExtras: NavigationExtras = {
      state: this.products.filter(p => p.id === +productId)[0]
    };
    this.router.navigate(['/vendor/product-form'], navigationExtras);
  }

  public deleteProduct(productId: number): void {
    const sub: Subscription = this.vendorService
      .deleteProductById(productId)
      .subscribe((result) => {
        // Update UI
        this.products = this.products.filter(p => p.id !== productId);
        alert('Succeed');
        sub.unsubscribe();
      }, (error) => {
        alert(JSON.stringify(error));
        sub.unsubscribe();
      });
  }

}
