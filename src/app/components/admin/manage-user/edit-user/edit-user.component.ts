import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/model/UserModel';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public user: UserModel = null;

  constructor(private userService: UserService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let username: string;

    this.activeRoute.params.subscribe(params => {
      username = params['username'];
    })

    this.userService.getUserByName(username).subscribe(result => {
      this.user = result;
    });
  }

  editUser(): void {
    this.userService.updateUserByAdmin(this.user).subscribe(r => {
      alert("Update user successful.");
      this.router.navigate(['admin/manageuser']);
    }, err => {
      alert(JSON.stringify(err));
    });
  }

}
