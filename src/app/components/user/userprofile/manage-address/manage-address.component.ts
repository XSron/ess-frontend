import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AddressComponent} from '../../../shopping/address/address.component';
import {AddressModel} from '../../../../model/AddressModel';

@Component({
  selector: 'manage-address',
  templateUrl: 'manage-address.component.html'
})

export class ManageAddressComponent implements OnInit {

  @ViewChild('userProfileAddressComponent') userProfileAddressComponent: AddressComponent;

  public isAddNewAddress = false;
  public selectedAddress = new AddressModel({
    // Mock selected address to Edit
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    street1: 'street1',
    street2: 'street2',
    city: 'city',
    state: 'state',
    zipCode: 123456,
    country: 'Viet Nam'
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isAddNewAddress = this.route.snapshot.fragment === 'new';
  }

  public handleAddress(): void {

    if (this.userProfileAddressComponent.submitAction() === false) {
      alert('Please enter User Address.');
      return;
    }

    const userProfileAddress: AddressModel = this.userProfileAddressComponent.getAddress();

    if (this.isAddNewAddress) {
      // Call add address API.
      alert('SUCCESS!! :-)\n Call ADD user address API.' +
        JSON.stringify(userProfileAddress, null, 4));
    } else {
      // Call edit address API.
      alert('SUCCESS!! :-)\n Call EDIT user address API.' +
        JSON.stringify(userProfileAddress, null, 4));
    }

  }

}
