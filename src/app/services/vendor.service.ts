import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Endpoint} from '../common/endpoint';
import {ProductModel} from '../model/ProductModel';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.http.get<any>(Endpoint.VENDOR_ENDPOINT.GET_ALL_PRODUCT);
  }

  public addNewProduct(product: ProductModel): Observable<any> {
    return this.http.post(Endpoint.VENDOR_ENDPOINT.ADD_NEW_PRODUCT, product);
  }

  public editProductById(id: number, product: ProductModel): Observable<any> {
    return this.http.put(Endpoint.VENDOR_ENDPOINT.EDIT_PRODUCT + `/${id}`, product);
  }

  public deleteProductById(id: number): Observable<any> {
    return this.http.delete(Endpoint.VENDOR_ENDPOINT.DELETE_PRODUCT_BY_ID + `/${id}`);
  }

}