import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../interfaces/product';
import { productsData } from '../data/products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly storageKey = 'edhardware-products';

  private readonly productsSignal = signal<Product[]>(this.loadProducts());

  readonly products = this.productsSignal.asReadonly();

  readonly visibleProducts = computed(() =>
    this.products().filter((product) => product.visible !== false)
  );

  private loadProducts(): Product[] {
    const savedProducts = localStorage.getItem(this.storageKey);

    if (!savedProducts) {
      return [...productsData];
    }

    try {
      return JSON.parse(savedProducts) as Product[];
    } catch {
      return [...productsData];
    }
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  addProduct(product: Product): void {
    this.productsSignal.update((products) => {
      const updatedProducts = [...products, product];

      this.saveProducts(updatedProducts);

      return updatedProducts;
    });
  }

  updateProduct(updatedProduct: Product): void {
    this.productsSignal.update((products) => {
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      this.saveProducts(updatedProducts);

      return updatedProducts;
    });
  }

  removeProduct(productId: number): void {
    this.productsSignal.update((products) => {
      const updatedProducts = products.filter((product) => product.id !== productId);

      this.saveProducts(updatedProducts);

      return updatedProducts;
    });
  }

  toggleVisibility(productId: number): void {
    this.productsSignal.update((products) => {
      const updatedProducts = products.map((product) =>
        product.id === productId
          ? {
              ...product,
              visible: product.visible === false,
            }
          : product
      );

      this.saveProducts(updatedProducts);

      return updatedProducts;
    });
  }

  updateStock(productId: number, stock: number): void {
    this.productsSignal.update((products) => {
      const updatedProducts = products.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: Math.max(0, stock),
            }
          : product
      );

      this.saveProducts(updatedProducts);

      return updatedProducts;
    });
  }

  getProductById(productId: number): Product | undefined {
    return this.products().find((product) => product.id === productId);
  }
}
