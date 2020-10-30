import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressType } from '../../../../common/enum';
import {AddressComponent} from '../../../shopping/address/address.component';
import {AddressModel} from '../../../../model/AddressModel';

@Component({
  selector: 'manage-address',
  templateUrl: 'manage-address.component.html'
})
export class ManageAddressComponent implements OnInit {

  @ViewChild('userProfileAddressComponent') userProfileAddressComponent: AddressComponent;

  public isAddNewAddress = false;
  public AddressType = AddressType;

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
      alert(
        'SUCCESS!! :-)\n\n Call add user address API.' +
        JSON.stringify(userProfileAddress, null, 4)
      );
    } else {
      // Call edit address API.
      alert(
        'SUCCESS!! :-)\n\n Call edit user address API.' +
        JSON.stringify(userProfileAddress, null, 4)
      );
    }

  }


}
