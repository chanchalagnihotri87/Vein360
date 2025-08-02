import Product from './product.model';

export class UserProduct extends Product {
  constructor(
    id: number,
    name: string,
    type: number,
    description?: string,
    price?: number,
    imageUrl?: string,
    image?: string,
    public searchRank = 1
  ) {
    super(id, name, type, description, price, imageUrl, image);
  }
}
