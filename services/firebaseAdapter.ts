import { DatabaseAdapter } from './dbLayer';
import { Product, Order } from '../types';
import { log } from './config';

// ─── Seed Data: 50+ authentic Ghanaian products ────────────────────────────

const PRODUCTS: Product[] = [
  // Fashion
  {
    id: '1',
    name: 'Handcrafted Kente Cloth (3 Yards)',
    price: 450,
    description: 'Authentic hand-woven Kente cloth from Hohoe, Volta Region. Perfect for traditional occasions, weddings, and ceremonies. 100% silk thread.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/kente1/800/600',
    isMadeInGhana: true,
    vendorName: 'Adinkra Arts',
    stock: 12,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Kente Headwrap (Gye Nyame)',
    price: 85,
    description: 'Elegant Kente headwrap featuring the "Gye Nyame" symbol — "Except God". Suitable for women and men.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/kente2/800/600',
    isMadeInGhana: true,
    vendorName: 'Adinkra Arts',
    stock: 30,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Batakari (Traditional Smock)',
    price: 320,
    description: 'Hand-stitched Northern Ghana smock. Made from hand-woven cotton by master tailors in Tamale.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/batakari/800/600',
    isMadeInGhana: true,
    vendorName: 'Northern Textiles',
    stock: 8,
    rating: 4.9
  },
  {
    id: '4',
    name: 'Kaba & Slit (Ankara Set)',
    price: 220,
    description: 'Beautiful Ankara fabric set — Kaba top and slit bottom. Perfect for church, Eid, and special occasions.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/kaba/800/600',
    isMadeInGhana: true,
    vendorName: 'Sika Styles',
    stock: 25,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Leather Kente Sandals',
    price: 150,
    description: 'Comfortable leather sandals with authentic Kente weave straps. Made in Kumasi.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/sandals/800/600',
    isMadeInGhana: true,
    vendorName: 'Kumasi Craft',
    stock: 18,
    rating: 4.5
  },
  {
    id: '6',
    name: 'African Print Wrap Dress',
    price: 180,
    description: 'Vibrant wax print wrap dress. One size fits most. Machine washable.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/wrapdress/800/600',
    isMadeInGhana: false,
    vendorName: 'AfroShop GH',
    stock: 40,
    rating: 4.4
  },

  // Beauty & Personal Care
  {
    id: '7',
    name: 'Premium Raw Shea Butter (500g)',
    price: 85,
    description: '100% organic, unrefined shea butter from northern Ghana. Cold-pressed. Excellent for skin, hair, and baby care.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/shea500/800/600',
    isMadeInGhana: true,
    vendorName: 'Northern Gold',
    stock: 60,
    rating: 4.9
  },
  {
    id: '8',
    name: 'Organic Coconut Oil (1L)',
    price: 65,
    description: 'Pure virgin coconut oil from Volta Region. Great for cooking, skin, and hair. No chemicals.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/coconut/800/600',
    isMadeInGhana: true,
    vendorName: 'Volta Naturals',
    stock: 45,
    rating: 4.8
  },
  {
    id: '9',
    name: 'Black Soap (Alata Samina) - 200g',
    price: 35,
    description: 'Traditional Ghanaian black soap with shea. Treats acne, eczema, and skin blemishes.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/blacksoup/800/600',
    isMadeInGhana: true,
    vendorName: 'Natural Glow GH',
    stock: 80,
    rating: 4.7
  },
  {
    id: '10',
    name: 'Hair Food (Coconut & Shea) - 400ml',
    price: 45,
    description: 'Deep conditioning hair food. Promotes hair growth and prevents breakage. For all hair types.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/hairfood/800/600',
    isMadeInGhana: true,
    vendorName: 'Curl Kingdom GH',
    stock: 55,
    rating: 4.6
  },
  {
    id: '11',
    name: 'Vitamin C Serum (30ml)',
    price: 120,
    description: 'Brightening serum for glowing skin. Made with natural Ghanaian botanicals. Dermatologist tested.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/serum/800/600',
    isMadeInGhana: false,
    vendorName: 'Glow GH',
    stock: 35,
    rating: 4.5
  },
  {
    id: '12',
    name: 'Avocado Hair Pomade (250ml)',
    price: 55,
    description: 'Strong hold hair pomade made with avocado and shea. No flaking. Suitable for locs and twists.',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/pomade/800/600',
    isMadeInGhana: true,
    vendorName: 'Curl Kingdom GH',
    stock: 40,
    rating: 4.4
  },

  // Electronics & Phones
  {
    id: '13',
    name: 'Tecno Spark 20C (128GB)',
    price: 950,
    description: '6.6" HD+ display, 50MP camera, 5000mAh battery. Dual SIM. 1 year official warranty.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/spark20c/800/600',
    isMadeInGhana: false,
    vendorName: 'Phone World GH',
    stock: 20,
    rating: 4.3
  },
  {
    id: '14',
    name: 'Infinix Hot 40i (128GB)',
    price: 890,
    description: '6.56" 90Hz display, 50MP AI camera, 5000mAh. Includes free case and earbuds.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/infinix40i/800/600',
    isMadeInGhana: false,
    vendorName: 'Mobile Plaza',
    stock: 15,
    rating: 4.2
  },
  {
    id: '15',
    name: 'Samsung Galaxy A15 (128GB)',
    price: 1850,
    description: '6.5" Super AMOLED, 50MP camera, 5000mAh. 3 years Android updates. Official warranty.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/a15/800/600',
    isMadeInGhana: false,
    vendorName: 'Samsung Authorized',
    stock: 10,
    rating: 4.7
  },
  {
    id: '16',
    name: ' Oraimo PowerBank 20000mAh',
    price: 180,
    description: 'Fast charging 22.5W power bank. Charges 3 devices simultaneously. LED display.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/oraimopb/800/600',
    isMadeInGhana: false,
    vendorName: 'TechHub Accra',
    stock: 50,
    rating: 4.5
  },
  {
    id: '17',
    name: 'Bluetooth Speaker (Oraimo FreedGo)',
    price: 220,
    description: 'Portable 10W Bluetooth speaker. 24hr battery. IPX7 waterproof. FM radio built-in.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/speaker/800/600',
    isMadeInGhana: false,
    vendorName: 'TechHub Accra',
    stock: 30,
    rating: 4.4
  },
  {
    id: '18',
    name: 'Wireless Earbuds (Oraimo Encore)',
    price: 280,
    description: '40hr playtime with charging case. ENC noise cancellation. IPX4 splash resistant.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/earbuds/800/600',
    isMadeInGhana: false,
    vendorName: 'TechHub Accra',
    stock: 40,
    rating: 4.6
  },

  // Home & Kitchen
  {
    id: '19',
    name: 'Groundnut Paste (1kg)',
    price: 55,
    description: 'Homemade pure groundnut paste from local farms. No additives. Rich in protein.',
    category: 'Home',
    image: 'https://picsum.photos/seed/groundnut/800/600',
    isMadeInGhana: true,
    vendorName: 'Mama\'s Kitchen',
    stock: 30,
    rating: 4.8
  },
  {
    id: '20',
    name: 'Dried Prawns (250g)',
    price: 75,
    description: 'Sun-dried tiger prawns from Ghana coast. Used in soups and sauces. Cleaned and deveined.',
    category: 'Home',
    image: 'https://picsum.photos/seed/prawns/800/600',
    isMadeInGhana: true,
    vendorName: 'Coastal Foods GH',
    stock: 25,
    rating: 4.7
  },
  {
    id: '21',
    name: 'Maggi Cubes (24 pieces)',
    price: 18,
    description: 'Original Maggi bouillon cubes. The secret to rich Ghanaian soups and stews.',
    category: 'Home',
    image: 'https://picsum.photos/seed/maggi/800/600',
    isMadeInGhana: false,
    vendorName: 'Market Staples GH',
    stock: 100,
    rating: 4.6
  },
  {
    id: '22',
    name: 'Ground Chili (500g)',
    price: 25,
    description: 'Habanero and scotch bonnet blend. Freshly ground. No preservatives.',
    category: 'Home',
    image: 'https://picsum.photos/seed/chili/800/600',
    isMadeInGhana: true,
    vendorName: 'Mama\'s Kitchen',
    stock: 50,
    rating: 4.5
  },
  {
    id: '23',
    name: 'Smock Folding Fan (Brass)',
    price: 95,
    description: 'Handcrafted brass folding fan. Features Ghanaian Ankara print. Made in Accra.',
    category: 'Home',
    image: 'https://picsum.photos/seed/fan/800/600',
    isMadeInGhana: true,
    vendorName: 'Accra Crafts',
    stock: 20,
    rating: 4.4
  },
  {
    id: '24',
    name: 'Ceramic Bankun (Storage Jar)',
    price: 140,
    description: 'Traditional Ghanaian ceramic storage jar. Lead-free glaze. For rice, beans, or as decor.',
    category: 'Home',
    image: 'https://picsum.photos/seed/bankun/800/600',
    isMadeInGhana: true,
    vendorName: 'Volta Pottery',
    stock: 12,
    rating: 4.7
  },

  // Food & Spices
  {
    id: '25',
    name: 'Assorted Pepper (Shito) - 350g',
    price: 40,
    description: 'Homemade Ghana pepper mix. Available in mild, hot, and extra hot. No artificial colors.',
    category: 'Food',
    image: 'https://picsum.photos/seed/shito/800/600',
    isMadeInGhana: true,
    vendorName: 'Sika Spice GH',
    stock: 45,
    rating: 4.8
  },
  {
    id: '26',
    name: 'Palm Kernel Oil (1L)',
    price: 70,
    description: 'Unrefined red palm oil from Western Region. For cooking and traditional rituals.',
    category: 'Food',
    image: 'https://picsum.photos/seed/palm/800/600',
    isMadeInGhana: true,
    vendorName: 'Western Oils',
    stock: 35,
    rating: 4.6
  },
  {
    id: '27',
    name: 'Wheat Flour (2kg)',
    price: 38,
    description: 'Premium wheat flour for baking, pastries, and Ghanaian recipes like chinchinga.',
    category: 'Food',
    image: 'https://picsum.photos/seed/flour/800/600',
    isMadeInGhana: false,
    vendorName: 'Market Staples GH',
    stock: 80,
    rating: 4.3
  },
  {
    id: '28',
    name: 'Peeled Beans (2kg)',
    price: 65,
    description: 'Cleaned and peeled black-eyed peas. Perfect for red red, konkonte, or bean cakes.',
    category: 'Food',
    image: 'https://picsum.photos/seed/beans/800/600',
    isMadeInGhana: true,
    vendorName: 'Northern Grains',
    stock: 40,
    rating: 4.5
  },
  {
    id: '29',
    name: 'Tiger Nut Milk (1L)',
    price: 45,
    description: 'Fresh tiger nut milk. Naturally sweet, lactose-free energy drink. No added sugar.',
    category: 'Food',
    image: 'https://picsum.photos/seed/tigernut/800/600',
    isMadeInGhana: true,
    vendorName: 'Nature\'s Best GH',
    stock: 20,
    rating: 4.7
  },
  {
    id: '30',
    name: 'Ground Ginger (250g)',
    price: 22,
    description: 'Freshly ground ginger from Volta Region farms. Great for tea, cooking, and remedies.',
    category: 'Food',
    image: 'https://picsum.photos/seed/ginger/800/600',
    isMadeInGhana: true,
    vendorName: 'Mama\'s Kitchen',
    stock: 60,
    rating: 4.6
  },

  // Health & Wellness
  {
    id: '31',
    name: 'Moringa Capsules (60 tablets)',
    price: 95,
    description: '100% organic Moringa from Ghana. Boosts immunity, energy, and overall health.',
    category: 'Health',
    image: 'https://picsum.photos/seed/moringa/800/600',
    isMadeInGhana: true,
    vendorName: 'Green Leaf GH',
    stock: 50,
    rating: 4.6
  },
  {
    id: '32',
    name: 'Honey (500g) - Forest Honey',
    price: 85,
    description: 'Raw unprocessed forest honey from Brong-Ahafo. Pure and natural. Rich in antioxidants.',
    category: 'Health',
    image: 'https://picsum.photos/seed/honey/800/600',
    isMadeInGhana: true,
    vendorName: 'Forest Honey GH',
    stock: 30,
    rating: 4.9
  },
  {
    id: '33',
    name: 'Charcoal Teeth Whitening Powder',
    price: 45,
    description: 'Activated charcoal powder for natural teeth whitening. No chemicals. 30-day supply.',
    category: 'Health',
    image: 'https://picsum.photos/seed/charcoal/800/600',
    isMadeInGhana: true,
    vendorName: 'Natural Glow GH',
    stock: 40,
    rating: 4.3
  },

  // Jewelry & Accessories
  {
    id: '34',
    name: 'Ahenema Gold Pendant (18K)',
    price: 380,
    description: 'Handcrafted Ahenema (Golden Stool) pendant. 18K gold plated. Chain included.',
    category: 'Jewelry',
    image: 'https://picsum.photos/seed/ahenema/800/600',
    isMadeInGhana: true,
    vendorName: 'Royal Golds GH',
    stock: 5,
    rating: 4.9
  },
  {
    id: '35',
    name: 'Bone Allah Bracelet',
    price: 65,
    description: 'Carved bone bracelet with Allah calligraphy. Adjustable size. Prayer companion.',
    category: 'Jewelry',
    image: 'https://picsum.photos/seed/bracelet/800/600',
    isMadeInGhana: true,
    vendorName: 'Northern Beads',
    stock: 25,
    rating: 4.5
  },
  {
    id: '36',
    name: 'Gye Nyame Cufflinks',
    price: 120,
    description: 'Sterling silver Gye Nyame cufflinks. "Except God" — Ghana\'s most iconic symbol. Gift box included.',
    category: 'Jewelry',
    image: 'https://picsum.photos/seed/cufflinks/800/600',
    isMadeInGhana: true,
    vendorName: 'Royal Golds GH',
    stock: 10,
    rating: 4.8
  },

  // Kids & Baby
  {
    id: '37',
    name: 'Ankara Baby Set (0-6 months)',
    price: 95,
    description: 'Adorable Ankara baby outfit set. Includes romper, hat, and booties. 100% cotton.',
    category: 'Kids',
    image: 'https://picsum.photos/seed/babyset/800/600',
    isMadeInGhana: true,
    vendorName: 'Kiddy Styles GH',
    stock: 20,
    rating: 4.7
  },
  {
    id: '38',
    name: 'Wooden Educational Toys (Set of 5)',
    price: 140,
    description: 'Handmade Ghanaian wood toys. Includes puzzles, stacking rings, and shape sorters.',
    category: 'Kids',
    image: 'https://picsum.photos/seed/toys/800/600',
    isMadeInGhana: true,
    vendorName: 'Kumasi Craft',
    stock: 15,
    rating: 4.8
  },

  // Flash Deals
  {
    id: '39',
    name: 'LED Desk Lamp (Rechargeable)',
    price: 75,
    originalPrice: 120,
    description: '3-level brightness LED lamp. USB rechargeable. Perfect for students and remote workers.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/desklamp/800/600',
    isMadeInGhana: false,
    vendorName: 'TechHub Accra',
    stock: 25,
    rating: 4.4,
    isFlashDeal: true,
    dealEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '40',
    name: 'Travel Duffel Bag (Waterproof)',
    price: 110,
    originalPrice: 180,
    description: 'Large capacity travel bag. Waterproof. Perfect for market shopping and travel.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/duffel/800/600',
    isMadeInGhana: false,
    vendorName: 'Urban Carry GH',
    stock: 12,
    rating: 4.5,
    isFlashDeal: true,
    dealEndsAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
  },

  // Services
  {
    id: '41',
    name: 'Kente Fabric Installation (per yard)',
    price: 30,
    description: 'Professional Kente cloth mounting and installation service. For walls, frames, and displays.',
    category: 'Services',
    image: 'https://picsum.photos/seed/kenteservice/800/600',
    isMadeInGhana: true,
    vendorName: 'Adinkra Arts',
    stock: 999,
    rating: 4.9
  },
  {
    id: '42',
    name: 'Custom Ankara Tailoring (per outfit)',
    price: 150,
    description: 'Professional sewing of any Ankara design. 3-day delivery. Measurement included.',
    category: 'Services',
    image: 'https://picsum.photos/seed/tailoring/800/600',
    isMadeInGhana: true,
    vendorName: 'Sika Styles',
    stock: 999,
    rating: 4.7
  },

  // More products for variety
  {
    id: '43',
    name: 'Stadium Jersey - Ghana Black Stars (Adult)',
    price: 180,
    description: 'Official Ghana Black Stars home jersey. Available in S-XXL. Player edition available.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/jersey/800/600',
    isMadeInGhana: false,
    vendorName: 'SportsArena GH',
    stock: 30,
    rating: 4.6
  },
  {
    id: '44',
    name: 'Mosquito Repellent Coil (12 pieces)',
    price: 25,
    description: 'Fast-acting mosquito coil. Burns for 6-8 hours. Made in Ghana with natural pyrethrum.',
    category: 'Home',
    image: 'https://picsum.photos/seed/coil/800/600',
    isMadeInGhana: true,
    vendorName: 'Green Leaf GH',
    stock: 100,
    rating: 4.2
  },
  {
    id: '45',
    name: 'Wax Print Fabric (6 yards)',
    price: 135,
    description: 'Premium quality Ankara wax print fabric. 100% cotton. 6 yards per pack.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/ankara/800/600',
    isMadeInGhana: false,
    vendorName: 'AfroShop GH',
    stock: 50,
    rating: 4.5
  },
  {
    id: '46',
    name: 'Rechargeable Mosquito Bat',
    price: 65,
    description: 'Electric mosquito racket. USB rechargeable. Kills mosquitoes and flies instantly.',
    category: 'Home',
    image: 'https://picsum.photos/seed/mosquitobat/800/600',
    isMadeInGhana: false,
    vendorName: 'HomeTech GH',
    stock: 40,
    rating: 4.3
  },
  {
    id: '47',
    name: 'Coffee (Kea Coffee - 250g)',
    price: 90,
    description: 'Single-origin Ghanaian coffee from the Eastern Region. Roasted and ground. Rich and aromatic.',
    category: 'Food',
    image: 'https://picsum.photos/seed/coffee/800/600',
    isMadeInGhana: true,
    vendorName: 'Kea Coffee GH',
    stock: 30,
    rating: 4.8
  },
  {
    id: '48',
    name: 'Phone Case - Ghana Patterns',
    price: 45,
    description: 'Premium silicone case with Ghana kente and Adinkra designs. All phone models available.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/phonecase/800/600',
    isMadeInGhana: true,
    vendorName: 'Accra Crafts',
    stock: 60,
    rating: 4.4
  },
  {
    id: '49',
    name: 'Scented Candles (Set of 3)',
    price: 80,
    description: 'Hand-poured soy candles with Ghanaian scents: coconut, shea, and frangipani.',
    category: 'Home',
    image: 'https://picsum.photos/seed/candles/800/600',
    isMadeInGhana: true,
    vendorName: 'Volta Naturals',
    stock: 25,
    rating: 4.7
  },
  {
    id: '50',
    name: 'Solar Phone Charger (5W)',
    price: 110,
    description: 'Foldable solar panel phone charger. Works in all Ghana weather. Water resistant.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/solarcharge/800/600',
    isMadeInGhana: false,
    vendorName: 'EcoTech GH',
    stock: 20,
    rating: 4.5
  },
];

// ─── Wishlist stored in localStorage ───────────────────────────────────────
const WISHLIST_KEY = 'flowvender_wishlist';

export const getWishlist = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
};

export const toggleWishlist = (productId: string): boolean => {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx >= 0) {
    list.splice(idx, 1);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    return false;
  } else {
    list.push(productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    return true;
  }
};

// ─── Cart persisted in localStorage ────────────────────────────────────────
const CART_KEY = 'flowvender_cart';

export const getSavedCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// ─── Orders persisted in localStorage ──────────────────────────────────────
const ORDERS_KEY = 'flowvender_orders';

export const getSavedOrders = (): Order[] => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

// ─── Adapter implementation ────────────────────────────────────────────────

export const getFirebaseAdapter = (): DatabaseAdapter => {
  return {
    getProducts: async () => {
      log('Loading products from local seed data');
      return PRODUCTS;
    },

    getOrders: async () => {
      return getSavedOrders();
    },

    saveOrder: async (order: Order) => {
      const orders = getSavedOrders();
      orders.unshift(order);
      saveOrders(orders);
      log('Order saved:', order.id);
    },

    searchProducts: async (query: string): Promise<Product[]> => {
      const q = query.toLowerCase();
      return PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q)
      );
    },

    getFlashDeals: async (): Promise<Product[]> => {
      return PRODUCTS.filter(p => (p as any).isFlashDeal);
    },

    getMadeInGhana: async (): Promise<Product[]> => {
      return PRODUCTS.filter(p => p.isMadeInGhana);
    },

    getWishlistProducts: async (): Promise<Product[]> => {
      const ids = getWishlist();
      return PRODUCTS.filter(p => ids.includes(p.id));
    },

    isInWishlist: async (productId: string): Promise<boolean> => {
      return getWishlist().includes(productId);
    },

    toggleWishlist,
  };
};

// ─── Standalone query helpers (for use directly in components) ────────────────

export const getFlashDeals = async (): Promise<Product[]> => {
  return (await getFirebaseAdapter().getProducts()).filter(p => !!(p as any).isFlashDeal);
};

export const getMadeInGhanaProducts = async (): Promise<Product[]> => {
  return (await getFirebaseAdapter().getProducts()).filter(p => p.isMadeInGhana);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const q = query.toLowerCase();
  const all = await getFirebaseAdapter().getProducts();
  return all.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.vendorName.toLowerCase().includes(q)
  );
};
