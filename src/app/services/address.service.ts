import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from '../model/AddressModel';
import { AppConfig } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  // MARK: - Delivery Address Service

  getDeliveryAddressList(): any {
    return this.httpClient.get<AddressModel[]>(AppConfig.REST_API_SERVER + '/address');
  }

  addDeliveryAddress(body): any {
    return this.httpClient.post(AppConfig.REST_API_SERVER + '/address', body);
  }

  updateDeliveryAddress(id, body): any {
    return this.httpClient.put(AppConfig.REST_API_SERVER + '/address/' + id, body);
  }

  deleteDeliveryAddress(id): any {
    return this.httpClient.delete(AppConfig.REST_API_SERVER + '/address/' + id);
  }

}
