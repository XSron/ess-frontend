import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { AuthenticationService } from 'src/app/services/authservice.service';

@Component({
    selector: 'header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticatePage: boolean = false;
    public auth: AuthModel;
    private userSubscription: Subscription;
    constructor(private authService: AuthenticationService, private router: Router) {}
    ngOnInit() {
        this.userSubscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
            this.auth = auth;
        })
    }
    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
    onLogout() {
        this.authService.userSubject.next(null);
        localStorage.removeItem("auth");
        this.router.navigate(['/']);
    }
}