"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronRight, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
  User,
  HelpCircle,
  FileText,
  Star,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const helpCategories = [
  {
    id: 'orders',
    title: 'Orders & Delivery',
    icon: ShoppingBag,
    description: 'Track orders, delivery info, and shipping questions',
    color: 'bg-blue-500',
    articles: [
      'How to track my order',
      'Delivery times and areas',
      'What if my order is delayed?',
      'Changing delivery address',
      'Delivery fees and options',
      'Order confirmation issues'
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    icon: CreditCard,
    description: 'Payment methods, billing, and transaction issues',
    color: 'bg-green-500',
    articles: [
      'Accepted payment methods',
      'Payment security and safety',
      'Failed payment troubleshooting',
      'Refund processing times',
      'Invoice and receipt queries',
      'Payment plan options'
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: RotateCcw,
    description: 'Return policy, refund process, and exchanges',
    color: 'bg-orange-500',
    articles: [
      'How to return an item',
      'Return policy and conditions',
      'Refund processing times',
      'Exchange procedures',
      'Return shipping costs',
      'Damaged item returns'
    ]
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: User,
    description: 'Account settings, profile, and login issues',
    color: 'bg-purple-500',
    articles: [
      'Creating an account',
      'Password reset help',
      'Update personal information',
      'Account security settings',
      'Email preferences',
      'Delete my account'
    ]
  },
  {
    id: 'products',
    title: 'Products & Stock',
    icon: Star,
    description: 'Product information, availability, and specifications',
    color: 'bg-pink-500',
    articles: [
      'Product specifications',
      'Stock availability',
      'Product warranty info',
      'Size guides and charts',
      'Product reviews and ratings',
      'Request new products'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: Shield,
    description: 'Website issues, app problems, and technical help',
    color: 'bg-indigo-500',
    articles: [
      'Website not loading properly',
      'Mobile app issues',
      'Browser compatibility',
      'Clear cache and cookies',
      'Accessibility features',
      'System requirements'
    ]
  }
];

const popularArticles = [
  {
    title: 'How to track my order',
    category: 'Orders & Delivery',
    icon: Truck,
    slug: 'how-to-track-my-order'
  },
  {
    title: 'Return policy and conditions',
    category: 'Returns & Refunds',
    icon: RotateCcw,
    slug: 'return-policy-and-conditions'
  },
  {
    title: 'Accepted payment methods',
    category: 'Payments & Billing',
    icon: CreditCard,
    slug: 'accepted-payment-methods'
  },
  {
    title: 'Delivery times and areas',
    category: 'Orders & Delivery',
    icon: Clock,
    slug: 'delivery-times-and-areas'
  },
  {
    title: 'How to create an account',
    category: 'Account & Profile',
    icon: User,
    slug: 'how-to-create-an-account'
  },
  {
    title: 'Product warranty information',
    category: 'Products & Stock',
    icon: Shield,
    slug: 'product-warranty-information'
  }
];

const contactMethods = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    availability: 'Available 24/7',
    icon: MessageCircle,
    color: 'bg-green-500',
    action: 'Start Chat'
  },
  {
    title: 'Phone Support',
    description: 'Call us for immediate help',
    availability: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    icon: Phone,
    color: 'bg-blue-500',
    action: 'Call +27 11 123 4567'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24 hours',
    icon: Mail,
    color: 'bg-purple-500',
    action: 'Send Email'
  }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#000000] to-[#4A4A4A] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Help Center</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Find answers to your questions, get support, and learn more about shopping with eXobe
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 py-4 text-lg rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-[#C8102E] bg-white text-[#000000] placeholder-gray-500 shadow-lg"
              />
              <Search className="absolute right-5 top-4 h-6 w-6 text-[#4A4A4A]" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Articles */}
        {!searchQuery && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">Popular Help Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => {
                const IconComponent = article.icon;
                return (
                  <Link key={index} href={`/help-center/${article.slug}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#F6E2E0] rounded-lg flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                            <IconComponent className="h-6 w-6 text-[#C8102E] group-hover:text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#000000] mb-2 group-hover:text-[#C8102E] transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-sm text-[#4A4A4A]">{article.category}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#C8102E] transition-colors" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Help Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">
            {searchQuery ? 'Search Results' : 'Browse by Category'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchQuery ? filteredCategories : helpCategories).map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group cursor-pointer">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#000000] group-hover:text-[#C8102E] transition-colors">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[#4A4A4A] mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.articles.slice(0, 3).map((article, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-[#4A4A4A] hover:text-[#C8102E] transition-colors cursor-pointer">
                        <ChevronRight className="h-4 w-4" />
                        <span>{article}</span>
                      </div>
                    ))}
                    {category.articles.length > 3 && (
                      <div className="text-sm text-[#C8102E] font-medium mt-3">
                        +{category.articles.length - 3} more articles
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Still need help?</h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Our friendly support team is here to help you with any questions or issues you might have.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                    <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-2">{method.title}</h3>
                    <p className="text-[#4A4A4A] mb-3">{method.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{method.availability}</p>
                    <button className="bg-[#C8102E] text-white px-6 py-2 rounded-full font-medium hover:bg-[#A00E26] transition-colors">
                      {method.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Quick Links</h2>
              <p className="text-lg text-[#4A4A4A]">
                Fast access to commonly needed information and services
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: 'Order Status', icon: Truck, link: '/orders' },
                { title: 'Return Item', icon: RotateCcw, link: '/returns' },
                { title: 'Track Package', icon: Search, link: '/tracking' },
                { title: 'My Account', icon: User, link: '/account' },
                { title: 'Wishlist', icon: Star, link: '/wishlist' },
                { title: 'Payment Methods', icon: CreditCard, link: '/payment' },
                { title: 'Shipping Info', icon: Clock, link: '/shipping' },
                { title: 'Contact Us', icon: Phone, link: '/contact' }
              ].map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link key={index} href={link.link}>
                    <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 group cursor-pointer">
                      <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-[#000000] group-hover:text-[#C8102E] transition-colors">
                        {link.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section>
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-[#4A4A4A]">
                Quick answers to the most common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does delivery take?",
                  answer: "Standard delivery takes 2-5 business days within South Africa. Express delivery is available for next-day delivery in major cities."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached."
                },
                {
                  question: "Do you offer international shipping?",
                  answer: "Currently, we only ship within South Africa. International shipping will be available soon."
                },
                {
                  question: "How can I track my order?",
                  answer: "You'll receive a tracking number via email once your order ships. Use this to track your package on our website."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, EFT, SnapScan, and Buy Now Pay Later options."
                },
                {
                  question: "Is my payment information secure?",
                  answer: "Yes, we use industry-standard SSL encryption and PCI DSS compliance to protect your payment information."
                }
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
                  <h3 className="font-semibold text-[#000000] mb-3 flex items-center">
                    <HelpCircle className="h-5 w-5 text-[#C8102E] mr-2" />
                    {faq.question}
                  </h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/faq">
                <button className="bg-[#000000] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4A4A4A] transition-colors">
                  View All FAQs
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
