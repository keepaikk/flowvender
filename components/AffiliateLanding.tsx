
import React from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Video, 
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

const AffiliateLanding: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 text-white py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-8 flex items-center gap-2">
            <Users className="w-4 h-4" /> STUDENT & YOUTH PROGRAM
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 max-w-4xl leading-tight">
            Earn by Sharing. <br /><span className="text-blue-400">Master Digital Sales.</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-12 leading-relaxed">
            Join the Flow Vendor Affiliate Program. For a small entry fee, get trained by experts and start earning commissions by promoting quality "Made in Ghana" products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl">
              Apply Now (GH₵ 50.00)
            </button>
            <button className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              Watch Training Preview
            </button>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why Become a Flow Affiliate?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Our performance-based model provides students and youngsters with a low-risk way to learn digital marketing and build income.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="bg-blue-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">Comprehensive Training</h3>
            <p className="text-gray-600 leading-relaxed">Your GH₵ 50 enrollment fee covers an intensive session on digital marketing, product knowledge, and maximizing commissions.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-green-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Commission Model</h3>
            <p className="text-gray-600 leading-relaxed">Earn high-percentage commissions on every successfully marketed product. Special bonuses for high-demand items.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Ethical Guidelines</h3>
            <p className="text-gray-600 leading-relaxed">Learn to market with integrity. Our program adheres to strict ethical and regulatory compliance to protect you and our customers.</p>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="bg-white p-4 rounded-[40px] shadow-2xl relative">
                <div className="aspect-video bg-gray-900 rounded-[30px] overflow-hidden flex items-center justify-center">
                   <Video className="w-20 h-20 text-white/20 animate-pulse" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-3xl font-bold">10+ Hrs</p>
                  <p className="text-sm opacity-80">Video Training Modules</p>
                </div>
             </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">Expert Training for <span className="text-blue-600">Future Marketers.</span></h2>
            <p className="text-gray-600 text-lg">Our curriculum is designed by professionals who understand the Ghanaian digital landscape.</p>
            <ul className="space-y-4">
              {[
                "Digital Marketing Techniques (Social, Email, Content)",
                "Product Identification and Market Research",
                "Customer Engagement & Closing Strategies",
                "Performance Tracking and Analytics Usage",
                "Compliance and Ethics Training"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                  <span className="font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
               <button className="flex items-center gap-2 text-blue-600 font-bold text-lg hover:underline">
                 Download Full Curriculum <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-8" />
          <h2 className="text-4xl font-extrabold mb-6">Invest in Your Potential Today</h2>
          <p className="text-xl text-gray-600 mb-12">The joining fee is an investment in your skills. Join hundreds of students already earning on Flow Market.</p>
          <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-extrabold text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1">
            Pay GH₵ 50 & Start Training
          </button>
          <p className="mt-6 text-sm text-gray-400">Secured via Paystack & Flow Escrow System</p>
        </div>
      </section>
    </div>
  );
};

export default AffiliateLanding;
