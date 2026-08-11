import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, Header],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);

  protected readonly product = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    return this.productService.getProductById(id);
  });

  protected addToCart(): void {
    const product = this.product();

    if (product) {
      this.cartService.addToCart(product);
    }
  }

  protected goBack(): void {
    this.location.back();
  }
}
