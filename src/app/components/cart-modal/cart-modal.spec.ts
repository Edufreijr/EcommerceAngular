import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartModal } from './cart-modal';

import { CartService } from '../../services/cart.service';
import { MatDialogRef } from '@angular/material/dialog';

describe('CartModal', () => {
  let component: CartModal;
  let fixture: ComponentFixture<CartModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CartModal
      ],
      providers: [
        CartService,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartModal);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
