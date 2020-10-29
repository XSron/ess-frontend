import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import { AddressModel } from '../../../model/AddressModel';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  public addressList: AddressModel[] = [];
  private form: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private deliveryAddressService: AddressService
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
    this.deliveryAddressService
      .getDeliveryAddressList()
      .subscribe(data => {
        this.addressList = data;
      });
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.addDeliveryAddress(this.form.value);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
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
