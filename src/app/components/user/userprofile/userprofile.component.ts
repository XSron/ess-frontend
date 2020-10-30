import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'userprofile',
  templateUrl: 'userprofile.component.html'
})

export class UserProfileComponent {

  constructor(private router: Router) {}

  public newAddress(): void {
    this.router.navigate(['/user/manage-address'], {fragment: 'new'});
  }

  public editAddress(): void {
    this.router.navigate(['/user/manage-address'], {fragment: 'edit'});
  }

  public removeAddress(): void {

  }

  public newCard(): void {
    this.router.navigate(['/user/manage-card']);
  }

  // public editCard() {
  //   this.router.navigate(['/user/manage-card'], {
  //     fragment: "edit"
  //   });
  // }

  public removeCard(): void {

  }

}
