import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatDialogModule],
  templateUrl: './cart-modal.html',
  styleUrl: './cart-modal.css',
})
export class CartModal {
  readonly cartService = inject(CartService);

  readonly dialogRef = inject(MatDialogRef<CartModal>);

  close(): void {
    this.dialogRef.close();
  }

  finishPurchase(): void {
    this.dialogRef.close(true);
  }

  increase(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
