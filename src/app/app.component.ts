import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModel } from './model/AuthModel';
import { AuthenticationService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public auth: AuthModel;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.broadcastUserFromLocalStorage();
    this.subscription = this.authService.userSubject.subscribe((auth: AuthModel) => {
      this.auth = auth;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
