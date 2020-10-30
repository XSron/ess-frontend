import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authservice.service';
import { AuthModel } from '../../model/AuthModel';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menuservice.service';

@Component({
    selector: 'signin',
    templateUrl: 'authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    public isLogin: boolean = false;
    public isLoading: boolean = false;
    public error: string;
    constructor(private authService: AuthenticationService, private menuService: MenuService, private router: Router) {}
    ngOnInit() {
        this.menuService.routingChangeSubject.next(true);
    }
    onSwitch() {
        this.isLogin = !this.isLogin;
    }
    onSubmit(form: NgForm) {
        const { username, password, roleId } = form.value;
        let authObs: Observable<AuthModel>;
        this.isLoading = true;
        if(this.isLogin) {
            authObs = this.authService.signIn(username, password);
        } else {
            authObs = this.authService.signUp(username, password, roleId)
        }
        authObs.subscribe((auth: AuthModel) => {
            this.isLoading = false;
            this.error = null;

            //storing user & token
            if(this.isLogin) {
                localStorage.setItem("auth", JSON.stringify(auth));
                this.authService.broadcastUserFromLocalStorage();
                return this.router.navigate(['/'])
            }
            alert("Create User Succeed!");
            this.isLogin = true;
        }, error => {
            this.error = JSON.stringify(error.error.error_description);
            this.isLoading = false;
        })
    }
    ngOnDestroy() {
        this.menuService.routingChangeSubject.next(false);
    }
}