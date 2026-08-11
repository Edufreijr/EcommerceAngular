import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

import { Header } from '../../components/header/header';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, Header],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  private readonly router = inject(Router);

  private readonly customerService = inject(CustomerService);

  private readonly paymentService = inject(PaymentService);

  private readonly authService = inject(AuthService);

  readonly cartService = inject(CartService);

  readonly customer = this.customerService.customer;

  readonly paymentMethod = signal(this.paymentService.paymentMethod());

  readonly subtotal = computed(() => {
    return this.cartService.cartTotal();
  });

  readonly discount = computed(() => {
    return this.paymentService.getDiscount(this.subtotal());
  });

  readonly finalTotal = computed(() => {
    return this.subtotal() - this.discount();
  });

  changePaymentMethod(method: string): void {
    this.paymentMethod.set(method);

    this.paymentService.setPaymentMethod(method);
  }

  continueToSummary(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/cadastro']);

      return;
    }

    if (this.cartService.cartItems().length === 0) {
      this.router.navigate(['/']);

      return;
    }

    this.router.navigate(['/resumo']);
  }

  backToRegister(): void {
    this.router.navigate(['/cadastro']);
  }
}
