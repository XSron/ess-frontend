import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'historydetail',
  templateUrl: 'historydetail.component.html'
})
export class HistoryDetailComponent {

  constructor(private location: Location) {}

  public goBack():void {
    this.location.back();
  }

}
