import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { OrderModel } from '../model/OrderModel';

@Injectable()
export class OrderService {
    public orders: OrderModel[]
    constructor(private http: HttpClient) {}
    public placeAnOrder(body: any): Observable<any> {
        return this.http.post(Endpoint.ORDER_ENDPOINT.PLACE_ORDER_ENDPOINT, body)
    }
    public getOrderHistoryByUserId(userId: number): Observable<OrderModel[]> {
        return this.http.get<OrderModel[]>(Endpoint.ORDER_ENDPOINT.VIEW_ORDER_HISTORY_ENDPOINT + `/${userId}`)
    }
    public getOrderById(orderId: number): OrderModel {
        if(!this.orders) return null;
        return this.orders.filter((order: OrderModel) => order.id === +orderId)[0];
    }
    public calculateTotal(order: OrderModel): string {
        let total = 0;
        order.products.forEach((data) => {
            total += data.price * data.quantity;
        })
        return `$ ${total}`;
    }
}