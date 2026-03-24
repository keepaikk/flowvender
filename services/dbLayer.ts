import { Product, Order } from '../types';
import { getFirebaseAdapter } from './firebaseAdapter';
import { getPostgresAdapter } from './postgresAdapter';

export interface DatabaseAdapter {
  getProducts(): Promise<Product[]>;
  getOrders(): Promise<Order[]>;
  saveOrder(order: Order): Promise<void>;
  searchProducts?(query: string): Promise<Product[]>;
  getFlashDeals?(): Promise<Product[]>;
  getMadeInGhana?(): Promise<Product[]>;
  getWishlistProducts?(): Promise<Product[]>;
  isInWishlist?(productId: string): Promise<boolean>;
  toggleWishlist?(productId: string): boolean;
}

export type DatabaseType = 'firebase' | 'postgres';

export const getActiveDatabaseType = (): DatabaseType => {
  const saved = localStorage.getItem('flow_active_db');
  if (saved === 'firebase' || saved === 'postgres') return saved;
  return 'firebase';
};

export const setActiveDatabaseType = (type: DatabaseType) => {
  localStorage.setItem('flow_active_db', type);
};

export const getDatabase = (): DatabaseAdapter => {
  const activeType = getActiveDatabaseType();
  if (activeType === 'postgres') {
    return getPostgresAdapter();
  }
  return getFirebaseAdapter();
};
