import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly paymentMethodSignal = signal('pix');

  readonly paymentMethod = this.paymentMethodSignal.asReadonly();

  setPaymentMethod(method: string): void {
    this.paymentMethodSignal.set(method);
  }

  hasPixDiscount(): boolean {
    return this.paymentMethod() === 'pix';
  }

  getDiscount(subtotal: number): number {
    return this.hasPixDiscount() ? subtotal * 0.15 : 0;
  }
}
