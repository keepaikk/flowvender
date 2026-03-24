
export enum DeliveryMode {
  COURIER = 'Partner Courier Services',
  SELF_PICKUP = 'Pick Product on Their Own',
  ON_DEMAND = 'Partner Uber or Bolt Delivery'
}

export enum PaymentMethod {
  PAYSTACK_FULL = 'Paystack (Full Payment)',
  PAYSTACK_PARTIAL = 'Paystack (Partial Payment)',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isMadeInGhana: boolean;
  vendorName: string;
  stock: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'RELEASED' | 'REFUNDED';
  deliveryMode: DeliveryMode;
  paymentMethod: PaymentMethod;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
  balance?: number;
}
