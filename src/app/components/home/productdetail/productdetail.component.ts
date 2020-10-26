import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';
import { ProductService } from 'src/app/services/productservice.service';

@Component({
    selector: 'productdetail',
    templateUrl: 'productdetail.component.html'
})
export class ProductDetailComponent {
    public product: ProductModel;
    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
        let productId: number = this.activatedRoute.snapshot.params.id;
        this.product = this.productService.getProductById(productId);
    }
    public addToCart() {
        this.cartService.addToCart(this.product);
    }
}
