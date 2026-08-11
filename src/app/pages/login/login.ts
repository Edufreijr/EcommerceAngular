import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  email = '';
  password = '';

  role: 'cliente' | 'admin' = 'cliente';

  errorMessage = '';

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha o e-mail e a senha.';

      return;
    }

    const success = this.authService.login(this.email, this.password, this.role);

    if (!success) {
      this.errorMessage = 'Usuário ou senha inválidos.';

      return;
    }

    if (this.role === 'admin') {
      this.router.navigate(['/admin']);

      return;
    }

    this.router.navigate(['/']);
  }

  goToRegister(): void {
    this.router.navigate(['/cadastro']);
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
