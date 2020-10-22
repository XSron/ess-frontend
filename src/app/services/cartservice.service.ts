import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../model/ProductModel';

export class CartService {
    public cartSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
    public carts: Map<number, ProductModel> = new Map<number, ProductModel>();
    public addToCart(product: ProductModel) {
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
            updatingProduct.qty = newQty;
            this.carts.set(productId, updatingProduct);
            this.cartSubject.next(Array.from(this.carts.values()));
        }
    }
    public deleteFromCart(productId: number) {
        this.carts.delete(productId);
        this.cartSubject.next(Array.from(this.carts.values()));
    }
    public clearCart() {
        this.carts.clear();
        this.cartSubject.next(Array.from(this.carts.values()));
    }
}