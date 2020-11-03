import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddressModel } from 'src/app/model/AddressModel';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'cart',
  templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit, OnDestroy {
  public products: ProductModel[];
  public totalItem = 0;
  public subTotal = 0;
  private cartSubscription: Subscription;
  public isLoading: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartSubject.subscribe((products: ProductModel[]) => {
      this.products = products;
      const {totalItem, subTotal} = this.cartService.calculateTotal(this.products);
      this.totalItem = totalItem;
      this.subTotal = subTotal;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  public handleQtyChange(productId: number, qty: number): void {
    this.cartService.changeCartQty(productId, qty);
  }

  public handleDelete(productId: number): void {
    this.cartService.deleteFromCart(productId);
  }

  public handleCheckout(): void {
    // check if it is authenticate & having a complete address & payment
    /*this.isLoading = true;

    const address: AddressModel = this.shippingAddressComponent.getAddress();
    const billingAddress: AddressModel = this.isUsingSameAddress ? shippingAddress : this.billingAddressComponent.getAddress();
    const creditCard: CreditCardModel = this.creditCardComponent.getCreditCard();
    const checkoutData: CheckoutModel = new CheckoutModel({ shippingAddress, billingAddress, creditCard });
    const navigationExtras: NavigationExtras = { state: checkoutData };
    this.router.navigate(['/checkout']);
    */
    
  
    this.router.navigate(['/checkoutform']);
  }

}
