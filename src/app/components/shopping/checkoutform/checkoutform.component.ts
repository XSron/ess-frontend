import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { AddressComponent } from '../address/address.component';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { AddressModel } from '../../../model/AddressModel';
import { CreditCardModel } from '../../../model/CreditCardModel';
import { CheckoutModel } from '../../../model/CheckoutModel';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'checkoutform',
  templateUrl: 'checkoutform.component.html'
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  @ViewChild('shippingAddressComponent') shippingAddressComponent: AddressComponent;
  @ViewChild('billingAddressComponent') billingAddressComponent: AddressComponent;
  @ViewChild('creditCardComponent') creditCardComponent: CreditCardComponent;

  public isUsingSameAddress: boolean;

  private auth: AuthModel;
  private authSubscription: Subscription;
  public isLoading: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private creditCardService: CreditCardService,
    private userService: UserService
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
    if (!this.shippingAddressComponent.submitAction()) {
      alert('Please enter Shipping Address.');
      return;
    }

    if (!this.isUsingSameAddress && !this.billingAddressComponent.submitAction()) {
      alert('Please enter Billing Address.');
      return;
    }

    if (!this.creditCardComponent.submitAction()) {
      alert('Please enter Credit Card information.');
      return;
    }

    const shippingAddress: AddressModel = this.shippingAddressComponent.getAddress();
    const billingAddress: AddressModel = this.isUsingSameAddress ? shippingAddress : this.billingAddressComponent.getAddress();
    const creditCard: CreditCardModel = this.creditCardComponent.getCreditCard();
    const checkoutData: CheckoutModel = new CheckoutModel({ shippingAddress, billingAddress, creditCard });
    const navigationExtras: NavigationExtras = { state: checkoutData };

    //Validate Credit Card
    this.isLoading = true;
    this.creditCardService.cardVerification(creditCard.number, creditCard.name, creditCard.expiredDate, +creditCard.cvv).subscribe((cc: any) => {
      creditCard.type = cc['cardType'];
      this.isLoading = false;
      if (this.auth && confirm('Do you want to save the Shipping address & Credit Card information to your User Profile?')) {
        this.userService.addUserAddress(this.authService.username, shippingAddress).subscribe((result) => {
          this.userService.addCardToUser(this.authService.username, creditCard).subscribe(result => { }, error => {
            alert('Card ' + JSON.stringify(error));
          })
        }, error => {
          alert('Address ' + JSON.stringify(error));
        })
      }
      this.router.navigate(['/checkout'], navigationExtras);
    }, (error: any) => {
      this.isLoading = false;
      alert(JSON.stringify(error.error.message));
    })
  }

}

