import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/model/ProductModel';
import { CartService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'product-item-grid',
  templateUrl: 'product-item-grid.component.html',
  styleUrls: ['./product-item-grid.component.css']
})
export class ProductItemGridComponent {

  // MARK: - Properties

  @Input() public product: ProductModel;

  // MARK: - Angular Core functions

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  // MARK: - Item functions
  public addToCart(): void {
    const selectedProduct = new ProductModel({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      unitPrice: this.product.unitPrice,
      imageUrl: this.product.imageUrl,
      unitsInStock: this.product.unitsInStock,
      vendorId: this.product.vendorId,
      vendor: this.product.vendor,
      category: this.product.category
    });
    this.cartService.addToCart(selectedProduct);
  }

  public viewDetail(): void {
    this.router.navigate(['/productdetail', this.product.id]);
  }

}
