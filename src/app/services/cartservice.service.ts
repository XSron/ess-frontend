import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from '../model/AuthModel';
import { ProductModel } from '../model/ProductModel';
import { AuthenticationService } from './authservice.service';

@Injectable()
export class CartService {
    public cartSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
    public carts: Map<number, ProductModel> = new Map<number, ProductModel>();
    private auth: AuthModel = null;
    constructor(private authService: AuthenticationService) {
        this.authService.userSubject.subscribe((auth: AuthModel) => {
            this.auth = auth;
        })
    }
    public addToCart(product: ProductModel) {
        if(this.auth) { //CALL API
            return;
        }
        let updatingProduct: ProductModel = Object.create(product);
        if(this.carts.get(product.productId)) {
            updatingProduct = this.carts.get(product.productId);
            updatingProduct.qty++;
        } 
        this.carts.set(updatingProduct.productId, updatingProduct); //store in the map
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public changeCartQty(productId: number, newQty: number) {
        if(this.auth) { //CALL API
            return;
        }
        if(this.carts.get(productId)) {
            let updatingProduct: ProductModel = this.carts.get(productId);
            //check if they select the same qty
            if(updatingProduct.qty === +newQty) return;
            updatingProduct.qty = newQty;
            this.carts.set(productId, updatingProduct);
            this.cartSubject.next(Array.from(this.carts.values()));
        }
    }
    public deleteFromCart(productId: number) {
        if(this.auth) { //CALL API
            return;
        }
        this.carts.delete(productId);
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public clearCart() {
        if(this.auth) { //CALL API
            return;
        }
        this.carts.clear();
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public calculateTotal(products: ProductModel[]) {
        //reset count & calculate
        let totalItem: number = 0; 
        let subTotal: number = 0;
        products.forEach((product: ProductModel) => {
            totalItem += +product.qty;
            subTotal += +product.qty * +product.price;
        });
        return {
            totalItem,
            subTotal: +subTotal.toFixed(2)
        }
    }
}