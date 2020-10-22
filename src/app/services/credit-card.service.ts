import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CreditCardModel } from '../model/CreditCardModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  // MARK: - Credit Card Services

  getCreditCardList(): any {
    return this.httpClient.get<CreditCardModel[]>(this.REST_API_SERVER + '/cards');
  }

  addCreditCard(body): any {
    return this.httpClient.post(this.REST_API_SERVER + '/cards', body);
  }

  deleteCreditCard(id): any {
    return this.httpClient.delete(this.REST_API_SERVER + '/cards/' + id);
  }

}
