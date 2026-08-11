import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { productsData } from '../../data/products.data';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './search-modal.html',
  styleUrl: './search-modal.css',
})
export class SearchModal {
  readonly searchService = inject(SearchService);

  private readonly dialogRef = inject(MatDialogRef<SearchModal>);

  private readonly router = inject(Router);

  readonly products = computed(() => {
    const text = this.searchService.search().toLowerCase().trim();

    if (!text) {
      return [];
    }

    return productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(text) || product.category.toLowerCase().includes(text)
    );
  });

  openProduct(productId: number): void {
    this.dialogRef.close();

    this.router.navigate(['/produto', productId]);
  }

  close(): void {
    this.dialogRef.close();
  }
}
