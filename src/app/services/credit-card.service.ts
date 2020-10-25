import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CreditCardModel, CreditCardType } from '../model/CreditCardModel';
import { AppConfig } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private REST_API_SERVER_MASTER = AppConfig.REST_API_SERVER + '/master-cards';
  private REST_API_SERVER_VISA = AppConfig.REST_API_SERVER + '/visa-cards';

  constructor(private httpClient: HttpClient) { }

  // MARK: - Credit Card Services

  getCreditCardList(type: CreditCardType): any {
    let endPoint: string;
    if (type === CreditCardType.master) {
      endPoint = this.REST_API_SERVER_MASTER;
    } else if (type === CreditCardType.visa) {
      endPoint = this.REST_API_SERVER_VISA;
    }
    return this.httpClient.get<CreditCardModel[]>(endPoint);
  }

  addCreditCard(type: CreditCardType, body): any {
    let endPoint: string;
    if (type === CreditCardType.master) {
      endPoint = this.REST_API_SERVER_MASTER;
    } else if (type === CreditCardType.visa) {
      endPoint = this.REST_API_SERVER_VISA;
    }
    return this.httpClient.post(endPoint, body);
  }

  deleteCreditCard(type: CreditCardType, id): any {
    let endPoint: string;
    if (type === CreditCardType.master) {
      endPoint = this.REST_API_SERVER_MASTER + `\${id}`;
    } else if (type === CreditCardType.visa) {
      endPoint = this.REST_API_SERVER_VISA + `\${id}`;
    }
    return this.httpClient.delete(endPoint);
  }

}
