import Product from '../../home/shared/product.model';
import Clinic from './clinic.model';
import { OrderStatus } from './order-status';

export class Order {
  public expanded: boolean = false;
  constructor(
    public id: number,
    public product: Product,
    public clinic: Clinic,
    public price: number,
    public paid: boolean,
    public status: OrderStatus,
    public quantity: number,
    public createdDate: Date = new Date()
  ) {}
}
