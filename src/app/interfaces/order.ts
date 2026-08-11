import { Customer } from './customer';
import { Payment } from './payment';
import { Product } from './product';

export interface Order {
  id: number;

  customer: Customer;

  products: Product[];

  payment: Payment;

  total: number;
}
