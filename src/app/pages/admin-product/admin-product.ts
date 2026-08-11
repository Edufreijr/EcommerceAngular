import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-product.html',
  styleUrl: './admin-product.css',
})
export class AdminProduct {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  readonly isEditing = this.route.snapshot.paramMap.has('id');

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    stock: 0,
    visible: true,
  };

  imagePreview = '';

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);

    const existingProduct = this.productService.getProductById(id);

    if (!existingProduct) {
      this.router.navigate(['/admin']);
      return;
    }

    this.product = {
      ...existingProduct,
    };

    this.imagePreview = existingProduct.image;
  }

  saveProduct(): void {
    if (
      !this.product.name.trim() ||
      !this.product.description.trim() ||
      !this.product.category.trim() ||
      !this.product.image ||
      this.product.price <= 0
    ) {
      return;
    }

    if (this.isEditing) {
      this.productService.updateProduct({
        ...this.product,
      });
    } else {
      const products = this.productService.products();

      const nextId =
        products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;

      const newProduct: Product = {
        ...this.product,
        id: nextId,
      };

      this.productService.addProduct(newProduct);
    }

    this.router.navigate(['/admin']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.loadImage(input.files[0]);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    if (!event.dataTransfer?.files?.length) {
      return;
    }

    this.loadImage(event.dataTransfer.files[0]);
  }

  private loadImage(file: File): void {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== 'string') {
        return;
      }

      this.product.image = result;
      this.imagePreview = result;
    };

    reader.readAsDataURL(file);
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
