import {AddressModel} from './AddressModel';
import {CreditCardModel} from './CreditCardModel';

export class CheckoutModel {

  shippingAddress: AddressModel;
  billingAddress: AddressModel;
  creditCard: CreditCardModel;

  constructor(args: {
    shippingAddress: AddressModel,
    billingAddress: AddressModel,
    creditCard: CreditCardModel,
  }) {
    this.shippingAddress = args.shippingAddress;
    this.billingAddress = args.billingAddress;
    this.creditCard = args.creditCard;
  }

}
