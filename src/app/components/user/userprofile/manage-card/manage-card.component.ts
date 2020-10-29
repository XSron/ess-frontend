import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'manage-card',
    templateUrl: 'manage-card.component.html'
})
export class ManageCardComponent implements OnInit {
    public isAdd: boolean = false;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.isAdd = this.route.snapshot.fragment === 'new'? true: false;
    }
}