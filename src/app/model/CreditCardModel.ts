export class CreditCardModel {

  id: number;
  name: string;
  number: string;
  cvv: string;
  expiredDate: string;
  type: string;
  isDefault: boolean;

  constructor(args: {
    name: string,
    number: string,
    cvv: string,
    expiredDate: string,
  }) {
    this.name = args.name;
    this.number = args.number;
    this.cvv = args.cvv;
    this.expiredDate = args.expiredDate;
  }

}
