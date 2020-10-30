import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';
import { CheckoutModel } from '../../../model/CheckoutModel';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.component.html'
})

export class CheckoutComponent implements OnInit, OnDestroy {

  public checkoutData: CheckoutModel;
  public totalItem = 0;
  public subTotal = 0;

  private cartSubscription: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    this.checkoutData = this.router.getCurrentNavigation().extras.state as CheckoutModel;
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartSubject
      .subscribe((products: ProductModel[]) => {
        const { totalItem, subTotal } = this.cartService.calculateTotal(products);
        this.totalItem = totalItem;
        this.subTotal = subTotal;
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  public placeAnOrder(): void {
    // clear cart
    this.cartService.clearCart();
    alert('You have been ordered!');
    this.router.navigate(['/']);
  }

}
