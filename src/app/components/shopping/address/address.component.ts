import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressService} from '../../../services/address.service';
import {AddressModel} from '../../../model/AddressModel';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  @Input() addressEditing: AddressModel;
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
      firstName: [this.addressEditing ? this.addressEditing.firstName : '', Validators.required],
      lastName: [this.addressEditing ? this.addressEditing.lastName : '', Validators.required],
      phoneNumber: [this.addressEditing ? this.addressEditing.phoneNumber : '', Validators.required],
      street1: [this.addressEditing ? this.addressEditing.street1 : '', Validators.required],
      street2: [this.addressEditing ? this.addressEditing.street2 : ''],
      city: [this.addressEditing ? this.addressEditing.city : '', Validators.required],
      state: [this.addressEditing ? this.addressEditing.state : '', Validators.required],
      zipCode: [this.addressEditing ? this.addressEditing.zipCode : '', Validators.required],
      country: [this.addressEditing ? this.addressEditing.country : '', Validators.required],
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
      phoneNumber: this.form.value.phoneNumber,
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
