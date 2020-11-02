import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AddressComponent} from '../../../shopping/address/address.component';
import {AddressModel} from '../../../../model/AddressModel';
import { UserService } from 'src/app/services/userservice.service';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/model/ProductModel';

@Component({
  selector: 'manage-address',
  templateUrl: 'manage-address.component.html'
})

export class ManageAddressComponent implements OnInit {
  @ViewChild('userProfileAddressComponent') userProfileAddressComponent: AddressComponent;
  public isAddNewAddress = false;
  private username: string
  private addressId: number;
  public selectedAddress: AddressModel

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    if(this.router.getCurrentNavigation().extras) {
      let beforeMapping = this.router.getCurrentNavigation().extras.state as {
        addressId: number,
        houseNumber: number,
        street: string,
        city: string,
        state: string,
        zipcode: string,
        country: string,
        defaultAddress: boolean
      }

      if(beforeMapping) {
        this.selectedAddress = new AddressModel({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          street1: beforeMapping.street,
          street2: beforeMapping.houseNumber + '',
          city: beforeMapping.city,
          state: beforeMapping.state,
          country: beforeMapping.country,
          zipCode: +beforeMapping.zipcode
        })
      }
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.isAddNewAddress = this.route.snapshot.fragment === 'new';
    this.username = this.route.snapshot.queryParams.username
    this.addressId = this.route.snapshot.queryParams.addressId
  }

  public handleAddress(): void {
    if (!this.userProfileAddressComponent.submitAction()) {
      alert('Please enter User Address.');
      return;
    }
    const address: AddressModel = this.userProfileAddressComponent.getAddress();
    if (this.isAddNewAddress) {
      const sub: Subscription = this.userService.addUserAddress(this.username, address).subscribe(result => {
        sub.unsubscribe();
        this.router.navigate(['/user/userprofile'])
      }, error => {
        alert(JSON.stringify(error));
        sub.unsubscribe();
      })
    } else {
      const sub: Subscription = this.userService.updateUserAddress(this.username, this.addressId, address).subscribe(result => {
        sub.unsubscribe();
        this.router.navigate(['/user/userprofile'])
      }, error => {
        this.router.navigate(['/user/userprofile'])
        sub.unsubscribe();
      })
    }
  }

}
