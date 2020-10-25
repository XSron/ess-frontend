export enum CreditCardType {
  master,
  visa
}

export interface CreditCardModel {
  id: number;
  name: string;
  number: string;
  cvv: number;
  expiredDate: string;
  type: CreditCardType;
  isDefault: boolean;
}
