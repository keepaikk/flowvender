import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, DollarSign, MessageCircle, Phone,
  Eye, CheckCircle, MapPin, Search, TrendingUp, Store,
  ChevronRight, RefreshCw, Star, Clock, AlertCircle, XCircle, LogOut,
  MapPin as MapPinIcon, UserPlus, Eye as EyeOff, Eye as EyeOn
} from 'lucide-react';
import { Order, CartItem } from '../types';
import { getSavedOrders, saveOrders } from '../services/firebaseAdapter';
import { CONFIG } from '../services/config';

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  IN_TRANSIT: 'bg-orange-100 text-orange-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RELEASED: 'bg-green-100 text-green-800',
  REFUNDED: 'bg-red-100 text-red-800',
};

interface Vendor {
  id: string;
  shopName: string;
  phone: string;
  location: string;
  description?: string;
  password: string;
}

// ─── VENDOR STORAGE HELPERS ───────────────────────────────────────
const VENDORS_KEY = 'flowvendors';

const getVendors = (): Vendor[] => {
  try {
    return JSON.parse(localStorage.getItem(VENDORS_KEY) || '[]');
  } catch { return []; }
};

const saveVendor = (vendor: Vendor): void => {
  const vendors = getVendors();
  vendors.push(vendor);
  localStorage.setItem(VENDORS_KEY, JSON.stringify(vendors));
};

const findVendor = (phone: string, password: string): Vendor | null => {
  const vendors = getVendors();
  return vendors.find(v => v.phone === phone && v.password === password) || null;
};

const findVendorByPhone = (phone: string): Vendor | null => {
  const vendors = getVendors();
  return vendors.find(v => v.phone === phone) || null;
};

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendorAuth, setVendorAuth] = useState(false);
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorShopName, setVendorShopName] = useState('');
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // ─── SIGNUP STATE ──────────────────────────────────────────────
  const [isSignup, setIsSignup] = useState(false);
  const [signupShopName, setSignupShopName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupLocation, setSignupLocation] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupDescription, setSignupDescription] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    if (vendorAuth) {
      setOrders(getSavedOrders());
    }
  }, [vendorAuth]);

  // ─── LOGIN HANDLER ──────────────────────────────────────────────
  const handleVendorLogin = () => {
    // First check localStorage vendors
    const vendor = findVendor(vendorPhone, vendorPassword);
    if (vendor) {
      setVendorAuth(true);
      setCurrentVendor(vendor);
      setVendorName(vendor.shopName);
      return;
    }
    // Fallback to CONFIG password
    if (vendorPassword === CONFIG.VENDOR_PASSWORD || vendorPassword === 'vendor123') {
      setVendorAuth(true);
      setVendorName('My Store');
      setCurrentVendor({ id: 'legacy', shopName: 'My Store', phone: vendorPhone, location: '', password: vendorPassword });
    } else {
      alert('Invalid credentials. If you are a new vendor, please sign up first.');
    }
  };

  // ─── SIGNUP HANDLER ────────────────────────────────────────────
  const handleVendorSignup = () => {
    if (!signupShopName.trim()) {
      alert('Please enter your shop name');
      return;
    }
    if (!signupPhone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!signupLocation.trim()) {
      alert('Please enter your location/city');
      return;
    }
    if (signupPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Check if phone already registered
    if (findVendorByPhone(signupPhone)) {
      alert('A vendor with this phone number already exists. Please log in instead.');
      setIsSignup(false);
      return;
    }

    const newVendor: Vendor = {
      id: `vendor_${Date.now()}`,
      shopName: signupShopName.trim(),
      phone: signupPhone.trim(),
      location: signupLocation.trim(),
      description: signupDescription.trim(),
      password: signupPassword,
    };

    saveVendor(newVendor);
    setCurrentVendor(newVendor);
    setVendorName(newVendor.shopName);
    setVendorPhone(newVendor.phone);
    setVendorAuth(true);
    setSignupSuccess(true);

    // Reset form
    setSignupShopName('');
    setSignupPhone('');
    setSignupLocation('');
    setSignupPassword('');
    setSignupDescription('');
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const sendWhatsAppUpdate = (order: Order) => {
    const statusMessages: Record<string, string> = {
      PAID: 'Your payment has been confirmed! 🟢',
      PROCESSING: 'Your order is being prepared! 📦',
      IN_TRANSIT: 'Your order is on its way! 🚚',
      DELIVERED: 'Your order has been delivered! ✅',
    };
    const msg = encodeURIComponent(
      `${statusMessages[order.status] || 'Update:'} Your order #${order.id} is now ${order.status.replace('_', ' ')}. - FlowVender`
    );
    window.open(`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, '') || CONFIG.VENDOR_WHATSAPP}?text=${msg}`, '_blank');
  };

  // Filter orders that have items from this vendor (or show all if no vendor filter)
  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerPhone?.includes(searchTerm)
  );

  const totalRevenue = orders.filter(o => o.status !== 'CANCELLED' && o.status !== 'REFUNDED').reduce((s, o) => s + o.totalAmount, 0);
  const pendingCount = orders.filter(o => ['PENDING', 'PAID'].includes(o.status)).length;
  const deliveredCount = orders.filter(o => o.status === 'DELIVERED').length;

  // ─── LOGIN / SIGNUP SCREEN ──────────────────────────────────────
  if (!vendorAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-green-100">
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store size={32} className="text-green-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isSignup ? 'Vendor Sign Up' : 'Vendor Portal'}
            </h2>
            <p className="text-gray-500 mt-2">
              {isSignup ? 'Create your shop on FlowVender' : 'Sign in to manage your orders'}
            </p>
          </div>

          {signupSuccess ? (
            <div className="text-center space-y-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-700">Welcome, {vendorName}!</h3>
              <p className="text-gray-600">
                Your shop <strong>"{vendorName}"</strong> will appear on the FlowVender marketplace shortly!
              </p>
              <button
                onClick={() => { setSignupSuccess(false); navigate('/'); }}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Go to Marketplace
              </button>
            </div>
          ) : isSignup ? (
            // ─── SIGNUP FORM ───────────────────────────────────
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name *</label>
                <input
                  type="text"
                  value={signupShopName}
                  onChange={e => setSignupShopName(e.target.value)}
                  placeholder="e.g., Kofi Kente Shop"
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number * (for WhatsApp)</label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={e => setSignupPhone(e.target.value)}
                  placeholder="e.g., 024 123 4567"
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location / City *</label>
                <input
                  type="text"
                  value={signupLocation}
                  onChange={e => setSignupLocation(e.target.value)}
                  placeholder="e.g., Kumasi, Accra, Tamale"
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password * (min 6 characters)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <EyeOn size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What do you sell? (optional)</label>
                <textarea
                  value={signupDescription}
                  onChange={e => setSignupDescription(e.target.value)}
                  placeholder="Brief description of your products..."
                  rows={2}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition resize-none"
                />
              </div>
              <button
                onClick={handleVendorSignup}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <UserPlus size={18} /> Create My Shop
              </button>
              <p className="text-xs text-gray-400 text-center">
                Your shop will appear on the FlowVender marketplace shortly! &nbsp;|&nbsp;
                <button onClick={() => setIsSignup(false)} className="text-green-600 hover:underline ml-1">
                  Already registered? Sign in
                </button>
              </p>
            </div>
          ) : (
            // ─── LOGIN FORM ────────────────────────────────────
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={vendorPhone}
                  onChange={e => setVendorPhone(e.target.value)}
                  placeholder="Enter your registered phone"
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={vendorPassword}
                  onChange={e => setVendorPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleVendorLogin()}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
              <button
                onClick={handleVendorLogin}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Access Vendor Portal
              </button>
              <p className="text-xs text-gray-400 text-center">
                New vendor? &nbsp;
                <button onClick={() => setIsSignup(true)} className="text-green-600 hover:underline">
                  Sign up here
                </button>
                &nbsp;|&nbsp;
                <Link to="/admin" className="text-green-600 hover:underline">Admin login</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── VENDOR PORTAL ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Store size={24} />
            <div>
              <h1 className="text-lg font-bold">Vendor Portal</h1>
              <p className="text-xs opacity-80">{vendorName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">{orders.length} orders</span>
            <button
              onClick={() => setOrders(getSavedOrders())}
              className="p-2 hover:bg-green-600 rounded-full" title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={() => setVendorAuth(false)}
              className="flex items-center gap-1 text-sm bg-green-800 px-3 py-1.5 rounded-lg hover:bg-green-900"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold text-green-700">GH₵ {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <AlertCircle size={20} className="text-orange-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending Orders</p>
                <p className="text-xl font-bold text-orange-700">{pendingCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <CheckCircle size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Delivered</p>
                <p className="text-xl font-bold text-blue-700">{deliveredCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer name or phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No orders yet</p>
              <p className="text-gray-400 text-sm mt-1">Orders placed by customers will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-800">{order.id}</span>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.timestamp).toLocaleDateString('en-GH', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-900">{order.customerName || 'N/A'}</p>
                        {order.customerPhone && (
                          <a href={`tel:${order.customerPhone}`} className="text-xs text-green-600 hover:underline flex items-center gap-1 mt-0.5">
                            <Phone size={10} /> {order.customerPhone}
                          </a>
                        )}
                        {order.deliveryAddress && (
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {order.deliveryAddress.substring(0, 30)}...
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-700">{order.items.length} items</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {order.items.slice(0, 2).map(i => i.name).join(', ')}
                          {order.items.length > 2 ? ` +${order.items.length - 2} more` : ''}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-green-700">GH₵ {order.totalAmount.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {['PENDING','PAID','PROCESSING','IN_TRANSIT','DELIVERED','CANCELLED','REFUNDED'].map(s => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-gray-600">{order.paymentMethod}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>
                          {order.customerPhone && (
                            <>
                              <button
                                onClick={() => sendWhatsAppUpdate(order)}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                                title="Send WhatsApp Update"
                              >
                                <MessageCircle size={15} />
                              </button>
                              <a
                                href={`tel:${order.customerPhone}`}
                                className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition"
                                title="Call Customer"
                              >
                                <Phone size={15} />
                              </a>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="p-5 border-b flex justify-between items-center sticky top-0 bg-white">
              <div>
                <h3 className="text-lg font-bold">Order #{selectedOrder.id}</h3>
                <p className="text-xs text-gray-400">{new Date(selectedOrder.timestamp).toLocaleString('en-GH')}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={22} />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-sm">{selectedOrder.customerName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-sm">{selectedOrder.customerPhone || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                  <p className="font-semibold text-sm">{selectedOrder.deliveryAddress || selectedOrder.customerAddress || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <p className="font-semibold text-sm">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Delivery</p>
                  <p className="font-semibold text-sm">{selectedOrder.deliveryMode}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-sm">GH₵ {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-green-700">GH₵ {selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">Update Status</p>
                <select
                  value={selectedOrder.status}
                  onChange={e => {
                    updateOrderStatus(selectedOrder.id, e.target.value as Order['status']);
                    setSelectedOrder({ ...selectedOrder, status: e.target.value as Order['status'] });
                  }}
                  className={`w-full font-semibold px-4 py-2.5 rounded-xl border-0 ${STATUS_COLORS[selectedOrder.status] || 'bg-gray-100 text-gray-700'}`}
                >
                  {['PENDING','PAID','PROCESSING','IN_TRANSIT','DELIVERED','CANCELLED','REFUNDED'].map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              {selectedOrder.customerPhone && (
                <div className="flex gap-3">
                  <button
                    onClick={() => sendWhatsAppUpdate(selectedOrder)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    <MessageCircle size={18} /> WhatsApp Update
                  </button>
                  <a
                    href={`tel:${selectedOrder.customerPhone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
                  >
                    <Phone size={18} /> Call Customer
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
