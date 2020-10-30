import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressService} from '../../../services/address.service';
import {AddressModel} from '../../../model/AddressModel';
import {AddressType} from '../../../common/enum';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  @Input() addressType: AddressType = AddressType.shipping;
  public AddressType = AddressType;
  public addressList: AddressModel[] = [];

  private form: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    // Form setup
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street1: ['', Validators.required],
      street2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    });

    // Load Address data
    this.addressService
      .getAddress()
      .subscribe(data => {
        this.addressList = data;
      });
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  submitAction(): boolean {
    this.submitted = true;
    return this.form.invalid === false;
  }

  resetAction(): void {
    this.submitted = false;
    this.form.reset();
  }

  getAddress(): AddressModel {
    return new AddressModel({
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      street1: this.form.value.street1,
      street2: this.form.value.street2,
      city: this.form.value.city,
      state: this.form.value.state,
      zipCode: this.form.value.zipCode,
      country: this.form.value.country
    });
  }

  addAddress(address): void {
    this.addressService
      .addAddress(address)
      .subscribe(data => {
        console.log(data);
      });
  }

  updateAddress(addressID): void {
    const mockBody = {
      number: '333',
      street: 'AAA',
      city: 'SSS',
      state: 'AA',
      zipCode: 12345,
      country: 'BB',
      isDefault: false
    };
    this.addressService
      .updateAddress(addressID, mockBody)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteAddress(addressID): void {
    this.addressService
      .deleteAddress(addressID)
      .subscribe(data => {
        console.log(data);
      });
  }

}
