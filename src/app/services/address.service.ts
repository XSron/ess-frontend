import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from '../model/AddressModel';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  // MARK: - Delivery Address Service

  getDeliveryAddressList(): any {
    return this.httpClient.get<AddressModel[]>(this.REST_API_SERVER + '/address');
  }

  addDeliveryAddress(body): any {
    return this.httpClient.post(this.REST_API_SERVER + '/address', body);
  }

  updateDeliveryAddress(id, body): any {
    return this.httpClient.put(this.REST_API_SERVER + '/address/' + id, body);
  }

  deleteDeliveryAddress(id): any {
    return this.httpClient.delete(this.REST_API_SERVER + '/address/' + id);
  }

}
