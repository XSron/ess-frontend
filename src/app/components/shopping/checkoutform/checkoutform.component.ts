import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { AddressType } from '../../../common/enum';
import { AddressComponent } from '../../payment/address/address.component';
import { CreditCardComponent } from '../../payment/credit-card/credit-card.component';
import { AddressModel } from '../../../model/AddressModel';
import { CreditCardModel } from '../../../model/CreditCardModel';
import { CheckoutModel } from '../../../model/CheckoutModel';

@Component({
  selector: 'checkoutform',
  templateUrl: 'checkoutform.component.html'
})

export class CheckoutFormComponent implements OnInit, OnDestroy {

  @ViewChild('shippingAddressComponent') shippingAddressComponent: AddressComponent;
  @ViewChild('billingAddressComponent') billingAddressComponent: AddressComponent;
  @ViewChild('creditCardComponent') creditCardComponent: CreditCardComponent;

  public isUsingSameAddress: boolean;
  public AddressType = AddressType;

  private auth: AuthModel;
  private authSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
      this.auth = auth;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public handleReview(): void {

    if (this.shippingAddressComponent.submitAction() === false) {
      alert('Please enter Shipping Address.');
      return;
    }

    if (this.isUsingSameAddress === false && this.billingAddressComponent.submitAction() === false) {
      alert('Please enter Billing Address.');
      return;
    }

    if (this.creditCardComponent.submitAction() === false) {
      alert('Please enter Credit Card information.');
      return;
    }

    const shippingAddress: AddressModel = this.shippingAddressComponent.getAddress();
    const billingAddress: AddressModel = this.isUsingSameAddress ? shippingAddress : this.billingAddressComponent.getAddress();
    const creditCard: CreditCardModel = this.creditCardComponent.getCreditCard();
    const checkoutData: CheckoutModel = new CheckoutModel({ shippingAddress, billingAddress, creditCard });

    if (this.auth) {
      // User authenticated
      if (confirm('Do you want to save the information for your User Profile?')) {
        // call API to save address and credit card to a logined user
      }
    } else {
      // Guest user
      const navigationExtras: NavigationExtras = { state: checkoutData };
      this.router.navigate(['/checkout'], navigationExtras);
    }

  }

}

