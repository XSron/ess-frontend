import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { ProductService } from 'src/app/services/productservice.service';

@Component({
    selector: 'productlist',
    templateUrl: 'productlist.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public products: ProductModel[]
    constructor(private productService: ProductService) {}
    ngOnInit() {
        this.subscription = this.productService.productSubject.subscribe((products: ProductModel[]) => {
            this.products = products.slice();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}