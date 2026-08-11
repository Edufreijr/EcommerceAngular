import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';

import { Header } from '../../components/header/header';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly router = inject(Router);

  private readonly customerService = inject(CustomerService);

  private readonly authService = inject(AuthService);

  customer = {
    id: Date.now(),

    name: '',

    cpf: '',

    email: '',

    password: '',

    phone: '',

    cep: '',

    street: '',

    number: '',

    complement: '',

    city: '',

    state: '',
  };

  errorMessage = '';

  constructor() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pagamento']);
    }
  }

  continue(): void {
    const requiredFields = [
      this.customer.name,

      this.customer.cpf,

      this.customer.email,

      this.customer.password,

      this.customer.phone,

      this.customer.cep,

      this.customer.street,

      this.customer.number,

      this.customer.city,

      this.customer.state,
    ];

    const hasEmptyField = requiredFields.some((field) => !field || field.trim() === '');

    if (hasEmptyField) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';

      return;
    }

    if (!this.isValidEmail(this.customer.email)) {
      this.errorMessage = 'Digite um e-mail válido.';

      return;
    }

    this.errorMessage = '';

    this.customerService.saveCustomer(this.customer);

    this.router.navigate(['/pagamento']);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
