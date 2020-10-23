import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AddressModel } from '../../model/AddressModel';

class Address implements AddressModel {
  id: number;
  firstName: string;
  lastName: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  public addressList: AddressModel[] = [];
  public model = new Address();

  constructor(private deliveryAddressService: AddressService) { }

  ngOnInit(): void {
    this.deliveryAddressService
      .getDeliveryAddressList()
      .subscribe(data => {
        this.addressList = data;
      });
  }

  onSubmit(form): void {
    console.log(form.value);
    this.addDeliveryAddress(form.value);
  }

  addDeliveryAddress(address): void {
    // const mockBody = {
    //   // id: 4,
    //   number: '332',
    //   street: 'ACV',
    //   city: 'SDD',
    //   state: 'EF',
    //   zipCode: 34255,
    //   country: 'AG',
    //   isDefault: false
    // };
    this.deliveryAddressService
      .addDeliveryAddress(address)
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
