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

  @Input() public product: ProductModel;

  constructor(private cartService: CartService, private router: Router) {}

  public addToCart(): void {
    const selectedProduct = new ProductModel(
      this.product.productId,
      this.product.name,
      this.product.description,
      this.product.price,
      this.product.url,
      1,
      '',
      '');
    this.cartService.addToCart(selectedProduct);
  }

  public viewDetail(): void {
    this.router.navigate(['/productdetail', this.product.productId]);
  }

}
