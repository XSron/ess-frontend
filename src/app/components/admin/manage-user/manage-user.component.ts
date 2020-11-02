import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
    selector: 'manage-user',
    templateUrl: 'manage-user.component.html'
})
export class ManageUserComponent implements OnInit, OnDestroy {

  public users: any;
  private subscription: Subscription;

  constructor(private managerUserService: ManageUserService) {

  }

  ngOnInit(): void {
    this.subscription = this.managerUserService.getAllUsers().subscribe(result => {
      this.users = result;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
