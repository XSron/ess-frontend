import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CreditCardService } from '../../services/credit-card.service';
import { CreditCardModel } from '../../model/CreditCardModel';

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
      expiredDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });

    // Load Credit Card data
    this.creditCardService
      .getCreditCardList()
      .subscribe(data => {
        this.creditCardList = data;
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
    this.addCreditCard(this.form.value);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  addCreditCard(creditCard): void {
    // const mockBody = {
    //   // id: 4,
    //   name: 'Gabriel Campbell',
    //   number: '5380531937114059',
    //   cvv: '357',
    //   expiredDate: '12/2021',
    //   type: 'Master Card',
    //   limit: '1049',
    //   isDefault: false
    // };
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
