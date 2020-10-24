import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../model/ProductModel';

@Injectable()
export class ProductService {

  public productSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
  private products: ProductModel[];

  constructor(private http: HttpClient) {
    this.products = [
      new ProductModel(1, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(2, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(3, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(4, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(5, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(6, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(7, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(8, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(9, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(10, 'Coke', 'Coke make you fat', 100, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage')
    ];
    this.productSubject.next(this.products);
  }

  public getProductById(productId: number): ProductModel {
    return this.products.filter((product: ProductModel) => {
      return product.productId === productId;
    })[0];
  }

}
