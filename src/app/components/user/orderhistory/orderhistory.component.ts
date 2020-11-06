import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/model/OrderModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import { OrderService } from 'src/app/services/orderservice.service';

@Component({
    selector: 'orderhistory',
    templateUrl: 'orderhistory.component.html'
})
export class OrderHistoryComponent implements OnInit {
    public orders: OrderModel[];
    public isLoading: boolean = true;
    constructor(public orderService: OrderService, private authService: AuthenticationService) {}
    ngOnInit() {
        this.orderService.getOrderHistoryByUserId(this.authService.userId).subscribe((orders: OrderModel[]) => {
            this.orders = orders;
            console.log(JSON.stringify(this.orders))
            this.orderService.orders = this.orders.slice();
            this.isLoading = false;
        })
    }
}