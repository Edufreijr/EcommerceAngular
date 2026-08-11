import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  protected readonly cartService = inject(CartService);

  protected removeProduct(id: number): void {
    this.cartService.removeFromCart(id);
  }

  protected clearCart(): void {
    this.cartService.clearCart();
  }
}
