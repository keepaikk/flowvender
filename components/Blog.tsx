import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Tips for Ghanaian Small Businesses to Succeed in E-Commerce',
    excerpt: 'Selling online in Ghana comes with unique challenges. Here are proven strategies to help your business thrive on FlowVender and beyond.',
    content: `Selling online in Ghana presents incredible opportunities, but also unique challenges. From logistics to payment collection, the landscape requires specific strategies.

Here are our top 5 tips:

**1. High-Quality Product Photos**
Your product images are your first impression. Use natural lighting, show multiple angles, and include the product in context. Customers can't touch your products online, so your photos need to do the work.

**2. Competitive Pricing with Shipping Transparency**
Research your competitors and price accordingly. Always be clear about shipping costs and delivery times. Hidden fees are the #1 reason for cart abandonment.

**3. Build Trust with Complete Descriptions**
Include all relevant details: dimensions, materials, care instructions, and what's included. The more information, the more confident your buyer.

**4. Respond Quickly to Inquiries**
Use the messaging feature on FlowVender to respond within hours, not days. Quick, helpful responses build trust and increase sales.

**5. Encourage Reviews**
After delivery, encourage happy customers to leave reviews. Social proof is powerful, and positive reviews lead to more sales.

By implementing these strategies, you'll be well on your way to e-commerce success in Ghana.`,
    author: 'FlowVender Team',
    date: '2026-03-15',
    readTime: '5 min read',
    category: 'Business Tips',
    image: 'ecommerce'
  },
  {
    id: '2',
    title: 'Understanding Escrow Payments: Why Your Money is Safe',
    excerpt: 'FlowVender uses escrow payments to protect both buyers and sellers. Learn how this system works and why it matters for Ghanaian commerce.',
    content: `In traditional e-commerce, there's always risk. Buyers worry about paying for items that never arrive. Sellers worry about shipping products to strangers who might not pay.

Escrow payments solve this problem.

**How Escrow Works on FlowVender:**

1. Buyer selects items and proceeds to checkout
2. Payment is collected and held securely (not given to the seller)
3. Seller receives notification and ships the product
4. Buyer confirms receipt of the product
5. Funds are released to the seller

**Why This Matters:**

- **For Buyers:** Your money is protected until you confirm the product arrived in acceptable condition
- **For Sellers:** You know the buyer has paid before you ship
- **For Both:** Disputes can be resolved fairly since funds are held by a trusted intermediary

This system builds trust in Ghanaian e-commerce, enabling more transactions and healthier business relationships.

FlowVender's escrow is powered by Paystack, Nigeria's leading payment processor (now part of Stripe), ensuring bank-grade security for all transactions.`,
    author: 'FlowVender Team',
    date: '2026-03-10',
    readTime: '4 min read',
    category: 'Security',
    image: 'security'
  },
  {
    id: '3',
    title: 'How to Take Great Product Photos with Your Phone',
    excerpt: 'You don\'t need expensive equipment to capture stunning product photos. Here\'s how to use your smartphone like a pro.',
    content: `Great product photography doesn't require a DSLR camera. With modern smartphones, you can capture professional-looking images that sell.

**Essential Tips:**

**1. Lighting is Everything**
Natural light is your best friend. Set up near a window and avoid harsh direct sunlight. The best time is early morning or late afternoon.

**2. Use a Simple Background**
White or light-colored backgrounds work best for most products. You can use a plain wall, a white bedsheet, or create a simple setup with paper.

**3. Stabilize Your Shot**
Use both hands or prop your phone against something solid. Blurry photos look unprofessional.

**4. Multiple Angles**
Take at least 3 photos: front, side, and detail shot. Show the product in use if possible.

**5. Edit Lightly**
Basic editing (brightness, contrast) is fine, but don't over-filter. Customers want to see the真实 product.

**Free Apps for Editing:**
- Snapseed (iOS/Android)
- VSCO (iOS/Android)
- Lightroom Mobile (iOS/Android)

Remember: your photos represent your brand. Invest time in making them great, and watch your sales increase.`,
    author: 'Vendor Success Team',
    date: '2026-03-05',
    readTime: '6 min read',
    category: 'Photography',
    image: 'photo'
  },
  {
    id: '4',
    title: 'Made in Ghana: Celebrating Local Products and Artisans',
    excerpt: 'From Kente cloth to shea butter, Ghanaian products have global appeal. Learn how FlowVender is championing local artisans.',
    content: `Ghana has a rich tradition of craftsmanship. From the intricate weaving of Kente cloth in the Volta Region to the smooth texture of Northern Ghana shea butter, our products tell stories of heritage and quality.

**Why Buy Made in Ghana?**

1. **Quality:** Traditional methods often produce superior products
2. **Supporting Local Economy:** Your purchase directly supports Ghanaian families
3. **Unique Products:** Mass-produced items can't match the character of handcrafted goods
4. **Sustainability:** Local products often have smaller carbon footprints

**Popular Categories on FlowVender:**

- **Textiles:** Kente, smock, and Ankara prints
- **Beauty & Skincare:** Shea butter, black soap, and natural oils
- **Food & Beverages:** Groundnut, gari, and traditional spices
- **Arts & Crafts:** Beadwork, carvings, and pottery

At FlowVender, we're committed to showcasing Ghanaian products. Our "Made in Ghana" badge helps customers identify locally-sourced items, and our lower commission rates for local artisans make it easier to compete with imported goods.

Every purchase is a vote for Ghanaian craftsmanship.`,
    author: 'FlowVender Team',
    date: '2026-02-28',
    readTime: '5 min read',
    category: 'Made in Ghana',
    image: 'ghana'
  },
  {
    id: '5',
    title: 'Delivery Options in Ghana: What Works Best for Your Business',
    excerpt: 'From courier services to self-pickup, explore the delivery options available for FlowVender vendors and find what works for you.',
    content: `One of the biggest challenges for e-commerce in Ghana is last-mile delivery. Here's a breakdown of the options:

**1. Dedicated Courier Partners**
We partner with established courier services across Ghana. Pros: Trackable, relatively reliable. Cons: Can be expensive for large items.

**2. Self-Pickup Points**
Vendors can designate pickup locations in their area. Pros: Lower cost, no delivery headaches. Cons: Limited customer reach.

**3. On-Demand Delivery (Uber/Bolt)**
For urgent or local deliveries. Pros: Fast, flexible. Cons: Best for same-day only.

**4. Customer Pickup**
Meet customers directly. Pros: Zero shipping cost. Cons: Requires coordination, limited to your area.

**Tips for Success:**

- Offer at least 2 delivery options
- Be transparent about delivery times
- Package products securely
- Communicate proactively with customers

FlowVender is continuously expanding our delivery network. Stay tuned for exciting partnerships that will make shipping even easier for Ghanaian businesses.`,
    author: 'Operations Team',
    date: '2026-02-20',
    readTime: '4 min read',
    category: 'Logistics',
    image: 'delivery'
  }
];

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Business Tips': 'bg-blue-100 text-blue-700',
    'Security': 'bg-green-100 text-green-700',
    'Photography': 'bg-purple-100 text-purple-700',
    'Made in Ghana': 'bg-orange-100 text-orange-700',
    'Logistics': 'bg-gray-100 text-gray-700'
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

const Blog: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-blue-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">FlowVender Blog</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Tips, insights, and news to help Ghanaian businesses succeed in e-commerce.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image placeholder */}
              <div className={`h-48 bg-gradient-to-br ${
                post.image === 'ecommerce' ? 'from-blue-400 to-blue-600' :
                post.image === 'security' ? 'from-green-400 to-green-600' :
                post.image === 'photo' ? 'from-purple-400 to-purple-600' :
                post.image === 'ghana' ? 'from-orange-400 to-red-500' :
                'from-gray-400 to-gray-600'
              } flex items-center justify-center`}>
                <span className="text-white/30 text-6xl font-bold">{post.title[0]}</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <span className="text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export { blogPosts };
export default Blog;
