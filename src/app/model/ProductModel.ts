export class ProductModel {
  constructor(
    public productId: number,
    public name: string,
    public description: string,
    public price: number,
    public url: string,
    public qty: number,
    public vendorId: number,
    public vendor: string,
    public categoryId: number,
    public category: string
  ) {}
}
