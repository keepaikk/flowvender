
import React, { useState, useEffect } from 'react';
import { DatabaseType, getActiveDatabaseType, setActiveDatabaseType } from '../services/dbLayer';
import { getPostgresConfig, setPostgresConfig } from '../services/postgresAdapter';
import { 
  Plus, 
  LayoutDashboard, 
  Package, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  MoreHorizontal,
  ChevronRight,
  Globe,
  Sparkles,
  Database
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const VendorDashboard: React.FC = () => {
  const [dbType, setDbType] = useState<DatabaseType>('firebase');
  const [pgUrl, setPgUrl] = useState('');

  useEffect(() => {
    setDbType(getActiveDatabaseType());
    setPgUrl(getPostgresConfig());
  }, []);

  const handleSaveDb = () => {
    setActiveDatabaseType(dbType);
    setPostgresConfig(pgUrl);
    alert('Database settings saved! The application will refresh.');
    window.location.reload();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Vendor Hub</h1>
            <p className="text-gray-500">Welcome back, <span className="font-bold text-blue-600">Northern Gold</span></p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white text-gray-700 border border-gray-200 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-all">
               <Globe className="w-5 h-5" /> Analytics
             </button>
             <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg transition-all">
               <Plus className="w-5 h-5" /> Post New Product
             </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Sales', value: 'GH₵ 42,500', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100', change: '+12.5%' },
            { label: 'Active Orders', value: '28', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', change: '+4' },
            { label: 'Followers', value: '1,240', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', change: '+18' },
            { label: 'Revenue Share', value: '88%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100', change: 'Steady' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-8">
             <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-xl">Sales Performance</h3>
               <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium outline-none">
                 <option>Last 7 Days</option>
                 <option>Last 30 Days</option>
               </select>
             </div>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={MOCK_DATA}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                   <YAxis hide />
                   <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                   <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* AI Recommendations for Vendors */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl p-8 flex flex-col">
             <div className="flex items-center gap-2 mb-6">
               <Sparkles className="w-6 h-6 text-yellow-300" />
               <h3 className="font-bold text-xl">FlowMarket AI Insights</h3>
             </div>
             <div className="space-y-6 flex-grow">
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                 <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Inventory Alert</p>
                 <p className="text-sm">"Your 'Organic Shea Butter (500g)' is trending in Accra. Restock soon to avoid missing GH₵ 2,400 in potential sales."</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                 <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Marketing Tip</p>
                 <p className="text-sm">"Products with 10-second videos see 40% higher conversion. Record a spotlight for your new 'Volta Kente' collection."</p>
               </div>
             </div>
             <button className="mt-8 bg-yellow-400 text-blue-900 py-3 rounded-2xl font-bold text-sm hover:bg-yellow-300 transition-colors">
               Optimize My Shop
             </button>
          </div>
        </div>

        {/* Database Settings Panel */}
        <div className="bg-white rounded-3xl border shadow-sm p-8 mb-10 border-blue-200">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-xl">Database Configuration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Database Type</label>
              <select 
                value={dbType} 
                onChange={e => setDbType(e.target.value as DatabaseType)}
                className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 ring-blue-500"
              >
                <option value="firebase">Firebase (Primary SDK)</option>
                <option value="postgres">PostgreSQL (REST API Backup)</option>
              </select>
            </div>
            {dbType === 'postgres' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">PostgreSQL API URL</label>
                <input 
                  type="text" 
                  value={pgUrl}
                  onChange={e => setPgUrl(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 ring-blue-500"
                  placeholder="https://api.example.com/postgres"
                />
              </div>
            )}
          </div>
          <button 
            onClick={handleSaveDb}
            className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Save Database Config & Reload
          </button>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b flex justify-between items-center">
            <h3 className="font-bold text-xl">Recent Orders</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: '#FVM-1289', customer: 'Kwesi Amoako', amount: 'GH₵ 850', status: 'Processing' },
                  { id: '#FVM-1288', customer: 'Ama Serwaa', amount: 'GH₵ 1,200', status: 'Shipped' },
                  { id: '#FVM-1287', customer: 'Joe Blankson', amount: 'GH₵ 250', status: 'Delivered' }
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-blue-600">{order.id}</td>
                    <td className="px-8 py-4 font-medium">{order.customer}</td>
                    <td className="px-8 py-4 font-bold">{order.amount}</td>
                    <td className="px-8 py-4">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-gray-400 cursor-pointer">
                      <MoreHorizontal className="w-5 h-5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
