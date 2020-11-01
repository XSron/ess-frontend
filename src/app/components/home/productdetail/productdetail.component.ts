import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';
import { ProductService } from 'src/app/services/productservice.service';

@Component({
    selector: 'productdetail',
    templateUrl: 'productdetail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    public product: ProductModel;
    private productSubscription: Subscription;
    public isLoading: boolean = true;
    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService) {}
    ngOnInit() {
        let productId: number = this.activatedRoute.snapshot.params.id;
        this.productSubscription = this.productService.getProductById(productId).subscribe((product: ProductModel) => {
            this.product = product;
            this.isLoading = false;
        });
    }
    public addToCart() {
        let productToBeAdded: ProductModel = Object.create(this.product);
        productToBeAdded.unitsInStock = 1;
        this.cartService.addToCart(productToBeAdded);
    }
    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }
}
