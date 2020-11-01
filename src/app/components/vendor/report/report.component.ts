import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/model/AuthModel';
import { AuthenticationService } from 'src/app/services/authservice.service';
import jwt_decode from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../../../common/endpoint';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { stringify } from 'querystring';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'report',
    templateUrl: 'report.component.html'
})
export class ReportComponent implements OnInit {
  public auth: AuthModel;
  public roles: string[] = null;
  public userid: number;
  private userSubscription: Subscription;
  public displayProduct: boolean = false;
  public displayDollarvalue: boolean = false;

  reportName: string;

  constructor(public authService: AuthenticationService, private http: HttpClient, private activeRoute: ActivatedRoute) {

    this.userSubscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
      this.auth = auth;

      //decode access token
      if(this.auth) {
        let afterDecoded: string = jwt_decode(auth.access_token);
        this.userid = afterDecoded['user_id'];

        console.log(this.userid);

        return this.roles = afterDecoded['authorities'];
      }
      this.roles = null; //reset roles in case the user logout
    });

    if(this.hasRole('ROLE_ADMIN')) {
      this.userid = 0;
      this.reportName = 'Admin Report';
    }
    else if(this.hasRole('ROLE_CLIENT')) {
      this.userid = 0;
      this.reportName = 'Client Report';
    }
    else {
      this.reportName = 'Vendor Report';
    }

    this.activeRoute.params.subscribe(params => {
      console.log(params['par']);

      if(params['par'] === 'reportproduct') {
        this.http.get(Endpoint.REPORT_ENDPOINT.REPORT_PRODUCT + '/' + this.userid)
        .subscribe((result) => {
            console.log(result);

            this.displayProduct = true;
            this.displayDollarvalue = false;
        });
      }
      else {
        this.http.get(Endpoint.REPORT_ENDPOINT.REPORT_DOLLAR_VALUE + '/' + this.userid)
        .subscribe((result) => {
          console.log(result);

          this.displayDollarvalue = true;
          this.displayProduct = false;
        });
      }
    });
  }

  ngOnInit(): void {


  }

  public hasRole(...roles: string[]): boolean {
    if(this.roles === null) return false;
    return this.roles.findIndex((r: string) => {
      return roles.findIndex((rl: string) => {
        return rl.toUpperCase() === r.toUpperCase()
      }) > - 1
    }) > -1;
  }

}
