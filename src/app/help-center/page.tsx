"use client";

import { useState } from 'react';
import { ShoppingBag, CreditCard, RotateCcw, User, Star, Shield, Truck, Clock, MessageCircle, Phone, Mail } from 'lucide-react';
import {
  HelpCenterHero,
  PopularArticles,
  HelpCategories,
  ContactSupport,
  QuickLinks,
  FAQPreview
} from '../../components/pages/help-center';

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
    title: 'WhatsApp Support',
    description: 'Message us on WhatsApp for help',
    availability: 'Available 24/7',
    icon: MessageCircle,
    color: 'bg-green-500',
    action: 'Chat on WhatsApp',
    whatsappNumber: '+27821234567'
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

  return (
    <div className="min-h-screen bg-gray-50">

      
      <HelpCenterHero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PopularArticles searchQuery={searchQuery} />

        <HelpCategories 
          categories={helpCategories}
          searchQuery={searchQuery}
        />

        <ContactSupport contactMethods={contactMethods} />

        <QuickLinks />

        <FAQPreview />
      </div>
    </div>
  );
}
