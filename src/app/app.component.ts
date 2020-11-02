import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModel } from './model/AuthModel';
import { AuthenticationService } from './services/authservice.service';
import { CartService } from './services/cartservice.service';
import { ProductService } from './services/productservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  public auth: AuthModel
  constructor(private authService: AuthenticationService, private cartService: CartService) {}
  ngOnInit() {
    //Implement Remember me
    this.authService.broadcastUserFromLocalStorage();
    this.subscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
      this.auth = auth;

      if(this.auth) {
        this.authService.userId = +this.auth.user_id;

        //load cart from authenticated user
        this.cartService.loadCartFromUserAfterLoggedin().subscribe((products: ProductService[]) => {
          this.cartService.updateCartModelAndUI(products);
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
