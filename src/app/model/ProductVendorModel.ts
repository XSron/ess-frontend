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
  public category?: {
    categoryName?: string,
    id?: number,
  };

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
    active?: boolean,
    category?: {
      categoryName?: string,
      id?: number,
    },
  }) {
    if (args.id) {
      this.id = args.id;
    }
    this.name = args.name;
    this.description = args.description;
    this.unitPrice = args.unitPrice;
    this.unitsInStock = args.unitsInStock;
    this.categoryId = args.categoryId;
    this.active = args.active;
    this.vendorId = args.vendorId;
    this.imageUrl = args.imageUrl;
  }

}
