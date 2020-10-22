import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';
@Component({
    selector: 'checkout',
    templateUrl: 'checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
    private cartSubscription: Subscription;
    public totalItem: number = 0;
    public subTotal: number = 0;
    constructor(private cartService: CartService, private router: Router) {}
    ngOnInit() {
        this.cartSubscription = this.cartService.cartSubject.subscribe((products: ProductModel[]) => {
            let {totalItem, subTotal} = this.cartService.calculateTotal(products);
            this.totalItem = totalItem;
            this.subTotal = subTotal;
        });
    }
    public placeAnOrder() {

        //clear cart
        this.cartService.clearCart();
        alert('You have been ordered!')
        this.router.navigate(['/']);
    }
    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }
}