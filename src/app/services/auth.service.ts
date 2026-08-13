import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'cliente' | 'admin';

export interface AuthUser {
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'edhardware-user';

  private readonly userSignal = signal<AuthUser | null>(this.loadUser());

  readonly user = this.userSignal.asReadonly();

  readonly isLoggedIn = computed(() => {
    return this.user() !== null;
  });

  readonly isAdmin = computed(() => {
    return this.user()?.role === 'admin';
  });

  readonly isClient = computed(() => {
    return this.user()?.role === 'cliente';
  });

  login(email: string, password: string, role: UserRole): boolean {
    const normalizedEmail = email.toLowerCase().trim();

    if (
      role === 'admin' &&
      normalizedEmail === 'admin@email.com' &&
      password === '1234'
    ) {
      const user: AuthUser = {
        email: normalizedEmail,
        role: 'admin',
      };

      this.saveUser(user);

      return true;
    }

    if (role === 'cliente') {
      const savedCustomer = localStorage.getItem('edhardware-customer');

      if (!savedCustomer) {
        return false;
      }

      const customer = JSON.parse(savedCustomer);

      if (
        customer.email.toLowerCase().trim() === normalizedEmail &&
        customer.password === password
      ) {
        const user: AuthUser = {
          email: customer.email,
          role: 'cliente',
        };

        this.saveUser(user);

        return true;
      }
    }

    return false;
  }

  logout(): void {
    this.userSignal.set(null);

    localStorage.removeItem(this.storageKey);
  }

  private saveUser(user: AuthUser): void {
    this.userSignal.set(user);

    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  private loadUser(): AuthUser | null {
    const savedUser = localStorage.getItem(this.storageKey);

    if (!savedUser) {
      return null;
    }

    try {
      const user = JSON.parse(savedUser);

      return user as AuthUser;
    } catch {
      localStorage.removeItem(this.storageKey);

      return null;
    }
  }
}
