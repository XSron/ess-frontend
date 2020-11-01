export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public unitPrice: number,
    public imageUrl: string,
    public unitsInStock: number,
    public vendorId: number,
    public vendor: string,
    public categoryId: number,
    public category: string
  ) {}
}
