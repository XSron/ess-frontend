import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'manage-address',
    templateUrl: 'manage-address.component.html'
})
export class ManageAddressComponent implements OnInit {
    public isAdd: boolean = false;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.isAdd = this.route.snapshot.fragment === 'new'? true: false;
    }
}