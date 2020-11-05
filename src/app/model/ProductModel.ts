export class ProductModel {

  public id?: number;
  public name: string;
  public description: string;
  public unitPrice: number;
  public imageUrl?: string;
  public unitsInStock: number;
  public vendorId?: number;
  public vendor?: string;
  public category?: {
    categoryName?: string,
    id?: number,
  };
  public availableQty?: number[];
<<<<<<< Updated upstream
  public active: boolean;
=======
>>>>>>> Stashed changes

  constructor(args: {
    id?: number,
    name: string,
    description: string,
    unitPrice: number,
    imageUrl?: string,
    unitsInStock: number,
    vendorId?: number,
    vendor?: string,
    category?: {
      categoryName?: string,
      id?: number,
<<<<<<< Updated upstream
    },
    availableQty?: number[],
    active?: boolean,
=======
    }, 
    availableQty?: number[]
>>>>>>> Stashed changes
  }) {
    this.name = args.name;
    this.description = args.description;
    this.unitPrice = args.unitPrice;
    this.unitsInStock = args.unitsInStock;
    this.availableQty = args.availableQty;
<<<<<<< Updated upstream
    this.active = args.active;
=======
>>>>>>> Stashed changes
    if (args.id) {
      // existing product
      this.id = args.id;
      this.imageUrl = args.imageUrl;
      this.vendorId = args.vendorId;
      this.vendor = args.vendor;
      this.category = args.category;
      this.active = args.active;
    }
  }

}
