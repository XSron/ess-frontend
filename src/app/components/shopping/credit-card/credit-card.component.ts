import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditCardService} from '../../../services/credit-card.service';
import {CreditCardModel} from '../../../model/CreditCardModel';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html'
})

export class CreditCardComponent implements OnInit {

  public creditCardList: CreditCardModel[] = [];

  private form: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    // Form setup
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$')]],
      type: ['master', Validators.required],
      expiredDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });

    // Load Credit Card data
    this.creditCardService
      .getCreditCard()
      .subscribe(data => {
        this.creditCardList = data;
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

  getCreditCard(): CreditCardModel {
    return new CreditCardModel({
      name: this.form.value.name,
      number: this.form.value.number,
      cvv: this.form.value.cvv,
      expiredDate: this.form.value.expiredDate,
      type: this.form.value.type
    });
  }

  addCreditCard(creditCard): void {
    this.creditCardService
      .addCreditCard(creditCard)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteCreditCard(addressID): void {
    this.creditCardService
      .deleteCreditCard(addressID)
      .subscribe(data => {
        console.log(data);
      });
  }

}
