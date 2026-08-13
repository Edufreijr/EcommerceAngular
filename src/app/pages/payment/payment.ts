import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

import { Header } from '../../components/header/header';

import { Customer } from '../../interfaces/customer';

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

  readonly authService = inject(AuthService);

  readonly cartService = inject(CartService);

  readonly user = this.authService.user;

  readonly customer = computed<Customer | null>(() => {
    const savedCustomer = this.customerService.customer();

    if (savedCustomer) {
      return savedCustomer;
    }

    if (this.authService.isAdmin()) {
      return {
        id: 0,
        name: 'Administrador da EdHardwareShop',
        cpf: '000.000.000-00',
        email: 'admin@email.com',
        password: '1234',
        phone: '(11) 99999-9999',
        cep: '01000-000',
        street: 'Rua EdHardware',
        number: '100',
        complement: 'Sala Administrativa',
        city: 'São Paulo',
        state: 'SP',
      };
    }

    return null;
  });

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
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin']);

      return;
    }

    this.router.navigate(['/cadastro']);
  }
}
