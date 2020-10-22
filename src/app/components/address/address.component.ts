import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import {AddressModel} from '../../model/AddressModel';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {

  public addressList: AddressModel[] = [];

  constructor(private deliveryAddressService: AddressService) { }

  ngOnInit(): void {
    // this.addressList = [];
    this.deliveryAddressService
      .getDeliveryAddressList()
      .subscribe(data => {
        this.addressList = data;
      });
  }

  addDeliveryAddress(): void {
    const mockBody = {
      // id: 4,
      number: '332',
      street: 'ACV',
      city: 'SDD',
      state: 'EF',
      zipCode: 34255,
      country: 'AG',
      isDefault: false
    };
    this.deliveryAddressService
      .addDeliveryAddress(mockBody)
      .subscribe(data => {
        console.log(data);
      });
  }

  updateDeliveryAddress(addressID): void {
    const mockBody = {
      // id: 3,
      number: '333',
      street: 'AAA',
      city: 'SSS',
      state: 'AA',
      zipCode: 12345,
      country: 'BB',
      isDefault: false
    };
    this.deliveryAddressService
      .updateDeliveryAddress(addressID, mockBody)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteDeliveryAddress(addressID): void {
    this.deliveryAddressService
      .deleteDeliveryAddress(addressID)
      .subscribe(data => {
        console.log(data);
      });
  }

}
