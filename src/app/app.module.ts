import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component'
import { HeaderComponent } from './components/header/header.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { AuthenticationComponent } from './components/authenticate/authentication.component';

import { AuthenticationService } from './services/authservice.service';
import { InterceptorService } from './interceptors/interceptor.service';
import { NotFoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    VendorComponent,
    AuthenticationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
