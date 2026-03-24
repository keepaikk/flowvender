# FlowVender — Ghana's Premier Marketplace

<div align="center">
<img width="1200" height="475" alt="FlowVender Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

**FlowVender** is a secure e-commerce marketplace designed specifically for Ghana, featuring escrow payments, verified vendors, and flexible delivery options.

## Features

### 🛒 For Customers
- **50+ Authentic Ghanaian Products** — From Kente cloth to electronics
- **Flash Deals** — Limited time offers with countdown timers
- **Made in Ghana Filter** — Easily find locally-made products
- **Smart Search** — Search by product name, vendor, or category
- **Wishlist** — Save products for later
- **Shopping Cart** — Persistent cart saved in localStorage

### 💳 Secure Payments
- **Escrow Protection** — Money held safely until delivery confirmed
- **MTN Mobile Money** — Pay with MoMo
- **Vodafone Cash** — Alternative mobile money option
- **AirtelTigo Money** — Third MoMo provider supported
- **Paystack Integration** — Full or partial payment options

### 🚚 Flexible Delivery
- **Partner Courier Services** — Reliable tracked delivery
- **Self Pickup** — Collect from designated locations
- **On-Demand Delivery** — Uber/Bolt same-day delivery

### 📱 Order Tracking
- **Real-time Status Updates** — PAID → PROCESSING → IN_TRANSIT → DELIVERED
- **WhatsApp Notifications** — Send order details via WhatsApp
- **Customer Details** — Name, phone, and address on every order

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **Vite** for build tooling
- **localStorage** for data persistence

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd flowvender

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> Note: The app works without the Gemini API key, but AI product descriptions won't be generated.

## Project Structure

```
flowvender/
├── components/
│   ├── MarketView.tsx      # Main marketplace with products, search, filters
│   ├── ProductDetail.tsx   # Individual product page
│   ├── Checkout.tsx        # Multi-step checkout with customer forms
│   ├── UserOrders.tsx      # Order history and tracking
│   ├── VendorDashboard.tsx # Vendor management portal
│   └── AffiliateLanding.tsx# Affiliate program landing page
├── services/
│   ├── firebaseAdapter.ts  # Product data, wishlist, cart persistence
│   ├── postgresAdapter.ts  # PostgreSQL API structure (demo mode)
│   ├── whatsappService.ts  # WhatsApp order notifications
│   └── geminiService.ts    # AI product description generation
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Main app with routing
└── index.html              # HTML entry point
```

## Data Flow

### localStorage Keys
- `flowvender_wishlist` — Array of wishlisted product IDs
- `flowvender_cart` — Shopping cart items
- `flowvender_orders` — Order history
- `flow_postgres_url` — PostgreSQL API URL (for future use)

### Order ID Format
Orders use the format: `FVM-YYYYMMDD-XXXX`
- `FVM` — FlowVender prefix
- `YYYYMMDD` — Date of order
- `XXXX` — Random 4-digit sequence

## API Structure (PostgreSQL)

The postgresAdapter is structured for future backend integration:

```
GET  /api/products           # List all products
GET  /api/products/search    # Search products
GET  /api/products/flash-deals
GET  /api/products/made-in-ghana
GET  /api/orders            # Customer orders
POST /api/orders            # Create new order
GET  /api/wishlist          # User wishlist
POST /api/wishlist/:id      # Toggle wishlist item
```

## Features by Component

### MarketView
- Hero section with marketplace branding
- Flash deals section with countdown timers
- "Made in Ghana" filter toggle
- Category chips for filtering
- Full-text search calling `searchProducts()`
- Wishlist heart buttons on all products
- 50-product catalog from firebaseAdapter

### ProductDetail
- Product gallery with thumbnails
- Wishlist toggle button
- Stock status display (In Stock, Low Stock, Out of Stock)
- Related products (same category)
- Delivery fee estimator by zone
- AI-enhanced product description

### Checkout
- Customer name (required)
- Customer phone (required for delivery)
- Customer address fields
- Delivery mode selection
- Mobile Money payment flow with MoMo numbers
- Real order ID generation

### UserOrders
- Order tracking steps: PAID → PROCESSING → IN_TRANSIT → DELIVERED
- Customer name/phone/address display
- Payment method shown
- WhatsApp notification button
- Status update buttons (for demo)

## Deployment

### Build for Production

```bash
npm run build
```

### Docker

```bash
docker build -t flowvender .
docker run -p 3000:80 flowvender
```

### Nginx

The project includes an nginx.conf for production deployment.

## License

MIT License - Built for Ghana's Digital Future 🇬🇭
