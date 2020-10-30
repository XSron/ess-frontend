import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditCardComponent } from '../../../shopping/credit-card/credit-card.component';
import {CreditCardModel} from '../../../../model/CreditCardModel';

@Component({
  selector: 'manage-card',
  templateUrl: 'manage-card.component.html'
})

export class ManageCardComponent implements OnInit {

  @ViewChild('creditCardComponent') creditCardComponent: CreditCardComponent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Credit card cannot edit, just add & remove only.
    // this.isAdd = this.route.snapshot.fragment === 'new'? true: false;
  }

  public handleCreditCard(): void {

    if (this.creditCardComponent.submitAction() === false) {
      alert('Please enter Credit Card.');
      return;
    }

    const creditCard: CreditCardModel = this.creditCardComponent.getCreditCard();
    alert(
      'SUCCESS!! :-)\n Call ADD credit card API.' +
      JSON.stringify(creditCard, null, 4)
    );

  }

}
