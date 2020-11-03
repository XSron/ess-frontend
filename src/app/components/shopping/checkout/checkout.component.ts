import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { UserModel } from 'src/app/model/UserModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { CartService } from 'src/app/services/cartservice.service';
import { OrderService } from 'src/app/services/orderservice.service';
import { UserService } from 'src/app/services/userservice.service';
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
  private userSubscription: Subscription;
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private userService: UserService
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
    let email: string;
    this.isLoading = true;
    if(this.authService.username) {
      this.userSubscription = this.userService.getUserByName(this.authService.username).subscribe((user: UserModel) => {
        email = user.email;
        if(!email)
          email = prompt("Enter email:");
        this.sendOrderRequest(email); 
      })
    } else {
      email = prompt("Enter email:");
      this.sendOrderRequest(email);
    }
  }

  public sendOrderRequest(email: string) {
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
      paymentCard: {
          name: this.checkoutData.creditCard.name,
          cardNumber: this.checkoutData.creditCard.number,
          expDate: this.checkoutData.creditCard.expiredDate,
          pin: this.checkoutData.creditCard.cvv
      },
      userEmail: email,
      userId: this.authService.userId
    }).subscribe((data: any) => {
      this.isLoading = false;
      alert('You have been ordered!');
      sub.unsubscribe();
      //clear cart
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }, error => {
      this.isLoading = false;
      alert(JSON.stringify(error));
      sub.unsubscribe();
    })
  }

}
