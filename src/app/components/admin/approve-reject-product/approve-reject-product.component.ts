import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';
import { ProductService } from 'src/app/services/productservice.service';
@Component({
    selector: 'approve-reject-product',
    templateUrl: 'approve-reject-product.component.html'
})
export class ApproveRejectProductComponent implements OnInit, OnDestroy {
    public products: ProductModel[]
    public isLoading: boolean = true;
    private productSubscription: Subscription;
    constructor(private productService: ProductService) {}
    ngOnInit() {
        this.productSubscription = this.productService.getInactiveProduct().subscribe((products: ProductModel[]) => {
            this.products = products;
            this.isLoading = false;
        })
    }
    public approveProduct(productId: number) {
        const product: ProductModel[] = this.products.filter((product: ProductModel) => {
            return product.id === +productId;
        })
        const sub: Subscription = this.productService.approveProduct(product).subscribe((result) => {
            //update UI
            this.products = this.products.filter((product: ProductModel) => {
                return product.id !== productId;
            }) 
            alert('Succeed');
            sub.unsubscribe();
        }, (error) => {
            alert(JSON.stringify(error));
            sub.unsubscribe();
        });
    }
    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }
}