export enum DeliveryMode {
  COURIER = 'Partner Courier Services',
  SELF_PICKUP = 'Pick Product on Their Own',
  ON_DEMAND = 'Partner Uber or Bolt Delivery'
}

export enum PaymentMethod {
  PAYSTACK_FULL = 'Paystack (Full Payment)',
  PAYSTACK_PARTIAL = 'Paystack (Partial Payment)',
  MTN_MOBILE_MONEY = 'MTN Mobile Money',
  VODAFONE_CASH = 'Vodafone Cash',
  AIRTELTIGO_MONEY = 'AirtelTigo Money',
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
  originalPrice?: number;   // For flash deals
  isFlashDeal?: boolean;
  dealEndsAt?: string;     // ISO date string
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'IN_TRANSIT' | 'DELIVERED' | 'RELEASED' | 'REFUNDED' | 'CANCELLED';
  deliveryMode: DeliveryMode;
  paymentMethod: PaymentMethod;
  timestamp: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  deliveryAddress?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
  balance?: number;
  phone?: string;
  address?: string;
}

export interface Review {
  id: string;
  productId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
