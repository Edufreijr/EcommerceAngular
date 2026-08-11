import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private readonly router = inject(Router);

  readonly productService = inject(ProductService);

  readonly products = this.productService.products;

  readonly visibleProducts = this.productService.visibleProducts;

  readonly totalProducts = computed(() => this.products().length);

  readonly totalStock = computed(() =>
    this.products().reduce((total, product) => total + product.stock, 0)
  );

  readonly unavailableProducts = computed(
    () => this.products().filter((product) => product.stock <= 0).length
  );

  readonly visibleProductsCount = computed(() => this.visibleProducts().length);

  backToHome(): void {
    this.router.navigate(['/']);
  }

  addProduct(): void {
    this.router.navigate(['/admin/produto']);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/admin/produto', productId]);
  }

  toggleVisibility(productId: number): void {
    this.productService.toggleVisibility(productId);
  }

  removeProduct(productId: number): void {
    const confirmed = window.confirm('Tem certeza que deseja remover este produto?');

    if (!confirmed) {
      return;
    }

    this.productService.removeProduct(productId);
  }
}
