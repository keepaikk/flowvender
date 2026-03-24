
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Fix: Added missing ShoppingCart, ShieldCheck, Truck, and Users imports
import { Search, TrendingUp, Award, Filter, Star, ShoppingCart, ShieldCheck, Truck, Users } from 'lucide-react';
import { Product } from '../types';

interface MarketViewProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const MarketView: React.FC<MarketViewProps> = ({ products, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Beauty', 'Electronics', 'Home'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center bg-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              Empowering Small Businesses in Ghana
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Traditional Markets, <span className="text-yellow-400">Digital Flow.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              Secure escrow payments, verified vendors, and flexible delivery modes designed specifically for your peace of mind.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors">
                Start Shopping
              </button>
              <Link to="/affiliates" className="bg-blue-500 bg-opacity-30 border border-blue-400 text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-40 transition-colors">
                Join Affiliates
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
             <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-30 rounded-full"></div>
             <img 
               src="https://picsum.photos/seed/market/600/400" 
               alt="Marketplace" 
               className="rounded-3xl shadow-2xl border-4 border-white border-opacity-20 relative z-10"
             />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search products or vendors..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-600" /> Discover Trending
          </h2>
          <Link to="/" className="text-blue-600 font-medium hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isMadeInGhana && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded flex items-center gap-1 shadow-md">
                    <Award className="w-3 h-3" /> Made in Ghana
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {product.rating}
                </div>
              </Link>
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.category}</p>
                </div>
                <Link to={`/product/${product.id}`} className="block text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 line-clamp-1">
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-900">GH₵ {product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-100 text-gray-900 p-2 rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-500">By <span className="font-medium text-gray-700">{product.vendorName}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-gray-100 inline-block p-6 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Value Prop Banner */}
      <div className="bg-white border-y py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Escrow Protection</h4>
              <p className="text-sm text-gray-600">Your money is held securely and only released when you confirm receipt.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-green-100 p-3 rounded-2xl">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Flexible Delivery</h4>
              <p className="text-sm text-gray-600">Choose from courier partners, self-pickup, or on-demand services like Bolt.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-purple-100 p-3 rounded-2xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Affiliate Network</h4>
              <p className="text-sm text-gray-600">Trained student affiliates helping vendors reach a wider audience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketView;
