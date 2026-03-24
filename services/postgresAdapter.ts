import { DatabaseAdapter } from './dbLayer';
import { Product, Order } from '../types';

export const getPostgresConfig = () => {
  return localStorage.getItem('flow_postgres_url') || 'http://localhost:3000/api';
};

export const setPostgresConfig = (url: string) => {
  localStorage.setItem('flow_postgres_url', url);
};

const API_BASE = 'http://localhost:3000/api';

export const getPostgresAdapter = (): DatabaseAdapter => {
  console.log('[FlowVender] Connected to PostgreSQL (demo mode)');

  const api = {
    getProducts: async (): Promise<Product[]> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/products`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/products`, {
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // return await response.json();
        
        // Demo: return empty, firebaseAdapter provides seed data
        return [];
      } catch (e) {
        console.error('[PostgreSQL] Failed to fetch products:', e);
        return [];
      }
    },

    getOrders: async (): Promise<Order[]> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/orders`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/orders`, {
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // return await response.json();
        
        return [];
      } catch (e) {
        console.error('[PostgreSQL] Failed to fetch orders:', e);
        return [];
      }
    },

    saveOrder: async (order: Order): Promise<void> => {
      console.log(`[PostgreSQL] POST ${API_BASE}/orders`, order);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/orders`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(order)
        // });
        // if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // return await response.json();
        
        console.log('[PostgreSQL] Order saved successfully (demo)');
      } catch (e) {
        console.error('[PostgreSQL] Failed to save order:', e);
        throw e;
      }
    },

    searchProducts: async (query: string): Promise<Product[]> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/products/search?q=${query}`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
        // if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // return await response.json();
        
        return [];
      } catch (e) {
        console.error('[PostgreSQL] Failed to search products:', e);
        return [];
      }
    },

    getFlashDeals: async (): Promise<Product[]> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/products/flash-deals`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/products/flash-deals`);
        // return await response.json();
        return [];
      } catch (e) {
        console.error('[PostgreSQL] Failed to fetch flash deals:', e);
        return [];
      }
    },

    getMadeInGhana: async (): Promise<Product[]> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/products/made-in-ghana`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/products/made-in-ghana`);
        // return await response.json();
        return [];
      } catch (e) {
        console.error('[PostgreSQL] Failed to fetch Ghana products:', e);
        return [];
      }
    },

    getWishlistProducts: async (): Promise<Product[]> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/wishlist`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/wishlist`);
        // return await response.json();
        return [];
      } catch (e) {
        console.error('[PostgreSQL] Failed to fetch wishlist:', e);
        return [];
      }
    },

    isInWishlist: async (productId: string): Promise<boolean> => {
      console.log(`[PostgreSQL] GET ${API_BASE}/wishlist/${productId}`);
      try {
        // Production endpoint structure:
        // const response = await fetch(`${API_BASE}/wishlist/${productId}`);
        // return response.status === 200;
        return false;
      } catch (e) {
        console.error('[PostgreSQL] Failed to check wishlist:', e);
        return false;
      }
    },

    toggleWishlist: (productId: string): boolean => {
      // Wishlist is localStorage-based, no PostgreSQL call needed
      console.log(`[FlowVender] Toggle wishlist: ${productId}`);
      const list: string[] = JSON.parse(localStorage.getItem('flowvender_wishlist') || '[]');
      const idx = list.indexOf(productId);
      if (idx >= 0) {
        list.splice(idx, 1);
        localStorage.setItem('flowvender_wishlist', JSON.stringify(list));
        return false;
      } else {
        list.push(productId);
        localStorage.setItem('flowvender_wishlist', JSON.stringify(list));
        return true;
      }
    },
  };

  return api;
};

console.log('[FlowVender] PostgreSQL adapter initialized');
