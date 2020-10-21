import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authservice.service';
@Component({
    selector: 'vendor',
    templateUrl: 'vendor.component.html'
})
export class VendorComponent implements OnInit {
    constructor(private authService: AuthenticationService) {}
    ngOnInit() {
    }
}