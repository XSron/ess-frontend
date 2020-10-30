import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../common/app-config';
import { Endpoint } from '../common/endpoint';
import { CreditCardModel } from '../model/CreditCardModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  constructor(private httpClient: HttpClient) { }
  public cardVerification(cardNumber: string, name: string, expDate: string, pin: number): Observable<any> {
    return this.httpClient.post<CreditCardModel>(Endpoint.PAYMENT_ENDPOINT.CARD_VERIFICATION_ENDPOINT, {
      "cardNumber": cardNumber,
      "name": name,
      "expDate": expDate,
      "pin": pin,
    });
  }
  addCreditCard(body): any {
    return this.httpClient.post(Endpoint.PAYMENT_ENDPOINT.CARD_VERIFICATION_ENDPOINT, body);
  }
  deleteCreditCard(id): any {
    return this.httpClient.delete(Endpoint.PAYMENT_ENDPOINT.CARD_VERIFICATION_ENDPOINT + `\${id}`);
  }
}
