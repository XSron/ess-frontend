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
        }, error => {
            this.isLoading = false;
            alert('No Products to be approved!')
        })
    }
    public approveProduct(productId: number) {
        const sub: Subscription = this.productService.approveProduct([productId]).subscribe((result) => {
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