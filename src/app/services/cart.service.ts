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
  private readonly storageKey = 'edhardware-cart';

  private readonly cartItemsSignal = signal<CartItem[]>(
    this.loadCart()
  );

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly cartCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  readonly cartTotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem(this.storageKey);

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(items)
    );
  }

  addToCart(product: Product): void {
    if (product.stock <= 0) {
      return;
    }

    this.cartItemsSignal.update((items) => {
      const existing = items.find(
        (item) => item.product.id === product.id
      );

      let updatedItems: CartItem[];

      if (existing) {
        if (existing.quantity >= product.stock) {
          return items;
        }

        updatedItems = items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                product,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        updatedItems = [
          ...items,
          {
            product,
            quantity: 1,
          },
        ];
      }

      this.saveCart(updatedItems);

      return updatedItems;
    });
  }

  increaseQuantity(productId: number): void {
    this.cartItemsSignal.update((items) => {
      const updatedItems = items.map((item) => {
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
      });

      this.saveCart(updatedItems);

      return updatedItems;
    });
  }

  decreaseQuantity(productId: number): void {
    this.cartItemsSignal.update((items) => {
      const updatedItems = items
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      this.saveCart(updatedItems);

      return updatedItems;
    });
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.update((items) => {
      const updatedItems = items.filter(
        (item) => item.product.id !== productId
      );

      this.saveCart(updatedItems);

      return updatedItems;
    });
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
    localStorage.removeItem(this.storageKey);
  }
}
