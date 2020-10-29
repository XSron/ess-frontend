import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/fixed-blocks/header/header.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { AuthenticationComponent } from './components/authenticate/authentication.component';
import { ProductListComponent } from './components/home/productlist/productlist.component';
import { NotFoundComponent } from './components/fixed-blocks/notfound/notfound.component';
import { ProductItemGridComponent } from './components/home/product-item-grid/product-item-grid.component';
import { CartComponent } from './components/shopping/cart/cart.component';
import { ProductDetailComponent } from './components/home/productdetail/productdetail.component';
import { CheckoutComponent } from './components/shopping/checkout/checkout.component';
import { CreditCardComponent } from './components/payment/credit-card/credit-card.component';
import { CheckoutFormComponent } from './components/shopping/checkoutform/checkoutform.component';
import { AddressComponent } from './components/payment/address/address.component';
import { UserProfileComponent } from './components/user/userprofile/userprofile.component';
import { ProductItemListComponent } from './components/home/product-item-list/product-item-list.component';
import { ReportComponent } from './components/vendor/report/report.component';
import { OrderHistoryComponent } from './components/payment/order-history/order-history.component';
import { ReceiptComponent } from './components/payment/receipt/receipt.component';

import { AuthenticationService } from './services/authservice.service';
import { InterceptorService } from './interceptors/interceptor.service';
import { ProductService } from './services/productservice.service';
import { CartService } from './services/cartservice.service';
import { MenuService } from './services/menuservice.service';
import { VendorProductComponent } from './components/vendor/vendor-product/vendor-product.component';
import { FooterComponent } from './components/fixed-blocks/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApproveRejectProductComponent } from './components/admin/approve-reject-product/approve-reject-product.component';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'mycart', component: CartComponent },
  { path: 'checkoutform', component: CheckoutFormComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'manageuser', component: ManageUserComponent},
    { path: 'approverejectproduct', component: ApproveRejectProductComponent}
  ]},
  { path: 'vendor', component: VendorComponent, children: [
    { path: 'product', component: VendorProductComponent}, 
    { path: 'report', component: ReportComponent }
  ]},
  { path: 'client', component: ClientComponent, children: [
    { path: 'report', component: ReportComponent }
  ]},
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
    ProductItemGridComponent,
    ProductListComponent,
    CartComponent,
    ProductDetailComponent,
    CheckoutComponent,
    AddressComponent,
    CreditCardComponent,
    CheckoutFormComponent,
    ProductItemListComponent,
    ReportComponent,
    VendorProductComponent,
    OrderHistoryComponent,
    ReceiptComponent,
    FooterComponent,
    AdminComponent,
    ApproveRejectProductComponent,
    ManageUserComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    ProductService,
    CartService,
    MenuService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
