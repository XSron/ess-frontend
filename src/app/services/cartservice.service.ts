import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { AuthModel } from '../model/AuthModel';
import { ProductModel } from '../model/ProductModel';
import { AuthenticationService } from './authservice.service';

@Injectable()
export class CartService {
    public cartSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
    public carts: Map<number, ProductModel> = new Map<number, ProductModel>();
    private auth: AuthModel = null;
    constructor(private authService: AuthenticationService, private http: HttpClient) {
        this.authService.userSubject.subscribe((auth: AuthModel) => {
            this.auth = auth;
        })
    }
    public loadCartFromUserAfterLoggedin(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(Endpoint.CART_ENDPOINT.GET_CART_ENDPOINT + `/${this.authService.userId}`);
    } 
    public updateCartModelAndUI(products: ProductModel[]) {
        if(products) {
            //update cart model
            products.forEach((product: ProductModel) => {
                this.carts.set(product.productId, product);
            })
            //update cart UI 
            this.cartSubject.next(products);
        }
    }
    public addToCart(product: ProductModel) {
        if(this.auth) { 
            this.http.post(Endpoint.CART_ENDPOINT.ADD_TO_CART_ENDPOINT + `/${this.authService.userId}`, {
                description: product.description,
                imageURL: product.url,
                price: product.price,
                productId: product.productId,
                productName: product.name,
                quantity: product.qty,
                vendorId: product.vendorId
            })
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
        if(this.carts.get(productId)) {
            let updatingProduct: ProductModel = this.carts.get(productId);
            //check if they select the same qty
            if(updatingProduct.qty === +newQty) return;
            updatingProduct.qty = newQty;
            if(this.auth) {
                this.http.post(Endpoint.CART_ENDPOINT.ADD_TO_CART_ENDPOINT + `/${this.authService.userId}`, {
                    description: updatingProduct.description,
                    imageURL: updatingProduct.url,
                    price: updatingProduct.price,
                    productId: updatingProduct.productId,
                    productName: updatingProduct.name,
                    quantity: updatingProduct.qty,
                    vendorId: updatingProduct.vendorId
                })
            }
            this.carts.set(productId, updatingProduct);
            this.cartSubject.next(Array.from(this.carts.values()));
        }
    }
    public deleteFromCart(productId: number) {
        if(this.auth) { 
            let existingProduct: ProductModel = this.carts.get(productId);
            this.http.request('DELETE', Endpoint.CART_ENDPOINT.REMOVE_FROM_CART_ENDPOINT + `/${this.auth.user_id}`, {
              body: {
                description: existingProduct.description,
                imageURL: existingProduct.url,
                price: existingProduct.price,
                productId: existingProduct.productId,
                productName: existingProduct.name,
                quantity: existingProduct.qty,
                vendorId: existingProduct.vendorId
              }
            });
        }
        this.carts.delete(productId);
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public clearCart() {
        this.carts.clear();
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public calculateTotal(products: ProductModel[]): { totalItem: number; subTotal: number } {
      // reset count & calculate
      let totalItem = 0;
      let subTotal = 0;
      products.forEach((product: ProductModel) => {
        totalItem += +product.qty;
        subTotal += +product.qty * +product.price;
      });
      return { totalItem, subTotal: +subTotal.toFixed(2) };
    }
}
