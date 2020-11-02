import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from 'src/app/services/orderservice.service';
import { OrderModel } from 'src/app/model/OrderModel';

@Component({
  selector: 'historydetail',
  templateUrl: 'historydetail.component.html'
})

export class HistoryDetailComponent implements OnInit {

  public order: OrderModel;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.order = this.orderService.getOrderById(data.id);
    });
  }

  public goBack(): void {
    this.location.back();
  }

}
