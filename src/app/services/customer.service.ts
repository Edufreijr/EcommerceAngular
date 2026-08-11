import { Injectable, signal } from '@angular/core';

import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly storageKey = 'edhardware-customer';

  private readonly customerSignal = signal<Customer | null>(this.loadCustomer());

  readonly customer = this.customerSignal.asReadonly();

  saveCustomer(customer: Customer): void {
    this.customerSignal.set(customer);

    localStorage.setItem(this.storageKey, JSON.stringify(customer));
  }

  findByEmail(email: string): Customer | null {
    const customer = this.customer();

    if (!customer) {
      return null;
    }

    return customer.email.toLowerCase().trim() === email.toLowerCase().trim() ? customer : null;
  }

  validateLogin(email: string, password: string): Customer | null {
    const customer = this.findByEmail(email);

    if (!customer) {
      return null;
    }

    if (customer.password !== password) {
      return null;
    }

    return customer;
  }

  hasCustomer(): boolean {
    // Cliente já possui cadastro completo
    if (this.customer()) {
      return true;
    }

    // Verifica se existe usuário autenticado
    const loggedUser = localStorage.getItem('edhardware-user');

    if (!loggedUser) {
      return false;
    }

    try {
      const user = JSON.parse(loggedUser);

      // Se for cliente logado, considera autenticado
      return user.role === 'cliente';
    } catch {
      return false;
    }
  }

  clearCustomer(): void {
    this.customerSignal.set(null);

    localStorage.removeItem(this.storageKey);
  }

  private loadCustomer(): Customer | null {
    const savedCustomer = localStorage.getItem(this.storageKey);

    if (!savedCustomer) {
      return null;
    }

    try {
      return JSON.parse(savedCustomer) as Customer;
    } catch {
      localStorage.removeItem(this.storageKey);

      return null;
    }
  }
}
