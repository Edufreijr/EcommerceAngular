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

    return customer.email.toLowerCase().trim() === email.toLowerCase().trim()
      ? customer
      : null;
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
    if (this.customer()) {
      return true;
    }

    const loggedUser = localStorage.getItem('edhardware-user');

    if (!loggedUser) {
      return false;
    }

    try {
      const user = JSON.parse(loggedUser);

      return user.role === 'cliente' || user.role === 'admin';
    } catch {
      return false;
    }
  }

  createAdminCustomer(): Customer {
    const adminCustomer: Customer = {
      id: 999,
      name: 'Administrador EdHardwareShop',
      cpf: '000.000.000-00',
      email: 'admin@email.com',
      password: '1234',
      phone: '(11) 99999-9999',
      cep: '01000-000',
      street: 'Avenida EdHardware',
      number: '1000',
      complement: 'Sala Administrativa',
      city: 'São Paulo',
      state: 'SP',
    };

    this.saveCustomer(adminCustomer);

    return adminCustomer;
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
