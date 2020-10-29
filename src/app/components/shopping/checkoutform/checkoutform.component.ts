import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { AuthenticationService } from 'src/app/services/authservice.service';

@Component({
    selector: 'checkoutform',
    templateUrl: 'checkoutform.component.html'
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
    public isCheck: boolean;
    private auth: AuthModel;
    private authSubscription: Subscription;
    constructor(private router: Router, private authService: AuthenticationService) {}
    ngOnInit() {
        this.authSubscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
            this.auth = auth;
        });
    }
    public handleReview() {
        if(this.auth) {
            if(confirm("Do you want to save the information for your User Profile?")) {
                //call API to save address and credit card to a logined user
            }
        }
        this.router.navigate(['/checkout']);
    }
    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}