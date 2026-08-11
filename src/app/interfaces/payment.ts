export interface Payment {
  method: 'pix' | 'credit-card' | 'boleto';

  installments?: number;

  discount: number;

  total: number;
}
