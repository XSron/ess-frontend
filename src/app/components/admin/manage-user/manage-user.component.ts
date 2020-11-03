import { Component, OnDestroy, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
    selector: 'manage-user',
    templateUrl: 'manage-user.component.html'
})
export class ManageUserComponent implements OnInit, OnDestroy {

  public users: any;
  private subscription: Subscription;
  public isLoading: boolean = true;

  constructor(private managerUserService: ManageUserService) {
  }

  onChangeStatus(username: string, enable: boolean) {
    let status: string;
    if (enable) {
      status = 'Active';
    }
    else {
      status = 'Inactive';
    }

    if (confirm('Are you sure to set user ' + username + ' status to ' + status + '?')) {
      this.subscription = this.managerUserService.changeStatusUser(username, enable).subscribe(result => {
        // Refresh the UI
        this.users.forEach((user, index) => {
          if (user.username === username) {
            user.enable = enable;
          }
        });
      }, error => {
        alert(JSON.stringify(error));
      });
    }
  }

  ngOnInit(): void {
    this.subscription = this.managerUserService.getAllUsers().subscribe(result => {
      this.users = result;
      this.isLoading = false;
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
