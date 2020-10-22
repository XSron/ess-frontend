import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartservice.service';
@Component({
    selector: 'checkout',
    templateUrl: 'checkout.component.html'
})
export class CheckoutComponent {
    constructor(private cartService: CartService, private router: Router) {}
    public placeAnOrder() {

        //clear cart
        this.cartService.clearCart();
        alert('You have been ordered!')
        this.router.navigate(['/']);
    }
}