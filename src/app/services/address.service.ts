import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from '../model/AddressModel';
import { Endpoint } from '../common/endpoint';

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAddress(): any {
    return this.httpClient.get<AddressModel[]>(Endpoint.ORDER_ENDPOINT.ADDRESS_ENDPOINT);
  }

  addAddress( body): any {
    return this.httpClient.post(Endpoint.ORDER_ENDPOINT.ADDRESS_ENDPOINT, body);
  }

  updateAddress(id, body): any {
    return this.httpClient.put(Endpoint.ORDER_ENDPOINT.ADDRESS_ENDPOINT + `/${id}`, body);
  }

  deleteAddress(id): any {
    return this.httpClient.delete(Endpoint.ORDER_ENDPOINT.ADDRESS_ENDPOINT + `/${id}`);
  }

}
