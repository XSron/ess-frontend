import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from '../model/AddressModel';
import { Endpoint } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAddress(): any {
    return this.httpClient.get<AddressModel[]>(Endpoint.Payment.ShippingAddress);
  }

  addAddress( body): any {
    return this.httpClient.post(Endpoint.Payment.ShippingAddress, body);
  }

  updateAddress(id, body): any {
    return this.httpClient.put(Endpoint.Payment.ShippingAddress + `/${id}`, body);
  }

  deleteAddress(id): any {
    return this.httpClient.delete(Endpoint.Payment.ShippingAddress + `/${id}`);
  }

}
