import { Injectable, computed, signal } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Payment } from '../interfaces/payment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly customer = signal<Customer | null>(null);

  readonly payment = signal<Payment | null>(null);

  readonly products = signal<Product[]>([]);

  readonly subtotal = computed(() =>
    this.products().reduce((total, product) => total + product.price, 0)
  );

  readonly discount = computed(() => {
    const payment = this.payment();

    if (!payment) return 0;

    return payment.method === 'pix' ? this.subtotal() * 0.15 : 0;
  });

  readonly total = computed(() => this.subtotal() - this.discount());

  setProducts(products: Product[]): void {
    this.products.set(products);
  }

  setCustomer(customer: Customer): void {
    this.customer.set(customer);
  }

  setPayment(payment: Payment): void {
    this.payment.set(payment);
  }

  clear(): void {
    this.customer.set(null);
    this.payment.set(null);
    this.products.set([]);
  }
}
