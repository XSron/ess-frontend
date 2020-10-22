import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { AuthenticationComponent } from './components/authenticate/authentication.component';
import { ProductListComponent } from './components/home/productlist/productlist.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { CatalogComponent } from './components/home/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/home/productdetail/productdetail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DeliveryAddressComponent } from './components/delivery-address/delivery-address.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

import { AuthenticationService } from './services/authservice.service';
import { InterceptorService } from './interceptors/interceptor.service';
import { ProductService } from './services/productservice.service';
import { CartService } from './services/cartservice.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'mycart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    VendorComponent,
    AuthenticationComponent,
    NotFoundComponent,
    CatalogComponent,
    ProductListComponent,
    CartComponent,
    ProductDetailComponent,
    CheckoutComponent,
    DeliveryAddressComponent,
    CreditCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, ProductService, CartService, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
