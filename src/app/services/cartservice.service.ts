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
    });
  }

  public loadCartFromUserAfterLoggedin(): Observable<any> {
    return this.http.get<any>(Endpoint.CART_ENDPOINT.GET_CART_ENDPOINT + `/${this.authService.userId}`);
  }

  public updateCartModelAndUI(result: any): void {
    if (result) {
      // clear cart
      this.carts.clear();

      // update cart model
      const products: any[] = result.products;
      products.forEach((pro: any) => {
        // const product = new ProductModel(pro.productId, pro.productName, pro.description, pro.price,
        //   pro.imageUrl, pro.quantity, pro.vendorId, '', null);
        const product = new ProductModel({
          id: pro.productId,
          name: pro.productName,
          description: pro.description,
          unitPrice: pro.price,
          imageUrl: pro.imageUrl,
          unitsInStock: pro.quantity,
          vendorId: pro.vendorId,
          vendor: '',
          category: null
        });
        this.carts.set(product.id, product);
      });

      // update cart UI
      this.cartSubject.next(Array.from(this.carts.values()));
    }
  }

  public addToCart(product: ProductModel): void {
    let updatingProduct: ProductModel = Object.create(product);
    if (this.carts.get(product.id)) {
      updatingProduct = this.carts.get(product.id);
      updatingProduct.unitsInStock++;
    }

    if (this.auth) {
      const sub: Subscription = this.http.post(Endpoint.CART_ENDPOINT.ADD_TO_CART_ENDPOINT + `/${this.authService.userId}`, {
        description: updatingProduct.description,
        imageURL: updatingProduct.imageUrl,
        price: updatingProduct.unitPrice,
        productId: updatingProduct.id,
        productName: updatingProduct.name,
        quantity: updatingProduct.unitsInStock,
        vendorId: updatingProduct.vendorId
      }).subscribe((result) => {
        console.log(JSON.stringify(result));
        sub.unsubscribe();
      }, error => {
        console.log(JSON.stringify(error));
        sub.unsubscribe();
      });
    }
    this.carts.set(updatingProduct.id, updatingProduct); // store in the map
    this.cartSubject.next(Array.from(this.carts.values()));
  }

  public changeCartQty(productId: number, newQty: number): void {
    if (this.carts.get(productId)) {
      const updatingProduct: ProductModel = this.carts.get(productId);
      // check if they select the same qty
      if (updatingProduct.unitsInStock === +newQty) { return; }
      updatingProduct.unitsInStock = newQty;
      if (this.auth) {
        const sub: Subscription = this.http.post(Endpoint.CART_ENDPOINT.ADD_TO_CART_ENDPOINT + `/${this.authService.userId}`, {
          description: updatingProduct.description,
          imageURL: updatingProduct.imageUrl,
          price: updatingProduct.unitPrice,
          productId: updatingProduct.id,
          productName: updatingProduct.name,
          quantity: updatingProduct.unitsInStock,
          vendorId: updatingProduct.vendorId
        }).subscribe((data) => {
          sub.unsubscribe();
        }, (error) => {
          sub.unsubscribe();
        });
      }
      this.carts.set(productId, updatingProduct);
      this.cartSubject.next(Array.from(this.carts.values()));
    }
  }

  public deleteFromCart(productId: number): void {
    if (this.auth) {
      const existingProduct: ProductModel = this.carts.get(productId);
      this.http.request('delete', Endpoint.CART_ENDPOINT.REMOVE_FROM_CART_ENDPOINT + `/${this.auth.user_id}`, {
        body: {
          description: existingProduct.description,
          imageURL: existingProduct.imageUrl,
          price: existingProduct.unitPrice,
          productId: existingProduct.id,
          productName: existingProduct.name,
          quantity: existingProduct.unitsInStock,
          vendorId: existingProduct.vendorId
        }
      }).subscribe((result) => {
        console.log('delete ' + result);
      }, (error) => {
        console.log('delete error' + JSON.stringify(error));
      });
    }
    this.carts.delete(productId);
    this.cartSubject.next(Array.from(this.carts.values()));
  }

  public clearCart(): void {
    this.carts.clear();
    this.cartSubject.next(Array.from(this.carts.values()));
  }

  public calculateTotal(products: ProductModel[]): { totalItem: number; subTotal: number } {
    if (!products) {
      return {
        totalItem: 0,
        subTotal: 0
      };
    }
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
