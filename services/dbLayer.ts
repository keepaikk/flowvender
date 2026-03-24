import { Product, CartItem, Order } from '../types';
import { getFirebaseAdapter } from './firebaseAdapter';
import { getPostgresAdapter } from './postgresAdapter';

export interface DatabaseAdapter {
  getProducts(): Promise<Product[]>;
  getOrders(): Promise<Order[]>;
  saveOrder(order: Order): Promise<void>;
}

export type DatabaseType = 'firebase' | 'postgres';

// Setup utility to get the currently selected database backend from local storage
export const getActiveDatabaseType = (): DatabaseType => {
  const saved = localStorage.getItem('flow_active_db');
  if (saved === 'firebase' || saved === 'postgres') {
    return saved;
  }
  return 'firebase'; // Default
};

export const setActiveDatabaseType = (type: DatabaseType) => {
  localStorage.setItem('flow_active_db', type);
};

// Returns the adapter interface for the active DB
export const getDatabase = (): DatabaseAdapter => {
  const activeType = getActiveDatabaseType();
  if (activeType === 'postgres') {
    return getPostgresAdapter();
  }
  return getFirebaseAdapter();
};
