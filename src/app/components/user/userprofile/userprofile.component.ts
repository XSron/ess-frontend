import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/UserModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'userprofile',
  templateUrl: 'userprofile.component.html'
})

export class UserProfileComponent implements OnInit, OnDestroy {
  public user: UserModel;
  private userSubscription: Subscription;
  public isLoading: boolean = true;
  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService) {}
  ngOnInit() {
    this.userSubscription = this.userService.getUserByName(this.authService.username).subscribe((user: UserModel) => {
      this.user = user;
      this.isLoading = false;
    })
  }
  public newAddress(): void {
    this.router.navigate(['/user/manage-address'], {fragment: 'new', queryParams: {
      username: this.user.username
    }});
  }

  public editAddress(addressId: number): void {
    let navigationExtra: NavigationExtras = {
      fragment: 'edit', 
      queryParams: {
        username: this.user.username,
        addressId: addressId
      },
      state: this.user.addresses.filter((value) => value.addressId === +addressId)[0]
    }
    this.router.navigate(['/user/manage-address'], navigationExtra);
  }

  public removeAddress(addressId: number): void {
    this.userService.removeUserAddress(this.user.username, addressId).subscribe((result) => {
      //update UI
      this.user.addresses.forEach((data, index) => {
        if(data.addressId === +addressId) {
          return this.user.addresses.splice(index, 1);
        }
      })
      alert("Succeed");
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  public setDefaultAddress(addressId: number) {
    this.userService.setDefaultAddress(this.authService.username, addressId).subscribe((result) => {
      this.user.addresses.forEach((address, index) => {
        if(address.addressId === +addressId) 
          address.defaultAddress = true;
        else
          address.defaultAddress = false;
        this.user.addresses[index] = address;
      })
      alert('Succeed');
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  public newCard(): void {
    this.router.navigate(['/user/manage-card']);
  }

  public removeCard(cardNumber: string): void {
    this.userService.removeCardFromUser(this.authService.username, cardNumber).subscribe((result) => {
      //update UI
      this.user.cards.forEach((data, index) => {
        if(data.cardNumber === cardNumber) {
          return this.user.cards.splice(index, 1);
        }
      })
      alert('Succeed')
    }, error => {
      alert(JSON.stringify(error));
    })
  }

  public getRoles(): string {
    let roles: string = ''
    this.user.roles.forEach((data) => {
      roles += `${data.name}, `
    })
    return roles.substring(0, roles.length - 2)
  }

  public updateProfile() {
    this.userService.updateUserProfile(this.user.username, this.user.email, this.user.phone).subscribe((result) => {
      alert(JSON.stringify(result))
    }, error => {
      alert(JSON.stringify(error))
    })
  }

  public setDefaultCard(cardNumber: string) {
    this.userService.setDefaultCreditCard(this.user.username, cardNumber).subscribe((result) => {
      this.user.cards.forEach((card, index) => {
        if(card.cardNumber === cardNumber) 
          card.default = true;
        else
          card.default = false;
        this.user.cards[index] = card;
      })
      alert('Succeed');
    }, error => {
      alert(JSON.stringify(error))
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
