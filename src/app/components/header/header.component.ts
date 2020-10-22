import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { ProductModel } from 'src/app/model/ProductModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { CartService } from 'src/app/services/cartservice.service';
import { ProductService } from 'src/app/services/productservice.service';

@Component({
    selector: 'header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticatePage: boolean = false;
    public auth: AuthModel;
    public totalCart: number = 0;
    private userSubscription: Subscription;
    private cartSubscription: Subscription;
    constructor(private authService: AuthenticationService, private cartService: CartService, private router: Router) {}
    ngOnInit() {
        this.userSubscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
            this.auth = auth;
        })
        this.cartSubscription = this.cartService.cartSubject.subscribe((products: ProductModel[]) => {
            if(products) this.totalCart = products.length;
        })
    }
    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        this.cartSubscription.unsubscribe();
    }
    onLogout() {
        this.authService.userSubject.next(null);
        localStorage.removeItem("auth");
        this.router.navigate(['/']);
    }
}