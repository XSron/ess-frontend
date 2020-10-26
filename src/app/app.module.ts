import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CheckoutFormComponent } from './components/checkoutform/checkoutform.component';
import { AddressComponent } from './components/address/address.component';
import { OrderHistoryComponent } from './components/orderhistory/orderhistory.component';
import { UserProfileComponent } from './components/user/userprofile/userprofile.component';

import { AuthenticationService } from './services/authservice.service';
import { InterceptorService } from './interceptors/interceptor.service';
import { ProductService } from './services/productservice.service';
import { CartService } from './services/cartservice.service';
import { MenuService } from './services/menuservice.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'mycart', component: CartComponent },
  { path: 'checkoutform', component: CheckoutFormComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'user/userprofile/:id', component: UserProfileComponent }, 
  { path: 'user/orderhistory/:id', component: OrderHistoryComponent },
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
    AddressComponent,
    CreditCardComponent,
    CheckoutFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, ProductService, CartService, MenuService, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
