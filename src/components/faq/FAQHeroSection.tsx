"use client";

import { useState } from 'react';
import { Search, HelpCircle, ShoppingBag, CreditCard, RotateCcw, User, Shield } from 'lucide-react';
import { Breadcrumb, PageHeader, CategoryFilter } from '../index';

const faqCategories = [
  { id: 'orders', title: 'Orders & Delivery', icon: ShoppingBag },
  { id: 'payments', title: 'Payments & Billing', icon: CreditCard },
  { id: 'returns', title: 'Returns & Refunds', icon: RotateCcw },
  { id: 'account', title: 'Account & Profile', icon: User },
  { id: 'products', title: 'Products & Stock', icon: Shield },
  { id: 'technical', title: 'Technical Support', icon: HelpCircle }
];

interface FAQHeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FAQHeroSection: React.FC<FAQHeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <section className="bg-gradient-to-br from-[#000000] to-[#4A4A4A] text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

        <div className="max-w-4xl mx-auto">
          <CategoryFilter
            categories={faqCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            variant="dark"
            size="medium"
            showAllOption={true}
            allOptionLabel="All Categories"
            layout="horizontal"
            showIcons={true}
          />
        </div>
      </div>
    </section>
  );
};

export default FAQHeroSection;
