import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {Subscription} from 'rxjs';
import {VendorService} from '../../../services/vendor.service';

@Component({
  selector: 'vendor-product',
  templateUrl: 'vendor-product.component.html'
})

export class VendorProductComponent implements OnInit, OnDestroy {

  // MARK: - Properties

  public products: ProductModel[];
  public isLoading = true;

  private productSubscription: Subscription;

  // MARK: - Angular Core functions

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.productSubscription = this.vendorService.
    getAllProducts()
      .subscribe((products: ProductModel[]) => {
        this.products = products;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  // MARK: - View Actions

  public addNewProductAction(): void {

  }


  // MARK: - Services functions

  // public editProduct(productId: number): void {
  //   const product: ProductModel[] = this.products.filter((product: ProductModel) => {
  //     return product.id === +productId;
  //   });
  //   const sub: Subscription = this.vendorService.approveProduct(product).subscribe((result) => {
  //     // update UI
  //     this.products = this.products.filter((product: ProductModel) => {
  //       return product.id !== productId;
  //     });
  //     alert('Succeed');
  //     sub.unsubscribe();
  //   }, (error) => {
  //     alert(JSON.stringify(error));
  //     sub.unsubscribe();
  //   });
  // }

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
