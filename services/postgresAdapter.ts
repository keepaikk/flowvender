import { DatabaseAdapter } from './dbLayer';
import { Product, Order } from '../types';

export const getPostgresConfig = () => {
  return localStorage.getItem('flow_postgres_url') || 'http://localhost:3000/api';
};

export const setPostgresConfig = (url: string) => {
  localStorage.setItem('flow_postgres_url', url);
};

export const getPostgresAdapter = (): DatabaseAdapter => {
  const apiUrl = getPostgresConfig();

  return {
    getProducts: async () => {
      console.log(`Postgres DB: Fetching Products from ${apiUrl}/products`);
      try {
        // const response = await fetch(`${apiUrl}/products`);
        // return await response.json();
        return []; 
      } catch (e) {
        console.error('Failed to fetch from Postgres URL', e);
        return [];
      }
    },
    getOrders: async () => {
       try {
        // const response = await fetch(`${apiUrl}/orders`);
        // return await response.json();
        return [];
       } catch (e) {
         return [];
       }
    },
    saveOrder: async (order: Order) => {
      console.log(`Postgres DB: Saving order to ${apiUrl}/orders`);
      // await fetch(`${apiUrl}/orders`, { method: 'POST', body: JSON.stringify(order) })
    }
  };
};
