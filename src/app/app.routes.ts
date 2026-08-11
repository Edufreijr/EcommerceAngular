import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { ProductDetails } from './pages/product-details/product-details';
import { Register } from './pages/register/register';
import { Payment } from './pages/payment/payment';
import { OrderSummary } from './pages/order-summary/order-summary';
import { Success } from './pages/success/success';
import { Admin } from './pages/admin/admin';
import { AdminProduct } from './pages/admin-product/admin-product';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },

  {
    path: 'produto/:id',
    component: ProductDetails,
  },

  {
    path: 'cadastro',
    component: Register,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'pagamento',
    component: Payment,
    canActivate: [authGuard],
  },

  {
    path: 'resumo',
    component: OrderSummary,
    canActivate: [authGuard],
  },

  {
    path: 'sucesso',
    component: Success,
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/produto',
    component: AdminProduct,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/produto/:id',
    component: AdminProduct,
    canActivate: [adminGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
