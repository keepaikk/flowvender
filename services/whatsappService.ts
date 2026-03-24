import { Order } from '../types';
import { CONFIG } from './config';

// Opens WhatsApp with pre-filled order notification message
export const sendOrderViaWhatsApp = (order: Order): void => {
  const items = order.items.map(i => `• ${i.name} x${i.quantity} = GH₵ ${(i.price * i.quantity).toLocaleString()}`).join('\n');
  const msg = encodeURIComponent(
`🛒 NEW FLOWVENDER ORDER #${order.id}

👤 Customer: ${order.customerName || 'N/A'}
📞 Phone: ${order.customerPhone || 'N/A'}
📍 Address: ${order.deliveryAddress || order.customerAddress || 'N/A'}

📦 Items:\n${items}

💰 Total: GH₵ ${order.totalAmount.toLocaleString()}
🚚 Delivery: ${order.deliveryMode}
💳 Payment: ${order.paymentMethod}
📅 Time: ${new Date(order.timestamp).toLocaleString('en-GH')}`
  );
  window.open(`https://wa.me/${CONFIG.VENDOR_WHATSAPP}?text=${msg}`, '_blank');
};
