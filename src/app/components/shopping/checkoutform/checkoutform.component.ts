import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'checkoutform',
    templateUrl: 'checkoutform.component.html'
})
export class CheckoutFormComponent {
    public isCheck: boolean;
    constructor(private router: Router) {}
    public handleReview() {
        this.router.navigate(['/checkout']);
    }
}