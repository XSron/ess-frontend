export class ProductModel {
  constructor(
    public productId: number,
    public name: string,
    public description: string,
    public price: number,
    public url: string,
    public qty: number,
    public vendor: string,
    public category: string
  ) {}
}
