"use client";

import Link from 'next/link';
import { Truck, RotateCcw, CreditCard, User, Shield } from 'lucide-react';

const quickLinks = [
  { title: 'Track Order', icon: Truck, link: '/help-center/how-to-track-my-order' },
  { title: 'Returns', icon: RotateCcw, link: '/help-center/return-policy-and-conditions' },
  { title: 'Payment Methods', icon: CreditCard, link: '/help-center/accepted-payment-methods' },
  { title: 'Create Account', icon: User, link: '/help-center/how-to-create-an-account' },
  { title: 'Delivery Info', icon: Truck, link: '/help-center/delivery-times-and-areas' },
  { title: 'Warranties', icon: Shield, link: '/help-center/product-warranty-information' }
];

interface QuickAccessSectionProps {
  searchQuery: string;
  selectedCategory: string;
}

const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  searchQuery,
  selectedCategory
}) => {
  // Only show when no search or category filter is active
  if (searchQuery || selectedCategory !== '') {
    return null;
  }

  return (
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
  );
};

export default QuickAccessSection;
