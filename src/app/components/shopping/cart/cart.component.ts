import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddressModel } from 'src/app/model/AddressModel';
import { CheckoutModel } from 'src/app/model/CheckoutModel';
import { CreditCardModel } from 'src/app/model/CreditCardModel';
import { ProductModel } from 'src/app/model/ProductModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { CartService } from 'src/app/services/cartservice.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { ProductService } from 'src/app/services/productservice.service';
import { UserService } from 'src/app/services/userservice.service';

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

  constructor(private cartService: CartService, private userService: UserService, 
              private authService: AuthenticationService, private router: Router,
              private creditCardService: CreditCardService, private productService: ProductService) {}
  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartSubject.subscribe((products: ProductModel[]) => {
      this.products = products;
      //load products for product availability
      this.productService.getAllProducts().subscribe((product: any) => {
        const availableProduct: ProductModel[] = product['content'];
        this.products.forEach((product: ProductModel, index: number) => {
          const availableQty: number = availableProduct.filter((pro: ProductModel) => pro.id === product.id)[0].unitsInStock;
          this.products[index].availableQty = Array(availableQty).fill(0).map((value, index) => index + 1);
        })
      })
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
    this.isLoading = true;
    if(this.authService.username) {
      this.userService.getDefaultAddressAndCard(this.authService.username).subscribe(result => {
        const rawAddress =  result.addresses[0];
        const rawCard = result.cards[0];

        const billingAddress: AddressModel = new AddressModel({
          firstName: this.authService.username,
          lastName: '',
          phoneNumber: 'N/A',
          street1: rawAddress.street,
          street2: rawAddress.houseNumber,
          state: rawAddress.state,
          city: rawAddress.city,
          country: rawAddress.country,
          zipCode: rawAddress.zipcode
        });
        const shippingAddress: AddressModel = Object.create(billingAddress);
        const creditCard: CreditCardModel = new CreditCardModel({
          name: rawCard.name,
          number: rawCard.cardNumber,
          cvv: rawCard.cvv,
          expiredDate: rawCard.expiredDate
        })

        //check valid card
        this.creditCardService.cardVerification(creditCard.number, creditCard.name, creditCard.expiredDate, +creditCard.cvv).subscribe((cc: any) => {
          creditCard.type = cc['cardType'];
          const checkoutData: CheckoutModel = new CheckoutModel({ shippingAddress, billingAddress, creditCard });
          const navigationExtras: NavigationExtras = { state: checkoutData };
          this.router.navigate(['/checkout'], navigationExtras);
        }, error => {
          alert(JSON.stringify(error.error.message));
          this.isLoading = false;
        })
      }, error => {
        this.router.navigate(['/checkoutform']);
      })
      return;
    }
    this.router.navigate(['/checkoutform']);
  }

}
