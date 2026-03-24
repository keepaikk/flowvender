
import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Store, 
  Users, 
  ShieldCheck, 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  CreditCard,
  Truck,
  Heart,
  ChevronRight,
  TrendingUp,
  Award,
  BadgeCheck,
  Package,
  History
} from 'lucide-react';
import { Product, CartItem, Order, DeliveryMode, PaymentMethod, UserProfile } from './types';
import MarketView from './components/MarketView';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import VendorDashboard from './components/VendorDashboard';
import AffiliateLanding from './components/AffiliateLanding';
import UserOrders from './components/UserOrders';

import { getDatabase } from './services/dbLayer';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  React.useEffect(() => {
    getDatabase().getProducts().then(setProducts);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useState<UserProfile>({
    name: 'Kwame Mensah',
    email: 'kwame@example.com',
    role: 'CUSTOMER'
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <ShoppingBag className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">FLOW<span className="text-blue-600">MARKET</span></span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Marketplace</Link>
                <Link to="/affiliates" className="text-gray-600 hover:text-blue-600 font-medium">Affiliate Program</Link>
                <Link to="/vendor" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
                   <Store className="w-4 h-4" /> Vendor Hub
                </Link>
                <div className="flex items-center space-x-4 border-l pl-8">
                  <Link to="/orders" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <History className="w-6 h-6" />
                  </Link>
                  <Link to="/checkout" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
              <Link to="/" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
              <Link to="/affiliates" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Affiliate Program</Link>
              <Link to="/vendor" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Vendor Hub</Link>
              <Link to="/orders" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <Link to="/checkout" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Cart ({totalItems})</Link>
            </div>
          )}
        </nav>

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MarketView products={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} setOrders={setOrders} />} />
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/affiliates" element={<AffiliateLanding />} />
            <Route path="/orders" element={<UserOrders orders={orders} setOrders={setOrders} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="text-blue-500 w-6 h-6" />
                <span className="text-xl font-bold text-white">FLOW MARKET</span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering Ghanaian businesses with secure e-commerce, reliable delivery, and performance-based marketing.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 underline decoration-blue-500">Security & Trust</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Escrow Payments</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-500" /> Verified Vendors</li>
                <li className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-green-500" /> Paystack Secured</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 underline decoration-blue-500">Delivery Options</h4>
              <ul className="space-y-2 text-sm">
                <li>Reputable Courier Partners</li>
                <li>Self-Pickup Locations</li>
                <li>On-Demand (Uber/Bolt)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 underline decoration-blue-500">Partner Program</h4>
              <ul className="space-y-2 text-sm">
                <li>Affiliate Training</li>
                <li>Made in Ghana Showcase</li>
                <li>Web Design for Vendors</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-xs">
            &copy; 2024 Flow Vendor Markets. All rights reserved. Built for Ghana's Digital Future.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
