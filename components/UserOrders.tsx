import React from 'react';
import { Package, Truck, CheckCircle, ShieldCheck, History, ArrowRight, AlertCircle, RefreshCcw, MessageCircle, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { Order } from '../types';
import { sendOrderViaWhatsApp } from '../services/whatsappService';

interface UserOrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

// Order status flow with icons and labels
const STATUS_STEPS = [
  { key: 'PAID', label: 'Paid', icon: CheckCircle },
  { key: 'PROCESSING', label: 'Processing', icon: Package },
  { key: 'IN_TRANSIT', label: 'In Transit', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
];

const getStatusIndex = (status: string): number => {
  const idx = STATUS_STEPS.findIndex(s => s.key === status);
  return idx >= 0 ? idx : 0;
};

const UserOrders: React.FC<UserOrdersProps> = ({ orders, setOrders }) => {
  const confirmReceipt = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'RELEASED' as const } : o
    ));
    alert("Funds released to vendor. Thank you for shopping with Flow Market!");
  };

  const requestRefund = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'REFUNDED' as const } : o
    ));
    alert("Refund request initiated. Our support team will verify eligibility.");
  };

  const markAsPaid = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'PAID' as const } : o
    ));
  };

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus as Order['status'] } : o
    ));
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Order History</h2>
        <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
           <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
           <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold">
              <ShieldCheck className="w-4 h-4" /> Escrow Protected
           </div>
        </div>

        <div className="space-y-6">
          {orders.map(order => {
            const statusIdx = getStatusIndex(order.status);
            
            return (
              <div key={order.id} className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b bg-gray-50/50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="font-bold text-blue-600">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-medium">{new Date(order.timestamp).toLocaleDateString('en-GH')}</p>
                      <p className="text-xs text-gray-500">{new Date(order.timestamp).toLocaleTimeString('en-GH')}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-lg font-bold">GH₵ {order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payment</p>
                      <p className="text-sm font-medium">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  {/* Customer Info */}
                  {(order.customerName || order.customerPhone || order.deliveryAddress) && (
                    <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                      {order.customerName && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{order.customerName}</span>
                        </div>
                      )}
                      {order.customerPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{order.customerPhone}</span>
                        </div>
                      )}
                      {order.deliveryAddress && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm truncate">{order.deliveryAddress}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Status Tracker */}
                {['PENDING', 'PAID', 'PROCESSING', 'IN_TRANSIT', 'DELIVERED', 'RELEASED'].includes(order.status) && (
                  <div className="p-6 border-b bg-blue-50/50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Order Status</p>
                    <div className="flex items-center justify-between">
                      {STATUS_STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx <= statusIdx;
                        const isCurrent = idx === statusIdx;
                        
                        return (
                          <React.Fragment key={step.key}>
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                isActive 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-200 text-gray-400'
                              } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <p className={`text-xs mt-2 font-medium ${
                                isActive ? 'text-blue-600' : 'text-gray-400'
                              }`}>
                                {step.label}
                              </p>
                            </div>
                            {idx < STATUS_STEPS.length - 1 && (
                              <div className={`flex-grow h-1 mx-2 rounded ${
                                idx < statusIdx ? 'bg-blue-600' : 'bg-gray-200'
                              }`} />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                    
                    {/* Status Update Buttons (for demo) */}
                    {order.status === 'PENDING' && (
                      <div className="mt-4 flex gap-2 justify-end">
                        <button 
                          onClick={() => markAsPaid(order.id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all"
                        >
                          Mark as Paid
                        </button>
                      </div>
                    )}
                    {(order.status === 'PAID' || order.status === 'PROCESSING') && (
                      <div className="mt-4 flex gap-2 justify-end">
                        <button 
                          onClick={() => updateStatus(order.id, order.status === 'PAID' ? 'PROCESSING' : 'IN_TRANSIT')}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all"
                        >
                          {order.status === 'PAID' ? 'Start Processing' : 'Mark In Transit'}
                        </button>
                      </div>
                    )}
                    {order.status === 'IN_TRANSIT' && (
                      <div className="mt-4 flex gap-2 justify-end">
                        <button 
                          onClick={() => updateStatus(order.id, 'DELIVERED')}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all"
                        >
                          Mark as Delivered
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Order Items */}
                <div className="p-6 space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Items</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border" />
                      <div className="flex-grow">
                         <h4 className="font-bold text-gray-900">{item.name}</h4>
                         <p className="text-xs text-gray-500">Qty: {item.quantity} &bull; GH₵ {item.price.toLocaleString()}</p>
                      </div>
                      <p className="font-bold text-gray-900">GH₵ {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex items-center gap-4">
                     <div className="bg-white p-3 rounded-2xl border shadow-sm">
                        <Truck className="w-6 h-6 text-gray-400" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Delivery via</p>
                        <p className="text-sm font-bold">{order.deliveryMode}</p>
                     </div>
                     {order.deliveryAddress && order.deliveryAddress !== 'Self Pickup' && (
                       <>
                         <span className="text-gray-300">|</span>
                         <div>
                           <p className="text-xs font-bold text-gray-400 uppercase">Address</p>
                           <p className="text-sm font-medium">{order.deliveryAddress}</p>
                         </div>
                       </>
                     )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-6 border-t bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* WhatsApp Notification Button */}
                  <button
                    onClick={() => sendOrderViaWhatsApp(order)}
                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Notify via WhatsApp
                  </button>

                  <div className="flex gap-4 w-full md:w-auto">
                    {order.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => requestRefund(order.id)}
                          className="flex-grow md:flex-none px-6 py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4" /> Cancel Order
                        </button>
                      </>
                    )}
                    {order.status === 'DELIVERED' && (
                      <>
                        <button 
                          onClick={() => requestRefund(order.id)}
                          className="flex-grow md:flex-none px-6 py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCcw className="w-4 h-4" /> Request Refund
                        </button>
                        <button 
                          onClick={() => confirmReceipt(order.id)}
                          className="flex-grow md:flex-none px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" /> Confirm Receipt
                        </button>
                      </>
                    )}
                    {(order.status === 'RELEASED' || order.status === 'REFUNDED') && (
                      <div className="w-full md:w-auto px-10 py-3 rounded-xl bg-gray-100 text-gray-500 font-bold flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Transaction Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
