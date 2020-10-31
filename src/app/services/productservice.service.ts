import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { ProductModel } from '../model/ProductModel';

@Injectable()
export class ProductService {
  public productSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
  private products: ProductModel[];
  constructor(private http: HttpClient) {
  }
  
  public getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(Endpoint.PRODUCT_ENDPOINT.GET_ALL_PRODUCT);
  }

  public getProductById(productId: number): ProductModel {
    return this.products.filter((product: ProductModel) => {
      return product.productId === +productId;
    })[0];
  }

  public getProductByCategoryId(categoryId: number): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(Endpoint.PRODUCT_ENDPOINT.GET_PRODUCT_BY_CATEGORY_ID + `/${categoryId}`);
  }
}
