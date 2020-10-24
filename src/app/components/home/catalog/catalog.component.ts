import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';

@Component({
    selector: 'catalog',
    templateUrl: 'catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
    @Input() public productId: number;
    @Input() public url: string;
    @Input() public name: string;
    @Input() public description: string;
    @Input() public category: string;
    @Input() public price: number;
    constructor(private cartService: CartService, private router: Router) {}
    public addToCart() {
        this.cartService.addToCart(new ProductModel(this.productId, this.name, this.description, this.price, this.url, 1, '', ''));
    }
    public viewDetail() {
        this.router.navigate(['/productdetail', this.productId]);
    }
}
