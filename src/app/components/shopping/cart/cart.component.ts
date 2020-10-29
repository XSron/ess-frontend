import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';

@Component({
    selector: 'cart',
    templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {
    public products: ProductModel[];
    private cartSubscription: Subscription;
    public totalItem: number = 0;
    public subTotal: number = 0;
    constructor(private cartService: CartService, private router: Router) {}
    ngOnInit() {
        this.cartSubscription = this.cartService.cartSubject.subscribe((products: ProductModel[]) => {
            this.products = products;
            let {totalItem, subTotal} = this.cartService.calculateTotal(this.products);
            this.totalItem = totalItem;
            this.subTotal = subTotal;
        });
    }
    public handleQtyChange(productId: number, qty: number) {
        this.cartService.changeCartQty(productId, qty);
    }
    public handleDelete(productId: number) {
        this.cartService.deleteFromCart(productId);
    }
    public handleCheckout() {
        //check if it is authenticate & having a complete address & payment
        //this.router.navigate(['/checkout']);
        this.router.navigate(['/checkoutform']);
    }
    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }
}