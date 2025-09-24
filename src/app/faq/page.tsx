"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  FAQHeroSection, 
  QuickAccessSection, 
  FAQCategoriesSection, 
  HelpSupportSection, 
  PopularTopicsSection 
} from '../../components/faq';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <FAQHeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuickAccessSection 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />

        <FAQCategoriesSection 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
        />

        <HelpSupportSection />

        <PopularTopicsSection 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>

      <Footer />
    </div>
  );
}
