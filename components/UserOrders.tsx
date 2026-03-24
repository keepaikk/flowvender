
import React from 'react';
import { Package, Truck, CheckCircle, ShieldCheck, History, ArrowRight, AlertCircle, RefreshCcw } from 'lucide-react';
import { Order } from '../types';

interface UserOrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

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
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl border shadow-sm overflow-hidden">
               <div className="p-6 border-b bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="font-bold text-blue-600">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-full ${
                      order.status === 'RELEASED' ? 'bg-green-100 text-green-700' :
                      order.status === 'REFUNDED' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'RELEASED' ? 'Funds Released' : 
                       order.status === 'REFUNDED' ? 'Refunded' : 
                       order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
                    <p className="text-sm font-medium">{new Date(order.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-lg font-bold">GH₵ {order.totalAmount.toLocaleString()}</p>
                  </div>
               </div>

               <div className="p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border" />
                      <div className="flex-grow">
                         <h4 className="font-bold text-gray-900">{item.name}</h4>
                         <p className="text-xs text-gray-500">Qty: {item.quantity} &bull; GH₵ {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
               </div>

               <div className="px-6 py-6 border-t bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl border shadow-sm">
                       <Truck className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-400 uppercase">Delivery via</p>
                       <p className="text-sm font-bold">{order.deliveryMode}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 w-full md:w-auto">
                    {order.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => requestRefund(order.id)}
                          className="flex-grow md:flex-none px-6 py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4" /> Refund
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
                      <button className="w-full md:w-auto px-10 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold cursor-not-allowed opacity-50 flex items-center justify-center gap-2">
                        Transaction Completed
                      </button>
                    )}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
