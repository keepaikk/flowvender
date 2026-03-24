import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, BarChart3, Settings, Bell, ChevronRight, Search, Eye, CheckCircle, XCircle, Phone, MapPin, MessageCircle, RefreshCw, Plus, Edit2, Trash2, TrendingUp, DollarSign, ShoppingBag, AlertCircle } from 'lucide-react';
import { Order, Product, CartItem } from '../types';
import { getSavedOrders, saveOrders } from '../services/firebaseAdapter';
import { CONFIG, log } from '../services/config';
import { sendOrderViaWhatsApp } from '../services/whatsappService';

type Tab = 'orders' | 'products' | 'analytics' | 'settings';

const STATUS_STEPS = ['PENDING', 'PAID', 'PROCESSING', 'IN_TRANSIT', 'DELIVERED'] as const;
const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  IN_TRANSIT: 'bg-orange-100 text-orange-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const savedOrders = getSavedOrders();
    setOrders(savedOrders);
    // Load products from firebaseAdapter
    import('../services/firebaseAdapter').then(m => {
      m.getFirebaseAdapter().getProducts().then(p => setProducts(p));
    });
    setLoading(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
    log('Order status updated:', orderId, newStatus);
  };

  const sendWhatsAppUpdate = (order: Order) => {
    const statusMessages: Record<string, string> = {
      PAID: 'Your payment has been confirmed! 🟢',
      PROCESSING: 'Your order is being prepared! 📦',
      IN_TRANSIT: 'Your order is on its way! 🚚',
      DELIVERED: 'Your order has been delivered! ✅',
    };
    const msg = encodeURIComponent(`${statusMessages[order.status] || 'Update:'} Your order #${order.id} is now ${order.status.replace('_', ' ')}. - FlowVender`);
    window.open(`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, '') || CONFIG.VENDOR_WHATSAPP}?text=${msg}`, '_blank');
  };

  // Analytics
  const totalRevenue = orders.filter(o => o.status !== 'CANCELLED' && o.status !== 'REFUNDED').reduce((s, o) => s + o.totalAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'PAID').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Filter orders by search
  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerPhone?.includes(searchTerm)
  );

  const navItems: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} />, count: pendingOrders },
    { id: 'products', label: 'Products', icon: <Package size={20} />, count: products.length },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">FlowVender Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">{orders.length} orders</span>
            <button onClick={loadData} className="p-2 hover:bg-green-600 rounded-full" title="Refresh">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 ${tab === item.id ? 'bg-green-50 text-green-700 border-r-4 border-green-600 font-semibold' : 'text-gray-700'}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {tab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Orders</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <DollarSign size={16} /> Total Revenue
                  </div>
                  <p className="text-2xl font-bold text-green-600">GH₵ {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <ShoppingBag size={16} /> Total Orders
                  </div>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <AlertCircle size={16} /> Pending
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <CheckCircle size={16} /> Delivered
                  </div>
                  <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
                </div>
              </div>

              {/* Orders list */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-8 text-gray-500">No orders found</td></tr>
                    )}
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-sm">{order.id}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">{order.customerName || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{order.customerPhone || ''}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.items.length} items</td>
                        <td className="px-4 py-3 font-semibold">GH₵ {order.totalAmount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[order.status] || 'bg-gray-100'}`}
                          >
                            {STATUS_STEPS.map(s => (
                              <option key={s} value={s}>{s.replace('_', ' ')}</option>
                            ))}
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="REFUNDED">REFUNDED</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.paymentMethod}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => setSelectedOrder(order)} className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="View Details">
                              <Eye size={16} />
                            </button>
                            {order.customerPhone && (
                              <button onClick={() => sendWhatsAppUpdate(order)} className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Send WhatsApp Update">
                                <MessageCircle size={16} />
                              </button>
                            )}
                            {order.customerPhone && (
                              <a href={`tel:${order.customerPhone}`} className="p-1.5 bg-purple-50 text-purple-600 rounded hover:bg-purple-100" title="Call Customer">
                                <Phone size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products ({products.length})</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Plus size={18} /> Add Product
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full object-contain" />
                      ) : (
                        <Package size={48} className="text-gray-300" />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-green-600">GH₵ {product.price.toLocaleString()}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${product.isMadeInGhana ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {product.isMadeInGhana ? '🇬🇭 Ghana' : product.vendorName}
                        </span>
                      </div>
                      {product.isFlashDeal && (
                        <span className="inline-block mt-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">🔥 Flash Deal</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} /> Revenue by Status</h3>
                  {[
                    { label: 'Delivered', count: deliveredOrders, color: 'bg-green-500' },
                    { label: 'In Transit', count: orders.filter(o => o.status === 'IN_TRANSIT').length, color: 'bg-orange-500' },
                    { label: 'Processing', count: orders.filter(o => o.status === 'PROCESSING').length, color: 'bg-purple-500' },
                    { label: 'Paid', count: orders.filter(o => o.status === 'PAID').length, color: 'bg-blue-500' },
                    { label: 'Pending', count: orders.filter(o => o.status === 'PENDING').length, color: 'bg-yellow-500' },
                  ].map(item => (
                    <div key={item.label} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${totalOrders > 0 ? (item.count / totalOrders * 100) : 0}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><DollarSign size={18} /> Financial Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-bold text-green-600">GH₵ {totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Order Value</span>
                      <span className="font-bold">GH₵ {averageOrder.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Orders</span>
                      <span className="font-bold">{totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivered</span>
                      <span className="font-bold text-green-600">{deliveredOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cancelled/Refunded</span>
                      <span className="font-bold text-red-600">{orders.filter(o => o.status === 'CANCELLED' || o.status === 'REFUNDED').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="bg-white rounded-lg shadow p-6 max-w-xl">
                <h3 className="font-semibold mb-4">Payment Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MTN Mobile Money</label>
                    <input type="text" defaultValue={CONFIG.MTN_MOMO} className="w-full border px-3 py-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vodafone Cash</label>
                    <input type="text" defaultValue={CONFIG.VODAFONE_CASH} className="w-full border px-3 py-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AirtelTigo Money</label>
                    <input type="text" defaultValue={CONFIG.AIRTELTIGO_MONEY} className="w-full border px-3 py-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendor WhatsApp</label>
                    <input type="text" defaultValue={CONFIG.VENDOR_WHATSAPP} className="w-full border px-3 py-2 rounded-lg" />
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Save Changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Order #{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600"><XCircle size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.customerName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedOrder.customerPhone || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{selectedOrder.deliveryAddress || selectedOrder.customerAddress || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Mode</p>
                  <p className="font-medium">{selectedOrder.deliveryMode}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Items</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b last:border-0">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-semibold">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">GH₵ {selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Update Status</p>
                <select
                  value={selectedOrder.status}
                  onChange={e => { updateOrderStatus(selectedOrder.id, e.target.value as Order['status']); setSelectedOrder({ ...selectedOrder, status: e.target.value as Order['status'] }); }}
                  className={`w-full font-semibold px-3 py-2 rounded-lg border-0 ${STATUS_COLORS[selectedOrder.status]}`}
                >
                  {[...STATUS_STEPS, 'CANCELLED', 'REFUNDED'].map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              {selectedOrder.customerPhone && (
                <button
                  onClick={() => sendWhatsAppUpdate(selectedOrder)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  <MessageCircle size={18} /> Send WhatsApp Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
