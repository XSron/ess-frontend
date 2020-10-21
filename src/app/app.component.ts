import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModel } from './model/AuthModel';
import { AuthenticationService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  public auth: AuthModel
  constructor(private authService: AuthenticationService) {}
  ngOnInit() {
    //Implement Remember me
    this.authService.broadcastUserFromLocalStorage();
    this.subscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
      this.auth = auth;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
