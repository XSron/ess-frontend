import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {CartService} from '../../../services/cartservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {

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
