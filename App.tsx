import React, { useState, useMemo, useEffect } from 'react';
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
  History,
  LogOut
} from 'lucide-react';
import { Product, CartItem, Order, DeliveryMode, PaymentMethod, UserProfile } from './types';
import MarketView from './components/MarketView';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import VendorDashboard from './components/VendorDashboard';
import AffiliateLanding from './components/AffiliateLanding';
import UserOrders from './components/UserOrders';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

import { getDatabase } from './services/dbLayer';
import { getSavedCart, saveCart, getSavedOrders, saveOrders, getWishlist } from './services/firebaseAdapter';
import { useAuth } from './services/useAuth';
import { CONFIG } from './services/config';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Show toast notification (auto-dismiss after 2s)
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  React.useEffect(() => {
    // Load products from database
    getDatabase().getProducts().then(setProducts);
    
    // Load cart from localStorage on startup
    const savedCart = getSavedCart();
    setCart(savedCart);
    
    // Load orders from localStorage on startup
    const savedOrders = getSavedOrders();
    setOrders(savedOrders);
    
    // Load wishlist count
    setWishlistCount(getWishlist().length);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const { isAuthenticated, isLoading: authLoading, currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully');
  };

  const handleAdminLogin = () => {
    if (adminPasswordInput === 'admin123' || adminPasswordInput === CONFIG.ADMIN_PASSWORD) {
      setAdminAuth(true);
    } else {
      alert('Incorrect password');
    }
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
                <Link to="/" className="text-gray-600 hover:text-green-600 font-medium">Marketplace</Link>
                <Link to="/about" className="text-gray-600 hover:text-green-600 font-medium">About</Link>
                <Link to="/affiliates" className="text-gray-600 hover:text-green-600 font-medium">Affiliate Program</Link>
                <Link to="/vendor" className="text-gray-600 hover:text-green-600 font-medium flex items-center gap-1">
                   <Store className="w-4 h-4" /> Vendor Hub
                </Link>
                <div className="flex items-center space-x-4 border-l pl-8">
                  {wishlistCount > 0 && (
                    <Link to="/wishlist" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                      <Heart className="w-6 h-6" />
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    </Link>
                  )}
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
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3 border-l pl-4">
                      <span className="text-sm text-gray-600">
                        {currentUser?.name || currentUser?.email}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                        title="Logout"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center space-x-1 border-l pl-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  )}
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
              <Link to="/about" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/blog" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
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
            <Route path="/" element={<MarketView products={products} addToCart={addToCart} showToast={showToast} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} setOrders={setOrders} />} />
            <Route path="/admin" element={adminAuth ? <AdminDashboard /> : (
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
                  <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPasswordInput}
                    onChange={e => setAdminPasswordInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                    className="w-full border px-4 py-3 rounded-lg mb-4"
                  />
                  <button onClick={handleAdminLogin} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                    Login
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-4">Default password: admin123</p>
                </div>
              </div>
            )} />
            <Route path="/vendor" element={
              <ProtectedRoute requiredRoles={['vendor', 'admin']}>
                <VendorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/affiliates" element={<AffiliateLanding />} />
            <Route path="/orders" element={<UserOrders orders={orders} setOrders={setOrders} />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="text-green-500 w-6 h-6" />
                <span className="text-xl font-bold text-white">FLOW MARKET</span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering Ghanaian businesses with secure e-commerce, reliable delivery, and performance-based marketing.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 underline decoration-green-500">Security &amp; Trust</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Escrow Payments</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-500" /> Verified Vendors</li>
                <li className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-green-500" /> Paystack Secured</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 underline decoration-green-500">Delivery Options</h4>
              <ul className="space-y-2 text-sm">
                <li>Reputable Courier Partners</li>
                <li>Self-Pickup Locations</li>
                <li>On-Demand (Uber/Bolt)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 underline decoration-green-500">Partner Program</h4>
              <ul className="space-y-2 text-sm">
                <li>Affiliate Training</li>
                <li>Made in Ghana Showcase</li>
                <li>Web Design for Vendors</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-xs">
            © 2026 FlowVender Ghana. All rights reserved. Built for Ghana's Digital Future.
          </div>
        </footer>

        {/* Discreet Admin Footer */}
        <footer className="bg-gray-950 text-gray-600 text-center py-3 text-xs">
          <a href="#/admin" className="hover:text-gray-300 transition-colors">Admin</a>
          <span className="mx-2">·</span>
          <span>© 2026 FlowVender Ghana</span>
        </footer>

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all ${
            toast.type === 'success' ? 'bg-green-700' : 'bg-red-600'
          }`}>
            {toast.message}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
