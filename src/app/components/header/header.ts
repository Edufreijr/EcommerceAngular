import { Component, inject, output } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';

import { CartModal } from '../cart-modal/cart-modal';

import { productsData } from '../../data/products.data';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',

  standalone: true,

  imports: [MatDialogModule, RouterLink, CurrencyPipe],

  templateUrl: './header.html',

  styleUrl: './header.css',
})
export class Header {
  readonly cartService = inject(CartService);

  readonly authService = inject(AuthService);

  readonly searchChange = output<string>();

  private readonly dialog = inject(MatDialog);

  private readonly router = inject(Router);

  searchText = '';

  get searchResults() {
    const text = this.searchText.toLowerCase().trim();

    if (!text) {
      return [];
    }

    return productsData

      .filter(
        (product) =>
          product.name.toLowerCase().includes(text) || product.category.toLowerCase().includes(text)
      )

      .slice(0, 6);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchText = input.value;

    this.searchChange.emit(input.value);
  }

  openProduct(id: number): void {
    this.searchText = '';

    this.searchChange.emit('');

    this.router.navigate(['/produto', id]);
  }

  clearSearch(): void {
    this.searchText = '';

    this.searchChange.emit('');
  }

  openCart(): void {
    const dialogRef = this.dialog.open(CartModal, {
      width: '500px',

      maxWidth: '95vw',

      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((finishPurchase) => {
      if (finishPurchase === true) {
        this.router.navigate(['/cadastro']);
      }
    });
  }

  openLogin(): void {
    this.router.navigate(['/login']);
  }

  goAdmin(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/']);
  }
}
