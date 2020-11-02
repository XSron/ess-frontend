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
import { CreditCardComponent } from './components/shopping/credit-card/credit-card.component';
import { CheckoutFormComponent } from './components/shopping/checkoutform/checkoutform.component';
import { AddressComponent } from './components/shopping/address/address.component';
import { UserProfileComponent } from './components/user/userprofile/userprofile.component';
import { ProductItemListComponent } from './components/home/product-item-list/product-item-list.component';
import { ReportComponent } from './components/vendor/report/report.component';
import { OrderHistoryComponent } from './components/user/orderhistory/orderhistory.component';
import { VendorProductComponent } from './components/vendor/vendor-product/vendor-product.component';
import { FooterComponent } from './components/fixed-blocks/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApproveRejectProductComponent } from './components/admin/approve-reject-product/approve-reject-product.component';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { ClientComponent } from './components/client/client.component';
import { UserComponent } from './components/user/user.component';
import { HistoryDetailComponent } from './components/user/orderhistory/historydetail/historydetail.component';
import { ReceiptComponent } from './components/user/orderhistory/receipt/receipt.component';

import { AuthenticationService } from './services/authservice.service';
import { InterceptorService } from './interceptors/interceptor.service';
import { ProductService } from './services/productservice.service';
import { CartService } from './services/cartservice.service';
import { MenuService } from './services/menuservice.service';
import { ManageAddressComponent } from './components/user/userprofile/manage-address/manage-address.component';
import { ManageCardComponent } from './components/user/userprofile/manage-card/manage-card.component';
import { UserService } from './services/userservice.service';
import { ManageUserService } from './services/manage-user.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'mycart', component: CartComponent },
  { path: 'checkoutform', component: CheckoutFormComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent, children: [
      { path: 'manageuser', component: ManageUserComponent},
      { path: 'product', component: ApproveRejectProductComponent},
      { path: 'report/:par', component: ReportComponent}
    ]},
  { path: 'vendor', component: VendorComponent, children: [
      { path: 'product', component: VendorProductComponent},
      { path: 'report/:par', component: ReportComponent }
    ]},
  { path: 'client', component: ClientComponent, children: [
      { path: 'report/:par', component: ReportComponent }
    ]},
  { path: 'user', component: UserComponent, children: [
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'orderhistory', component: OrderHistoryComponent },
      { path: 'historydetail/:id', component: HistoryDetailComponent },
      { path: 'receipt/:id', component: ReceiptComponent },
      { path: 'manage-address', component: ManageAddressComponent },
      { path: 'manage-card', component: ManageCardComponent }
    ]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

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
    ClientComponent,
    UserComponent,
    ManageAddressComponent,
    ManageCardComponent
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
    UserService,
    ManageUserService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
