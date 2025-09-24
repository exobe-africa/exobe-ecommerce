"use client";

import Link from 'next/link';

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: '📱' },
  { name: 'Fashion', slug: 'fashion', icon: '👕' },
  { name: 'Home & Garden', slug: 'home-garden', icon: '🏠' },
  { name: 'Sports', slug: 'sports', icon: '⚽' }
];

const CategoriesSection = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-3 sm:mb-4">Shop by Category</h2>
          <p className="text-base sm:text-lg text-[#4A4A4A] max-w-2xl mx-auto px-4 sm:px-0">
            Explore our diverse range of products across multiple categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <div className="group cursor-pointer touch-manipulation">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 active:scale-95">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#A00E26] transition-colors">
                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-[#000000] mb-1 sm:mb-2 text-sm sm:text-base">{category.name}</h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-tight">Discover amazing products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
