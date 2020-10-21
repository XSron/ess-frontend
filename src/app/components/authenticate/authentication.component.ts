import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authservice.service';
import { AuthModel } from '../../model/AuthModel';
import { Router } from '@angular/router';

@Component({
    selector: 'signin',
    templateUrl: 'authentication.component.html'
})
export class AuthenticationComponent {
    public isLogin: boolean = false;
    public isLoading: boolean = false;
    public error: string
    constructor(private authService: AuthenticationService, private router: Router) {}
    onSwitch() {
        this.isLogin = !this.isLogin;
    }
    onSubmit(form: NgForm) {
        const { username, password } = form.value;
        let authObs: Observable<any>;
        this.isLoading = true;
        if(this.isLogin) {
            authObs = this.authService.signIn(username, password);
        } else {
            authObs = this.authService.signUp(username, password)
        }
        authObs.subscribe((auth: AuthModel) => {
            this.isLoading = false;
            this.error = null;
            console.log('data ' + JSON.stringify(auth));

            //storing user & token
            localStorage.setItem("auth", JSON.stringify(auth));
            this.authService.broadcastUserFromLocalStorage();
            this.router.navigate(['/vendor'])
        }, error => {
            console.log(JSON.stringify(error));
            //this.error = error.error.error.message;
            this.isLoading = false;
        })
    }
}