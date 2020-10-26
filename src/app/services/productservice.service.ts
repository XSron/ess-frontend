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
      new ProductModel(1, 'Coke', 'This is Coke', 2.1, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(2, 'Pepsi', 'This is Pepsi', 2.3, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(3, 'Budwiser', 'This is Budwiser', 10.2, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(4, 'Budlight', 'This is Budlight', 11.2, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(5, 'Water', 'This is Water', 0.75, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(6, 'Macbook', 'This is Macbook', 2000, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(7, 'JBL Speaker', 'This is JBL Speaker', 250, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(8, 'Bose Speaker', 'This is Bose', 350, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(9, 'IPhone 11 Max Pro', 'This is IPhone 11 Max Pro', 1700, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage'),
      new ProductModel(10, 'IPad', 'This is IPad', 900, 'https://i.etsystatic.com/24304292/r/il/d56e00/2473749145/il_794xN.2473749145_asul.jpg',
        0, 'Coka Cola', 'Beverage')
    ];
    this.productSubject.next(this.products);
  }

  public getProductById(productId: number): ProductModel {
    return this.products.filter((product: ProductModel) => {
      return product.productId === +productId;
    })[0];
  }

}
