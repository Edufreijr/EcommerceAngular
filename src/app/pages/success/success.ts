import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Header } from '../../components/header/header';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [Header],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success {
  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}
