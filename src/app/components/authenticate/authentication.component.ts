import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authservice.service';
import { AuthModel } from '../../model/AuthModel';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menuservice.service';
import jwt_decode from "jwt-decode";

@Component({
    selector: 'signin',
    templateUrl: 'authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    public isLogin: boolean = false;
    public isLoading: boolean = false;
    public error: string;
    public role: string;
    constructor(private authService: AuthenticationService, private menuService: MenuService, private router: Router) {}
    ngOnInit() {
        this.menuService.routingChangeSubject.next(true);
    }
    onSwitch() {
        this.isLogin = !this.isLogin;
    }
    onSubmit(form: NgForm) {
        const { username, password } = form.value;
        let authObs: Observable<AuthModel>;
        this.isLoading = true;
        if(this.isLogin) {
            authObs = this.authService.signIn(username, password);
        } else {
            authObs = this.authService.signUp(username, password)
        }
        authObs.subscribe((auth: AuthModel) => {
            this.isLoading = false;
            this.error = null;

            //decode access token
            let afterDecoded: string = jwt_decode(auth.access_token);
            this.role = afterDecoded['authorities'][0];
            console.log(this.role);

            //storing user & token
            localStorage.setItem("auth", JSON.stringify(auth));
            this.authService.broadcastUserFromLocalStorage();
            this.router.navigate(['/'])
        }, error => {
            console.log(JSON.stringify(error));
            //this.error = error.error.error.message;
            this.isLoading = false;
        })
    }
    ngOnDestroy() {
        this.menuService.routingChangeSubject.next(false);
    }
}