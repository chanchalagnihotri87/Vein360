export default class Product {
  constructor(
    public id: number,
    public name: string,
    public type: number,
    public description?: string,
    public price?: number,
    public imageUrl?: string,
    public image?: string
  ) {}
}
