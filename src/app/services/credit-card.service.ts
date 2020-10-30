import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../common/app-config';
import { Endpoint } from '../common/endpoint';
import { CreditCardModel } from '../model/CreditCardModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private REST_API_SERVER_MASTER = AppConfig + '/master-cards';
  private REST_API_SERVER_VISA = AppConfig + '/visa-cards';
  constructor(private httpClient: HttpClient) { }

  // MARK: - Credit Card Services
  getCreditCard(): any {
    return this.httpClient.get<CreditCardModel[]>(Endpoint.PAYMENT_ENDPOINT.CARD_VERIFICATION_ENDPOINT);
  }
  addCreditCard(body): any {
    return this.httpClient.post(Endpoint.PAYMENT_ENDPOINT.CARD_VERIFICATION_ENDPOINT, body);
  }
  deleteCreditCard(id): any {
    return this.httpClient.delete(Endpoint.PAYMENT_ENDPOINT.CARD_VERIFICATION_ENDPOINT + `\${id}`);
  }
}
