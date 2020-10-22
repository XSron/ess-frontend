export interface CreditCardModel {
  id: number;
  name: string;
  number: string;
  cvv: number;
  expiredDate: string;
  type: string;
  limit: number;
  isDefault: boolean;
}
