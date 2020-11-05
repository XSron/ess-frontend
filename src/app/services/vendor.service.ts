import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Endpoint} from '../common/endpoint';
import {ProductModel} from '../model/ProductModel';
import {HttpClient} from '@angular/common/http';
import { ProductVendorModel } from '../model/ProductVendorModel';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  public getAllProducts(vendor: number): Observable<any> {
    const url: string = Endpoint.VENDOR_ENDPOINT.SERVICE_URL + Endpoint.VENDOR_ENDPOINT.GET_ALL_PRODUCT + vendor;
    return this.http.get<any>(url);
  }

  public addNewProduct(product: ProductVendorModel): Observable<any> {
    const url: string = Endpoint.VENDOR_ENDPOINT.SERVICE_URL + Endpoint.VENDOR_ENDPOINT.ADD_NEW_PRODUCT;
    return this.http.post(url, product);
  }

  public editProductById(id: number, product: ProductVendorModel): Observable<any> {
    const url: string = Endpoint.VENDOR_ENDPOINT.SERVICE_URL + Endpoint.VENDOR_ENDPOINT.EDIT_PRODUCT;
    return this.http.put(url + id , product);
  }

  public deleteProductById(id: number): Observable<any> {
    const url: string = Endpoint.VENDOR_ENDPOINT.SERVICE_URL + Endpoint.VENDOR_ENDPOINT.DELETE_PRODUCT_BY_ID;
    return this.http.delete(url + id);
  }

}
