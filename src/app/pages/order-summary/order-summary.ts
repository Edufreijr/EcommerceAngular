import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

import { Header } from '../../components/header/header';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, Header],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  readonly cartService = inject(CartService);

  readonly customerService = inject(CustomerService);

  readonly productService = inject(ProductService);

  readonly paymentService = inject(PaymentService);

  readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  readonly customer = this.customerService.customer;

  readonly products = computed(() => {
    return this.cartService.cartItems();
  });

  readonly paymentMethod = computed(() => {
    return this.paymentService.paymentMethod();
  });

  readonly subtotal = computed(() => {
    return this.cartService.cartTotal();
  });

  readonly discount = computed(() => {
    return this.paymentService.getDiscount(this.subtotal());
  });

  readonly total = computed(() => {
    return this.subtotal() - this.discount();
  });

  errorMessage = '';

  finishOrder(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/cadastro']);

      return;
    }

    const cartItems = this.cartService.cartItems();

    if (cartItems.length === 0) {
      this.router.navigate(['/']);

      return;
    }

    const productsToUpdate = [];

    for (const item of cartItems) {
      const product = this.productService.getProductById(item.product.id);

      if (!product) {
        this.errorMessage = `O produto "${item.product.name}" não está mais disponível.`;

        return;
      }

      if (item.quantity > product.stock) {
        this.errorMessage = `O estoque de "${product.name}" não é suficiente para finalizar a compra.`;

        return;
      }

      productsToUpdate.push({
        product,

        quantity: item.quantity,
      });
    }

    for (const item of productsToUpdate) {
      this.productService.updateStock(
        item.product.id,

        item.product.stock - item.quantity
      );
    }

    this.errorMessage = '';

    this.cartService.clearCart();

    this.router.navigate(['/sucesso']);
  }

  backToPayment(): void {
    this.router.navigate(['/pagamento']);
  }
}
