import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'userprofile',
    templateUrl: 'userprofile.component.html'
})
export class UserProfileComponent {
    constructor(private router: Router) {}
    public newAddress() {
        this.router.navigate(['/user/manage-address'], {
            fragment: "new"
        })
    }
    public editAddress() {
        this.router.navigate(['/user/manage-address'], {
            fragment: "edit"
        })
    }
    public removeAddress() {
        
    }
    public newCard() {
        this.router.navigate(['/user/manage-card'], {
            fragment: "new"
        })
    }
    public editCard() {
        this.router.navigate(['/user/manage-card'], {
            fragment: "edit"
        })
    }
    public removeCard() {

    }
}