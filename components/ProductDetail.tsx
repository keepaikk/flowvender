
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Fix: Added missing Truck import
import { ChevronLeft, ShoppingCart, Award, ShieldCheck, MessageCircle, PlayCircle, Star, Truck } from 'lucide-react';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';

interface ProductDetailProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiDescription, setAiDescription] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
       // Simple AI hook simulation
       setIsAiLoading(true);
       generateProductDescription(product.name, [product.category, product.vendorName, "Premium Quality"]).then(res => {
         setAiDescription(res);
         setIsAiLoading(false);
       });
    }
  }, [product]);

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 font-medium transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Market
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden border bg-white shadow-sm relative">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
             {product.isMadeInGhana && (
               <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                 <Award className="w-4 h-4" /> AUTHENTIC MADE IN GHANA
               </div>
             )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border cursor-pointer hover:border-blue-500 transition-all">
                <img src={`https://picsum.photos/seed/${product.id}${i}/200`} alt="Thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          {/* Unique Proposition: 10s Interview */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Product Spotlight Video</h4>
                <p className="text-sm text-gray-600">Watch a 10-second deep dive with the vendor.</p>
              </div>
            </div>
            <button className="text-blue-600 font-bold text-sm hover:underline">Watch Now</button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-600 tracking-widest uppercase">
            {product.category} &bull; Verified Vendor
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <Star className="w-5 h-5 fill-current" />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 text-sm">124 Reviews</span>
            <span className="text-gray-400">|</span>
            <span className="text-green-600 text-sm font-bold uppercase">{product.stock} in stock</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-8">
            GH₵ {product.price.toLocaleString()}
          </div>

          <div className="space-y-6 flex-grow">
            <div className="prose prose-blue text-gray-600 leading-relaxed">
              <p className="font-medium text-gray-900 mb-2">Vendor Story</p>
              <p>{product.description}</p>
            </div>

            {/* AI Generated Content Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-300 relative">
              <div className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                <Award className="w-3 h-3" /> AI Enhancement
              </div>
              {isAiLoading ? (
                <div className="animate-pulse flex space-y-2 flex-col">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : (
                <p className="text-sm italic text-gray-700">"{aiDescription}"</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <button 
                onClick={() => addToCart(product)}
                className="col-span-1 bg-blue-600 text-white h-14 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button className="col-span-1 border-2 border-gray-200 text-gray-700 h-14 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Chat Vendor
              </button>
            </div>
          </div>

          {/* Trust Factors */}
          <div className="mt-12 pt-8 border-t grid grid-cols-3 gap-4">
             <div className="text-center">
                <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-500 uppercase">Escrow Secure</p>
             </div>
             <div className="text-center">
                <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-500 uppercase">Tracked Delivery</p>
             </div>
             <div className="text-center">
                <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-500 uppercase">Quality Guaranteed</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
