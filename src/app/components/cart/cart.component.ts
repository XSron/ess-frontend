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
            //reset count & calculate
            this.totalItem = 0; 
            this.subTotal = 0;
            this.products.forEach((product: ProductModel) => {
                this.totalItem += +product.qty;
                this.subTotal += +product.qty * +product.price;
            })
        });
    }
    public handleQtyChange(productId: number, qty: number) {
        this.cartService.changeCartQty(productId, qty);
    }
    public handleDelete(productId: number) {
        this.cartService.deleteFromCart(productId);
    }
    public handleCheckout() {
        this.router.navigate(['/checkout']);
    }
    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }
}