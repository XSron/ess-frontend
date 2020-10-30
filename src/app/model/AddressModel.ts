export class AddressModel {

  id: number;
  firstName: string;
  lastName: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  isDefault: boolean;

  constructor(args: {
    firstName: string,
    lastName: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
  }) {
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.street1 = args.street1;
    this.street2 = args.street2;
    this.city = args.city;
    this.state = args.state;
    this.zipCode = args.zipCode;
    this.country = args.country;
  }

}
