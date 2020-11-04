import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoleModel } from 'src/app/model/RoleModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public error: string;

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    let user: any = form.value;
    let roleList: RoleModel[];
    console.log(roleList);

    this.authService.signUp(user.username, user.password, user.roleId).subscribe(result => {
      this.userService.updateUserByAdmin(user).subscribe(r => {
        this.error = null;
        alert("Create user successful.");
        form.resetForm();
        //this.firstName.nativeElement.focus();
      }, err => {
        alert(JSON.stringify(err));
      });
    }, error => {
      alert(JSON.stringify(error));
    });
  }

}
