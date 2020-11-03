import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { ProductModel } from '../model/ProductModel';

@Injectable()
export class ProductService {
  public productSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
  constructor(private http: HttpClient) {
  }

  public getAllProducts(): Observable<any> {
    return this.http.get<any>(Endpoint.PRODUCT_ENDPOINT.GET_ALL_PRODUCT);
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(Endpoint.PRODUCT_ENDPOINT.GET_PRODUCT_BY_PRODUCT_ID + `/${productId}`);
  }

  public getProductByCategoryId(categoryId: number): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(Endpoint.PRODUCT_ENDPOINT.GET_PRODUCT_BY_CATEGORY_ID + `/${categoryId}`);
  }

  public getProductByName(name: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(Endpoint.PRODUCT_ENDPOINT.GET_PRODUCT_BY_NAME + `/${name}`)
  }

  public getInactiveProduct(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(Endpoint.PRODUCT_ENDPOINT.GET_INACTIVE_PRODUCT)
  }

  public approveProduct(products: ProductModel[]): Observable<any> {
    return this.http.put(Endpoint.PRODUCT_ENDPOINT.APPROVE_PRODUCT, products)
  }
}
