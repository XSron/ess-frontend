import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
    public loadCartFromUserAfterLoggedin(): Observable<any> {
        return this.http.get<any>(Endpoint.CART_ENDPOINT.GET_CART_ENDPOINT + `/${this.authService.userId}`);
    } 
    public updateCartModelAndUI(result: any) {
        if(result) {
            //clear cart
            this.carts.clear();

            //update cart model
            const products: ProductModel[] = result['products'];
            products.forEach((product: ProductModel) => {
                this.carts.set(product.id, product);
            })
            
            //update cart UI 
            this.cartSubject.next(products);
        }
    }
    public addToCart(product: ProductModel) {
        if(this.auth) { 
            const sub: Subscription = this.http.post(Endpoint.CART_ENDPOINT.ADD_TO_CART_ENDPOINT + `/${this.authService.userId}`, {
                description: product.description,
                imageURL: product.imageUrl,
                price: product.unitPrice,
                productId: product.id,
                productName: product.name,
                quantity: product.unitsInStock,
                vendorId: product.vendorId
            }).subscribe((result) => {
                console.log(JSON.stringify(result));
                sub.unsubscribe();
            }, error => {
                console.log(JSON.stringify(error));
                sub.unsubscribe();
            })
        }
        let updatingProduct: ProductModel = Object.create(product);
        if(this.carts.get(product.id)) {
            updatingProduct = this.carts.get(product.id);
            updatingProduct.unitsInStock++;
        } 
        this.carts.set(updatingProduct.id, updatingProduct); //store in the map
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public changeCartQty(productId: number, newQty: number) {
        if(this.carts.get(productId)) {
            let updatingProduct: ProductModel = this.carts.get(productId);
            //check if they select the same qty
            if(updatingProduct.unitsInStock === +newQty) return;
            updatingProduct.unitsInStock = newQty;
            if(this.auth) {
                this.http.post(Endpoint.CART_ENDPOINT.ADD_TO_CART_ENDPOINT + `/${this.authService.userId}`, {
                    description: updatingProduct.description,
                    imageURL: updatingProduct.imageUrl,
                    price: updatingProduct.unitPrice,
                    productId: updatingProduct.id,
                    productName: updatingProduct.name,
                    quantity: updatingProduct.unitsInStock,
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
                imageURL: existingProduct.imageUrl,
                price: existingProduct.unitPrice,
                productId: existingProduct.id,
                productName: existingProduct.name,
                quantity: existingProduct.unitsInStock,
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
        totalItem += +product.unitsInStock;
        subTotal += +product.unitsInStock * +product.unitPrice;
      });
      return { totalItem, subTotal: +subTotal.toFixed(2) };
    }
}
