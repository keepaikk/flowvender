
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Added missing ShoppingCart and Package imports
import { 
  Trash2, 
  CreditCard, 
  Truck, 
  User, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ShoppingCart,
  Package
} from 'lucide-react';
import { CartItem, DeliveryMode, PaymentMethod, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, removeFromCart, clearCart, setOrders }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>(DeliveryMode.COURIER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.PAYSTACK_FULL);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const deliveryFee = deliveryMode === DeliveryMode.SELF_PICKUP ? 0 : 25;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate Paystack processing
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: [...cart],
        totalAmount: total,
        status: 'PENDING',
        deliveryMode,
        paymentMethod,
        timestamp: new Date().toISOString()
      };
      setOrders(prev => [newOrder, ...prev]);
      setIsProcessing(false);
      clearCart();
      setStep(3);
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some products from the marketplace to get started.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Go to Market
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-12">
           <div className="flex items-center w-full max-w-lg">
             {[1,2,3].map(s => (
               <React.Fragment key={s}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border-2'}`}>
                   {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                 </div>
                 {s < 3 && <div className={`flex-grow h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
               </React.Fragment>
             ))}
           </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                   <ShoppingCart className="text-blue-600" /> Review Your Items
                </h2>
                <div className="divide-y">
                  {cart.map(item => (
                    <div key={item.id} className="py-6 flex gap-6">
                      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover border" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Vendor: {item.vendorName}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Qty: {item.quantity}</span>
                          <span className="font-bold text-gray-900">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                   <Truck className="text-blue-600" /> Delivery Options
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.values(DeliveryMode).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setDeliveryMode(mode)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        deliveryMode === mode ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">{mode}</div>
                      <p className="text-xs text-gray-500">
                        {mode === DeliveryMode.COURIER && "Reliable delivery via reputable partners."}
                        {mode === DeliveryMode.SELF_PICKUP && "Pick up at designated locations."}
                        {mode === DeliveryMode.ON_DEMAND && "Same-day delivery via Uber/Bolt."}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>GH₵ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>GH₵ {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-extrabold text-gray-900">
                    <span>Total</span>
                    <span>GH₵ {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="bg-green-50 text-green-700 text-xs p-3 rounded-xl flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Escrow payment enabled. Funds held until delivery.
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <CreditCard className="text-blue-600" /> Secure Payment
              </h2>

              <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-4 tracking-wide uppercase">Select Payment Strategy</label>
                   <div className="grid grid-cols-1 gap-4">
                     {Object.values(PaymentMethod).map(method => (
                       <button
                         key={method}
                         onClick={() => setPaymentMethod(method)}
                         className={`p-6 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                           paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-300'
                         }`}
                       >
                         <div>
                            <div className="font-bold text-lg mb-1">{method}</div>
                            <p className="text-xs text-gray-500">
                              {method === PaymentMethod.PAYSTACK_FULL 
                                ? "Pay the full amount upfront into escrow." 
                                : "Pay 50% now and 50% upon delivery confirmation."}
                            </p>
                         </div>
                         {paymentMethod === method && <CheckCircle2 className="text-blue-600 w-6 h-6" />}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="bg-blue-600 text-white p-6 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Total due now</p>
                      <p className="text-3xl font-bold">
                        GH₵ {(paymentMethod === PaymentMethod.PAYSTACK_FULL ? total : total / 2).toLocaleString()}
                      </p>
                    </div>
                 </div>

                 <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
                   <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                   <p className="text-xs text-amber-700 font-medium">
                     The Flow Vendor Market system holds your payment in a secure escrow account. The vendor only receives payment after you confirm the product is in your hands and as described.
                   </p>
                 </div>

                 <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`w-full h-16 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                    isProcessing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                  ) : (
                    <>Pay with Paystack <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full text-gray-500 font-bold text-sm hover:underline"
                >
                  Back to Review
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-xl mx-auto text-center py-12">
             <div className="bg-green-100 p-8 rounded-full inline-block mb-8">
               <CheckCircle2 className="w-16 h-16 text-green-600" />
             </div>
             <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
             <p className="text-gray-600 mb-12">
               Your payment is now held in escrow. You'll receive real-time updates as the vendor prepares and ships your order.
             </p>
             <div className="space-y-4">
               <button 
                 onClick={() => navigate('/orders')}
                 className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
               >
                 Track My Order <Package className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => navigate('/')}
                 className="w-full text-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all"
               >
                 Return to Marketplace
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
