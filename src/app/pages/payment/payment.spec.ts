import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Payment } from './payment';

import { CartService } from '../../services/cart.service';
import { CustomerService } from '../../services/customer.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

describe('Payment', () => {
  let component: Payment;
  let fixture: ComponentFixture<Payment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Payment
      ],
      providers: [
        provideRouter([]),
        CartService,
        CustomerService,
        PaymentService,
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Payment);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});