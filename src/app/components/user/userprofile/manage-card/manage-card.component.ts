import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCardComponent } from '../../../shopping/credit-card/credit-card.component';
import {CreditCardModel} from '../../../../model/CreditCardModel';
import { UserService } from 'src/app/services/userservice.service';
import { AuthenticationService } from 'src/app/services/authservice.service';

@Component({
  selector: 'manage-card',
  templateUrl: 'manage-card.component.html'
})

export class ManageCardComponent implements OnInit {
  @ViewChild('creditCardComponent') creditCardComponent: CreditCardComponent;
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) {}
  ngOnInit(): void { }

  public handleCreditCard(): void {
    if (!this.creditCardComponent.submitAction()) 
      return alert('Please enter Credit Card.');
    const creditCard: CreditCardModel = this.creditCardComponent.getCreditCard();
    this.userService.addCardToUser(this.authService.username, creditCard).subscribe((result) => {
      alert('Succeed')
      this.router.navigate(['/user/userprofile'])
    }, error => {
      alert(JSON.stringify(error))
    });
  }

}
