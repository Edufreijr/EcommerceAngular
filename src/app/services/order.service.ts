import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../interfaces/product';
import { Customer } from '../interfaces/customer';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: number;
  customer: Customer;
  items: OrderItem[];
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly storageKey = 'edhardware-orders';

  private readonly ordersSignal = signal<Order[]>(this.loadOrders());

  readonly orders = this.ordersSignal.asReadonly();

  readonly totalOrders = computed(() => this.orders().length);

  readonly totalProductsSold = computed(() =>
    this.orders().reduce(
      (total, order) =>
        total + order.items.reduce((itemsTotal, item) => itemsTotal + item.quantity, 0),
      0
    )
  );

  readonly totalRevenue = computed(() =>
    this.orders().reduce((total, order) => total + order.total, 0)
  );

  createOrder(
    customer: Customer,
    items: OrderItem[],
    paymentMethod: string,
    subtotal: number,
    discount: number,
    total: number
  ): Order {
    const orders = this.orders();

    const nextId = orders.length > 0 ? Math.max(...orders.map((order) => order.id)) + 1 : 1;

    const order: Order = {
      id: nextId,
      customer,
      items,
      paymentMethod,
      subtotal,
      discount,
      total,
      createdAt: new Date().toISOString(),
    };

    this.ordersSignal.update((currentOrders) => [...currentOrders, order]);

    this.saveOrders();

    return order;
  }

  getBestSellingProduct(): {
    product: Product;
    quantity: number;
  } | null {
    const quantities = new Map<
      number,
      {
        product: Product;
        quantity: number;
      }
    >();

    for (const order of this.orders()) {
      for (const item of order.items) {
        const existing = quantities.get(item.product.id);

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          quantities.set(item.product.id, {
            product: item.product,
            quantity: item.quantity,
          });
        }
      }
    }

    const products = Array.from(quantities.values());

    if (products.length === 0) {
      return null;
    }

    return products.reduce((best, current) => (current.quantity > best.quantity ? current : best));
  }

  clearOrders(): void {
    this.ordersSignal.set([]);
    localStorage.removeItem(this.storageKey);
  }

  private saveOrders(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.orders()));
  }

  private loadOrders(): Order[] {
    const savedOrders = localStorage.getItem(this.storageKey);

    if (!savedOrders) {
      return [];
    }

    try {
      return JSON.parse(savedOrders) as Order[];
    } catch {
      localStorage.removeItem(this.storageKey);

      return [];
    }
  }
}
