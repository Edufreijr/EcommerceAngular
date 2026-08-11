import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../interfaces/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItemsSignal = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly cartCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  readonly cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    if (product.stock <= 0) {
      return;
    }

    this.cartItemsSignal.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          return items;
        }

        return items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                product: product,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...items,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  increaseQuantity(productId: number): void {
    this.cartItemsSignal.update((items) =>
      items.map((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        const currentStock = item.product.stock;

        if (currentStock <= 0) {
          return item;
        }

        if (item.quantity >= currentStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  decreaseQuantity(productId: number): void {
    this.cartItemsSignal.update((items) =>
      items
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}
