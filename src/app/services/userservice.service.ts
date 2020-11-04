import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { AddressModel } from '../model/AddressModel';
import { CreditCardModel } from '../model/CreditCardModel';
import { UserModel } from '../model/UserModel';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}
    public getUserByName(username: string): Observable<UserModel> {
        return this.http.get<UserModel>(Endpoint.USER_ENDPOINT.GET_USER_PROFILE_BY_NAME + `/${username}`);
    }
    public addUserAddress(username: string, address: AddressModel): Observable<any> {
        return this.http.post(Endpoint.USER_ENDPOINT.ADD_ADDRESS_TO_USER_ENDPOINT + `/${username}/addresses`, {
            houseNumber: address.street2,
            street: address.street1,
            city: address.city,
            state: address.state,
            zipcode: address.zipCode,
            country: address.country
        })
    }
    public removeUserAddress(username: string, addressId: number): Observable<any> {
        return this.http.delete(Endpoint.USER_ENDPOINT.REMOVE_ADDRESS_FROM_USER_ENDPOINT + `/${username}/addresses/${addressId}`)
    }
    public updateUserAddress(username: string, addressId: number, address: AddressModel): Observable<any> {
        return this.http.put(Endpoint.USER_ENDPOINT.UPDATE_ADDRESS_FOR_USER_ENDPOINT + `/${username}/addresses/${addressId}`, {
            houseNumber: address.street2,
            street: address.street1,
            city: address.city,
            state: address.state,
            zipcode: address.zipCode,
            country: address.country
        })
    }
    public setDefaultAddress(username: string, addressId: number): Observable<any> {
        return this.http.put(Endpoint.USER_ENDPOINT.SET_DEFAULT_ADDRESS + `/${username}/addresses/${addressId}/default`, {})
    }
    public addCardToUser(username: string, card: CreditCardModel): Observable<any> {
        return this.http.post(Endpoint.USER_ENDPOINT.ADD_CARD_TO_USER_ENDPOINT + `/${username}/cards`,{
            cardNumber: card.number,
            name: card.name,
            expiredDate: card.expiredDate,
            cvv: card.cvv
        })
    }
    public removeCardFromUser(username: string, cardNumber: string): Observable<any> {
        return this.http.request('delete', Endpoint.USER_ENDPOINT.REMOVE_CARD_FROM_USER_ENDPOINT + `/${username}/cards/${cardNumber}`)
    }
    public setDefaultCreditCard(username: string, cardNumber: string): Observable<any> {
        return this.http.put(Endpoint.USER_ENDPOINT.SET_DEFAULT_CREDIT_CARD + `/${username}/cards/default/${cardNumber}`, {});
    }
    public updateUserProfile(username: string, email: string, phone: string): Observable<any> {
        return this.http.put(Endpoint.USER_ENDPOINT.UPDATE_USER_PROFILE + `/${username}`, {
            email: email,
            phone: phone,
        })
    }
    // Add by Sovann
    public updateUserByAdmin(user: any): Observable<any> {
      return this.http.put(Endpoint.USER_ENDPOINT.UPDATE_USER_PROFILE + `/${user.username}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      });
    }
    public getDefaultAddressAndCard(username: string): Observable<any> {
        return this.http.get(Endpoint.USER_ENDPOINT.CHECK_DEFAULT_CARD_ADDRESS + `/${username}/default`);
    }
}
