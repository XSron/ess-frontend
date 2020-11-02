import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { CartService } from 'src/app/services/cartservice.service';
import { OrderService } from 'src/app/services/orderservice.service';
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
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthenticationService
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
      console.log(this.checkoutData.creditCard.type);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  public placeAnOrder(): void {
    //create products 
    let products: any[] = [];
    const orignalProducts: ProductModel[] = Array.from(this.cartService.carts.values());
    orignalProducts.forEach((product: ProductModel) => {
      products.push({
        description: product.description,
        imageURL: product.imageUrl,
        price: product.unitPrice,
        productId: product.id,
        productName: product.name,
        quantity: product.unitsInStock,
        vendorId: product.vendorId
      });
    });

    const sub: Subscription = this.orderService.placeAnOrder( {
      billingAddress: {
          city: this.checkoutData.billingAddress.city,
          country: this.checkoutData.billingAddress.country,
          state: this.checkoutData.billingAddress.state,
          street1: this.checkoutData.billingAddress.street1,
          street2: this.checkoutData.billingAddress.street2,
          zip: this.checkoutData.billingAddress.zipCode
      },
      products: products,
      shippingAddress: {
          city: this.checkoutData.shippingAddress.city,
          country: this.checkoutData.shippingAddress.country,
          state: this.checkoutData.shippingAddress.state,
          street1: this.checkoutData.shippingAddress.street1,
          street2: this.checkoutData.shippingAddress.street2,
          zip: this.checkoutData.shippingAddress.zipCode
        },
      userId: this.authService.userId
    }).subscribe((data: any) => {
      alert('You have been ordered!');
      sub.unsubscribe();
      //clear cart
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }, error => {
      alert(JSON.stringify(error));
      sub.unsubscribe();
    })
  }

}
