"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  User, 
  Shield, 
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Breadcrumb, PageHeader } from '../../components';

const faqCategories = [
  {
    id: 'orders',
    title: 'Orders & Delivery',
    icon: ShoppingBag,
    color: 'bg-blue-500',
    questions: [
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3-5 business days within South Africa. Express delivery (1-2 days) and same-day delivery (4-6 hours in major cities) are also available. Free standard delivery on orders over R499."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package on our website or through the courier's tracking system. You'll also receive SMS updates on delivery progress."
      },
      {
        question: "What if I'm not home for delivery?",
        answer: "Our couriers will attempt delivery up to 3 times. If unsuccessful, your package will be held at the nearest collection point for 7 days. You'll receive notification with collection details."
      },
      {
        question: "Can I change my delivery address after ordering?",
        answer: "You can change your delivery address within 2 hours of placing your order by contacting our support team. Once the order has been dispatched, address changes are not possible."
      },
      {
        question: "Do you deliver to rural areas?",
        answer: "Yes, we deliver nationwide across South Africa, including rural areas. Delivery to remote areas may take 5-7 business days and may incur additional fees. Collection points are often faster for rural deliveries."
      },
      {
        question: "What are your delivery hours?",
        answer: "Standard delivery: Monday-Friday 8AM-5PM, Saturday 8AM-1PM. Express and same-day delivery: Monday-Friday 8AM-6PM, Saturday 8AM-2PM. No deliveries on Sundays or public holidays."
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    icon: CreditCard,
    color: 'bg-green-500',
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards (Visa, Mastercard, American Express), EFT, mobile payments (SnapScan, Zapper, Google Pay), and Buy Now Pay Later options (PayJustNow, Mobicred)."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use SSL encryption, are PCI DSS compliant, and implement 3D Secure authentication. We never store your full card details on our servers - all payments are processed through certified payment partners."
      },
      {
        question: "Why was my payment declined?",
        answer: "Common reasons include insufficient funds, incorrect card details, or bank restrictions on online purchases. Contact your bank to authorise online transactions, or try a different payment method."
      },
      {
        question: "How long do EFT payments take to process?",
        answer: "Instant EFT payments are processed immediately. Manual EFT payments can take 24-48 hours to clear. Your order will only be dispatched once payment is confirmed."
      },
      {
        question: "Can I get an invoice for my purchase?",
        answer: "Yes, you'll receive a tax invoice via email after your order is confirmed. You can also download invoices from your account under 'My Orders'. VAT-registered businesses can request formal tax invoices."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we partner with PayJustNow (3 interest-free payments) and Mobicred for flexible payment options. Approval is subject to credit checks and terms and conditions apply."
      }
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: RotateCcw,
    color: 'bg-orange-500',
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached, unopened, and in original packaging. Proof of purchase is required."
      },
      {
        question: "How do I return an item?",
        answer: "Log into your account, go to 'My Orders', find the item and click 'Return Item'. Select your reason, print the prepaid return label, and send the item back. We'll process your refund within 5-7 business days of receiving the returned item."
      },
      {
        question: "What items cannot be returned?",
        answer: "Personal care items, underwear, swimwear, customised products, digital downloads, and gift cards cannot be returned for hygiene and policy reasons. Items damaged by misuse are also not eligible."
      },
      {
        question: "How long do refunds take?",
        answer: "Refunds are processed within 5-7 business days after we receive and inspect your returned item. Credit/debit card refunds take 5-7 business days, EFT refunds take 2-3 days, and store credit is immediate."
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer: "Yes, we offer exchanges for different sizes, colours, or styles of the same product, subject to availability. Price differences will be charged or refunded accordingly."
      },
      {
        question: "Who pays for return shipping?",
        answer: "Return shipping is free for defective items. For other returns, you can use our prepaid return label (cost deducted from refund) or arrange your own shipping."
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: User,
    color: 'bg-purple-500',
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' in the top navigation, fill in your details (email, name, mobile, password), verify your email address, and you're ready to shop! You can also create an account during checkout."
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
      },
      {
        question: "How do I update my personal information?",
        answer: "Log into your account and go to 'My Profile'. You can update your name, email, mobile number, addresses, and communication preferences. Don't forget to save your changes!"
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can request account deletion by contacting our support team. Please note that this action is permanent and you'll lose access to order history, wishlists, and stored information."
      },
      {
        question: "Why should I create an account?",
        answer: "Account benefits include faster checkout, order tracking, wishlist functionality, exclusive member offers, and easy access to your purchase history and returns."
      },
      {
        question: "How do I change my email preferences?",
        answer: "In your account settings, go to 'Communication Preferences' to manage newsletter subscriptions, promotional emails, and order notifications. You can unsubscribe from marketing emails anytime."
      }
    ]
  },
  {
    id: 'products',
    title: 'Products & Stock',
    icon: Shield,
    color: 'bg-pink-500',
    questions: [
      {
        question: "How do I know if an item is in stock?",
        answer: "Stock availability is shown on each product page. 'In Stock' means immediate dispatch, 'Limited Stock' means few items left, and 'Out of Stock' means currently unavailable. You can set notifications for restocked items."
      },
      {
        question: "Do you offer warranties on products?",
        answer: "Yes, all products come with manufacturer warranties ranging from 6-24 months depending on the category. We also offer our eXobe Quality Guarantee and optional extended warranty coverage."
      },
      {
        question: "How do I find the right size?",
        answer: "Each product page includes detailed size guides and measurements. For clothing and shoes, refer to our size charts. If you're unsure, our customer service team can help with sizing recommendations."
      },
      {
        question: "Can I request a product that's not available?",
        answer: "Absolutely! Contact us with product details and we'll try to source it for you. Popular requests may be added to our regular inventory. We'll notify you if we can fulfill your request."
      },
      {
        question: "How do I know if a product is authentic?",
        answer: "We only sell authentic products from authorised suppliers and official brand partners. All items come with proper documentation and warranties. Counterfeit products are never tolerated."
      },
      {
        question: "What if I receive a damaged or defective item?",
        answer: "Contact us immediately with photos of the damage. We'll arrange a free return and provide a full refund or replacement. Defective items are covered under our quality guarantee regardless of the return period."
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: HelpCircle,
    color: 'bg-indigo-500',
    questions: [
      {
        question: "The website isn't loading properly. What should I do?",
        answer: "Try refreshing the page, clearing your browser cache, or using a different browser. Ensure you have a stable internet connection. If issues persist, contact our technical support team."
      },
      {
        question: "I'm having trouble placing an order. How can I get help?",
        answer: "Common issues include payment problems or address validation errors. Try using a different payment method or browser. Our live chat support can assist you in completing your order."
      },
      {
        question: "Can I shop on mobile devices?",
        answer: "Yes! Our website is fully optimised for mobile devices and tablets. For the best experience, use the latest version of your mobile browser or consider using our mobile app when available."
      },
      {
        question: "Do you have a mobile app?",
        answer: "We're currently developing our mobile app for iOS and Android. In the meantime, our mobile website provides a great shopping experience with all the same features."
      },
      {
        question: "How do I enable cookies?",
        answer: "Cookies are required for shopping cart functionality. In your browser settings, ensure cookies are enabled for exobe.africa. Instructions vary by browser - contact us if you need specific help."
      },
      {
        question: "What browsers do you support?",
        answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, please ensure your browser is up to date. Internet Explorer is not supported."
      }
    ]
  }
];

const quickLinks = [
  { title: 'Track Order', icon: Truck, link: '/help-center/how-to-track-my-order' },
  { title: 'Returns', icon: RotateCcw, link: '/help-center/return-policy-and-conditions' },
  { title: 'Payment Methods', icon: CreditCard, link: '/help-center/accepted-payment-methods' },
  { title: 'Create Account', icon: User, link: '/help-center/how-to-create-an-account' },
  { title: 'Delivery Info', icon: Truck, link: '/help-center/delivery-times-and-areas' },
  { title: 'Warranties', icon: Shield, link: '/help-center/product-warranty-information' }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    category.questions.length > 0 && 
    (selectedCategory === '' || category.id === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#000000] to-[#4A4A4A] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Help Centre', href: '/help-center' },
              { label: 'FAQ', isCurrentPage: true }
            ]}
            variant="centered"
            className="mb-6"
          />

          <PageHeader
            title="Frequently Asked Questions"
            iconComponent={HelpCircle}
            variant="centered"
            size="large"
            className="text-4xl lg:text-6xl"
          />
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Find quick answers to the most common questions about shopping with eXobe
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 py-4 text-lg rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-[#C8102E] bg-white text-[#000000] placeholder-gray-500 shadow-lg"
              />
              <Search className="absolute right-5 top-4 h-6 w-6 text-[#4A4A4A]" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === ''
                    ? 'bg-[#C8102E] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Categories
              </button>
              {faqCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-[#C8102E] text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        {!searchQuery && selectedCategory === '' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link key={index} href={link.link}>
                    <div className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-200 hover:border-[#C8102E]">
                      <div className="w-12 h-12 bg-[#F6E2E0] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C8102E] transition-colors">
                        <IconComponent className="h-6 w-6 text-[#C8102E] group-hover:text-white" />
                      </div>
                      <p className="text-sm font-medium text-[#000000] group-hover:text-[#C8102E] transition-colors">
                        {link.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ Categories */}
        <section>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#000000] mb-2">No results found</h3>
              <p className="text-[#4A4A4A] mb-6">
                Try adjusting your search terms or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Category Header */}
                    <div className="p-6 lg:p-8 border-b border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">{category.title}</h2>
                          <p className="text-[#4A4A4A]">{category.questions.length} questions</p>
                        </div>
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="divide-y divide-gray-200">
                      {category.questions.map((faq, index) => {
                        const key = `${category.id}-${index}`;
                        const isOpen = openQuestions[key];
                        
                        return (
                          <div key={index} className="p-6 lg:p-8">
                            <button
                              onClick={() => toggleQuestion(category.id, index)}
                              className="w-full flex items-center justify-between text-left group"
                            >
                              <h3 className="text-lg font-semibold text-[#000000] group-hover:text-[#C8102E] transition-colors pr-4">
                                {faq.question}
                              </h3>
                              <div className="flex-shrink-0">
                                {isOpen ? (
                                  <ChevronUp className="h-6 w-6 text-[#4A4A4A] group-hover:text-[#C8102E] transition-colors" />
                                ) : (
                                  <ChevronDown className="h-6 w-6 text-[#4A4A4A] group-hover:text-[#C8102E] transition-colors" />
                                )}
                              </div>
                            </button>
                            
                            {isOpen && (
                              <div className="mt-4 pr-8">
                                <p className="text-[#4A4A4A] leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Still Need Help Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Still need help?</h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our friendly support team is here to help you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Live Chat */}
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">Live Chat</h3>
                <p className="text-[#4A4A4A] mb-3">Get instant help from our support team</p>
                <p className="text-sm text-green-600 font-medium mb-4">Available 24/7</p>
                <button className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors">
                  Start Chat
                </button>
              </div>

              {/* Phone Support */}
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">Phone Support</h3>
                <p className="text-[#4A4A4A] mb-3">Speak directly with our team</p>
                <p className="text-sm text-blue-600 font-medium mb-4">Mon-Fri: 8AM-8PM</p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors">
                  +27 11 123 4567
                </button>
              </div>

              {/* Email Support */}
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">Email Support</h3>
                <p className="text-[#4A4A4A] mb-3">Send us a detailed message</p>
                <p className="text-sm text-purple-600 font-medium mb-4">Response within 24hrs</p>
                <button className="bg-purple-500 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-600 transition-colors">
                  Send Email
                </button>
              </div>
            </div>

            {/* Help Center Link */}
            <div className="text-center mt-10">
              <Link href="/help-center">
                <button className="bg-[#000000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#4A4A4A] transition-colors flex items-center justify-center mx-auto group">
                  Browse Help Centre
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        {!searchQuery && selectedCategory === '' && (
          <section className="mt-16">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
              <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">Most Asked About</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Order tracking and delivery status", icon: Truck },
                  { title: "Return and refund process", icon: RotateCcw },
                  { title: "Payment methods and security", icon: CreditCard },
                  { title: "Account creation and management", icon: User },
                  { title: "Product warranties and guarantees", icon: Shield },
                  { title: "Technical website issues", icon: HelpCircle }
                ].map((topic, index) => {
                  const IconComponent = topic.icon;
                  return (
                    <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F6E2E0] rounded-lg flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                          <IconComponent className="h-5 w-5 text-[#C8102E] group-hover:text-white" />
                        </div>
                        <p className="text-[#000000] font-medium group-hover:text-[#C8102E] transition-colors">
                          {topic.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
