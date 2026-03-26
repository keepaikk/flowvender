import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, User } from 'lucide-react';
import { blogPosts } from './Blog';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-700 font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

  const getGradient = (image: string): string => {
    const gradients: Record<string, string> = {
      'ecommerce': 'from-blue-400 to-blue-600',
      'security': 'from-green-400 to-green-600',
      'photo': 'from-purple-400 to-purple-600',
      'ghana': 'from-orange-400 to-red-500',
      'delivery': 'from-gray-400 to-gray-600'
    };
    return gradients[image] || 'from-gray-400 to-gray-600';
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${getGradient(post.image)} text-white py-20 px-4`}>
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              getCategoryColor(post.category).replace('bg-', 'bg-white/20 ').replace('text-', 'text-white ')
            }`}>
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <article className="flex-1">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Handle headers
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace(/\*\*/g, '')}</h3>;
                }
                // Handle list items
                if (paragraph.includes('\n')) {
                  const items = paragraph.split('\n').filter(item => item.trim());
                  return (
                    <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700 leading-relaxed">
                          {item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Regular paragraph
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Share this article:</span>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{post.author.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{post.author}</p>
                  <p className="text-gray-600 text-sm">FlowVender Content Team</p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64">
            <div className="sticky top-24 space-y-8">
              {/* Related Posts */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-4">More Articles</h4>
                <div className="space-y-4">
                  {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(p => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="block group">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                        {p.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 p-6 rounded-2xl text-white">
                <h4 className="font-bold mb-2">Start Selling Today</h4>
                <p className="text-sm text-white/80 mb-4">Join thousands of Ghanaian vendors on FlowVender.</p>
                <Link 
                  to="/vendor"
                  className="block bg-white text-green-700 text-center py-2 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                >
                  Vendor Dashboard
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
