import { DatabaseAdapter } from './dbLayer';
import { Product, Order } from '../types';

// Mock data acting as initial seed for the databases to ensure functionality works immediately without setup
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Kente Cloth',
    price: 450,
    description: 'Authentic hand-woven Kente cloth from the Volta region. Rich in color and tradition.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/kente/800/600',
    isMadeInGhana: true,
    vendorName: 'Adinkra Arts',
    stock: 12,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Premium Shea Butter',
    price: 85,
    description: '100% organic, cold-pressed shea butter for skin and hair health.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/shea/800/600',
    isMadeInGhana: true,
    vendorName: 'Northern Gold',
    stock: 50,
    rating: 4.9
  }
];

export const getFirebaseAdapter = (): DatabaseAdapter => {
  return {
    getProducts: async () => {
      // In a real app: import { getDocs, collection } from 'firebase/firestore'
      // This is a stub ready for active Firestore setup!
      console.log('Firebase DB: Fetching Products');
      return MOCK_PRODUCTS; 
    },
    getOrders: async () => {
      console.log('Firebase DB: Fetching Orders');
      return [];
    },
    saveOrder: async (order: Order) => {
      console.log('Firebase DB: Saved Order', order);
    }
  };
};
