import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../services/credit-card.service';
import {CreditCardModel} from '../../model/CreditCardModel';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html'
})
export class CreditCardComponent implements OnInit {

  public creditCardList: CreditCardModel[] = [];

  constructor(private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    // this.creditCardList = [];
    this.creditCardService
      .getCreditCardList()
      .subscribe(data => {
        this.creditCardList = data;
      });
  }

  addCreditCard(): void {
    const mockBody = {
      // id: 4,
      name: 'Gabriel Campbell',
      number: '5380531937114059',
      cvv: '357',
      expiredDate: '12/2021',
      type: 'Master Card',
      limit: '1049',
      isDefault: false
    };
    this.creditCardService
      .addCreditCard(mockBody)
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
