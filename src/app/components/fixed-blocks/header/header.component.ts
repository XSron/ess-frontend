import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { ProductModel } from 'src/app/model/ProductModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { CartService } from 'src/app/services/cartservice.service';
import { MenuService } from 'src/app/services/menuservice.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticatePage: boolean = false;
  public auth: AuthModel;
  public totalCart: number = 0;
  public roles: string[] = null;
  public username: string
  private userSubscription: Subscription;
  private cartSubscription: Subscription;
  private menuSubscription: Subscription;
  constructor(public authService: AuthenticationService, private cartService: CartService,
              private menuService: MenuService, private router: Router) {}
  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
      this.auth = auth;

      //decode access token
      if(this.auth) {
        let afterDecoded: string = jwt_decode(auth.access_token);
        this.username = afterDecoded['user_name'].toUpperCase();
        this.authService.userId = +this.auth.user_id;
        this.authService.username = this.username;
        return this.roles = afterDecoded['authorities'];
      }
      this.roles = null; //reset roles in case the user logout
    });
    this.cartSubscription = this.cartService.cartSubject.subscribe((products: ProductModel[]) => {
      if(products) this.totalCart = products.length;
    });
    this.menuSubscription = this.menuService.routingChangeSubject.subscribe((isShow: boolean) => {
      this.isAuthenticatePage = isShow;
    });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
    this.menuSubscription.unsubscribe();
  }
  public hasRole(...roles: string[]): boolean {
    if(this.roles === null) return false;
    return this.roles.findIndex((r: string) => {
      return roles.findIndex((rl: string) => {
        return rl.toUpperCase() === r.toUpperCase()
      }) > - 1
    }) > -1;
  }
  onLogout() {
    this.authService.userSubject.next(null);
    this.cartService.clearCart();
    localStorage.removeItem("auth");
    this.router.navigate(['/']);
  }
}
