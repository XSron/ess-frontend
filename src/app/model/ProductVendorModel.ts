export class ProductVendorModel {

  public id?: number;
  public name: string;
  public description: string;
  public unitPrice: number;
  public imageUrl?: string;
  public unitsInStock: number;
  public vendorId?: number;
  public vendor?: string;
  public categoryId?: number;
  public active?: boolean;

  constructor(args: {
    id?: number,
    name: string,
    description: string,
    unitPrice: number,
    imageUrl?: string,
    unitsInStock: number,
    vendorId?: number,
    vendor?: string,
    categoryId?: number,
    active?: boolean
  }) {
    this.name = args.name;
    this.description = args.description;
    this.unitPrice = args.unitPrice;
    this.unitsInStock = args.unitsInStock;
    this.categoryId = args.categoryId;
    this.active = args.active;
    if (args.id) {
      // existing product
      this.id = args.id;
      this.imageUrl = args.imageUrl;
      this.vendorId = args.vendorId;
      this.vendor = args.vendor;
      this.categoryId = args.categoryId;
      this.active = args.active;
    }
  }

}
