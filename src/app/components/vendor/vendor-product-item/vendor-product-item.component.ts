import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {CartService} from '../../../services/cartservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vendor-product-item',
  templateUrl: './vendor-product-item.component.html',
  styleUrls: ['./vendor-product-item.component.css']
})
export class VendorProductItemComponent implements OnInit {

  // MARK: - Properties

  @Input() public product: ProductModel;

  // MARK: - Angular Core functions

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

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
