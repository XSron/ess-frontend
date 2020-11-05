import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { UserService } from 'src/app/services/userservice.service';
import {UserModel} from '../../../../model/UserModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  public selectedUser: UserModel;
  public error: string;
  public form: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.selectedUser = this.router.getCurrentNavigation().extras.state as UserModel;
  }

  ngOnInit(): void {
    // Form setup
    console.log('selectedUser: ', this.selectedUser);
    this.form = this.formBuilder.group({
      firstName: [this.selectedUser ? this.selectedUser.firstName : ''],
      lastName: [this.selectedUser ? this.selectedUser.lastName : ''],
      username: [this.selectedUser ? this.selectedUser.username : ''],
      email: [this.selectedUser ? this.selectedUser.email : ''],
      phone: [this.selectedUser ? this.selectedUser.phone : ''],
      password: [''],
      // roleId: [this.selectedUser ? this.selectedUser.roles[0].id : '']
      roleId: [this.selectedUser ? (this.selectedUser.roles.length > 0 ? this.selectedUser.roles[0].id : '') : '']
    });

    if (this.selectedUser) {
      this.form.controls['username'].disable();
    }

  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  submitAction(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.selectedUser) {
      // Edit Use Mode
      const username = this.selectedUser.username;
      this.userService.updateUserByAdmin(username, this.getUser()).subscribe(result => {
        console.log('Result: ', result);
        alert('Update user successful.');
      }, error => {
        alert(JSON.stringify(error));
      });
    } else {
      // Add New User Mode
      const user: any = this.getUser();
      this.authService.signUp(user.username, user.password, user.roleId).subscribe(result => {
        this.userService.updateUserByAdmin(user.username, user).subscribe(r => {
          this.error = null;
          alert('Create user successful.');
          this.resetAction();
        }, err => {
          alert(JSON.stringify(err));
        });
      }, error => {
        alert(JSON.stringify(error));
      });
    }

  }

  resetAction(): void {
    this.submitted = false;
    this.form.reset();
  }

  getUser(): any {
    return {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      phone: this.form.value.phone,
      roleId: this.form.value.roleId
    };
  }

}
