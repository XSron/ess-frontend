import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authservice.service';
import { AuthModel } from '../../model/AuthModel';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menuservice.service';
import { CartService } from 'src/app/services/cartservice.service';
import { ProductModel } from 'src/app/model/ProductModel';

@Component({
    selector: 'signin',
    templateUrl: 'authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    public isLogin: boolean = true;
    public isLoading: boolean = false;
    public error: string;
    @ViewChild('username') username: ElementRef;
    constructor(private authService: AuthenticationService, private menuService: MenuService, 
                private cartService: CartService, private router: Router) {}
    ngOnInit() {
        this.menuService.routingChangeSubject.next(true);
    }
    onSwitch() {
        this.isLogin = !this.isLogin;
    }
    onSubmit(form: NgForm) {
        const { username, password, roleId } = form.value;
        let authObs: Observable<AuthModel>;
        this.isLoading = true;
        if(this.isLogin) {
            authObs = this.authService.signIn(username, password);
        } else {
            authObs = this.authService.signUp(username, password, roleId)
        }
        authObs.subscribe((auth: AuthModel) => {
            this.isLoading = false;
            this.error = null;

            if(this.isLogin) {
                //storing user & token
                localStorage.setItem("auth", JSON.stringify(auth));
                this.authService.broadcastUserFromLocalStorage();
                
                //load cart from authenticated user
                this.cartService.loadCartFromUserAfterLoggedin().subscribe((products: ProductModel[]) => {
                    this.cartService.updateCartModelAndUI(products);
                    this.router.navigate(['/'])
                })
                return;
            }
            alert("Create User Succeed!");
            this.isLogin = true;
            form.resetForm(); this.username.nativeElement.focus();
        }, error => {
            this.error = JSON.stringify(error);
            this.isLoading = false;
        })
    }
    ngOnDestroy() {
        this.menuService.routingChangeSubject.next(false);
    }
}