import React from 'react';
import { 
  ShoppingBag, 
  Truck, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  CheckCircle2,
  Store,
  Globe,
  Heart
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-blue-700 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Empowering <span className="text-green-300">Ghanaian Businesses</span> to Thrive Online
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              FlowVender is more than a marketplace — we're building the infrastructure for Ghana's digital commerce future, one vendor at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            To democratize e-commerce in Ghana by providing small businesses with world-class online selling tools, secure payment systems, and reliable delivery solutions — all at affordable rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Store, title: 'Vendor Empowerment', desc: 'Low fees, high visibility, and training to help sellers succeed' },
            { icon: ShieldCheck, title: 'Secure Transactions', desc: 'Escrow payments protect both buyers and sellers on every order' },
            { icon: Truck, title: 'Reliable Delivery', desc: 'Multiple delivery options including courier, pickup, and on-demand' },
            { icon: Heart, title: 'Made in Ghana', desc: 'Championing local products and artisans across the country' }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-16">How FlowVender Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Vendors List Products', desc: 'Sellers create profiles, add product listings with photos and descriptions, set their prices, and choose delivery options.' },
              { step: '02', title: 'Buyers Shop Securely', desc: 'Customers browse the marketplace, add items to cart, and pay safely through our encrypted Paystack integration.' },
              { step: '03', title: 'Orders Get Delivered', desc: 'Products ship via trusted couriers or pickup points. Buyers confirm receipt, and vendors get paid via escrow release.' }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-extrabold text-green-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 right-0 translate-x-1/2">
                    <ArrowRight className="w-8 h-8 text-green-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Meet the Team</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          We're a passionate group of technologists, marketers, and logistics experts dedicated to transforming Ghanaian commerce.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Founder & CEO', role: 'Visionary leader driving our mission forward', initials: 'FK' },
            { name: 'Head of Operations', role: 'Ensuring smooth deliveries across Ghana', initials: 'KO' },
            { name: 'Vendor Success', role: 'Helping sellers maximize their potential', initials: 'EA' },
            { name: 'Technology Lead', role: 'Building robust systems for scale', initials: 'JM' },
            { name: 'Marketing Director', role: 'Spreading the FlowVender message nationwide', initials: 'SA' },
            { name: 'Customer Support', role: 'Ensuring every customer has a great experience', initials: 'AN' }
          ].map((member, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{member.initials}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold mb-6">Get in Touch</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have questions about FlowVender? Want to become a vendor or affiliate partner? We'd love to hear from you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-green-600/20 p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">hello@flowvender.ghana</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600/20 p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+233 30 200 1234</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600/20 p-3 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Office</p>
                    <p className="font-medium">Accra, Ghana</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-green-500"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                />
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
