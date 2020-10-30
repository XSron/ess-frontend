import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CreditCardModel } from '../model/CreditCardModel';
import { Endpoint } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient: HttpClient) { }

  // MARK: - Credit Card Services

  getCreditCard(): any {
    return this.httpClient.get<CreditCardModel[]>(Endpoint.Payment.Card);
  }

  addCreditCard(body): any {
    return this.httpClient.post(Endpoint.Payment.Card, body);
  }

  deleteCreditCard(id): any {
    return this.httpClient.delete(Endpoint.Payment.Card + `\${id}`);
  }

}
