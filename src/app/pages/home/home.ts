import { Component, inject, signal, computed } from '@angular/core';

import { Product } from '../../interfaces/product';

import { CartService } from '../../services/cart.service';

import { ProductService } from '../../services/product.service';

import { ProductCard } from '../../components/product-card/product-card';

import { Header } from '../../components/header/header';

import { Banner } from '../../components/banner/banner';

import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Banner, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly cartService = inject(CartService);

  private readonly productService = inject(ProductService);

  protected readonly search = signal('');

  protected readonly products = this.productService.visibleProducts;

  protected readonly filteredProducts = computed(() => {
    const text = this.search().toLowerCase().trim();

    if (!text) {
      return this.products();
    }

    return this.products().filter(
      (product) =>
        product.name.toLowerCase().includes(text) || product.category.toLowerCase().includes(text)
    );
  });

  protected updateSearch(value: string): void {
    this.search.set(value);
  }

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
