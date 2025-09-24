"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone, Shirt, Home, Zap } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CategoryFilter } from "../../components";

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge technology and gadgets for the modern world',
    icon: '📱',
    productCount: 156,
    image: '/api/placeholder/400/300',
    color: 'from-blue-500 to-purple-600',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    featured: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories for every style',
    icon: '👕',
    productCount: 89,
    image: '/api/placeholder/400/300',
    color: 'from-pink-500 to-red-600',
    textColor: 'text-pink-600',
    bgColor: 'bg-pink-50',
    featured: ['T-Shirts', 'Jeans', 'Dresses', 'Accessories']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Everything you need to make your house a home',
    icon: '🏠',
    productCount: 124,
    image: '/api/placeholder/400/300',
    color: 'from-green-500 to-teal-600',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    featured: ['Furniture', 'Decor', 'Garden Tools', 'Kitchen']
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Gear up for your active lifestyle and fitness goals',
    icon: '⚽',
    productCount: 67,
    image: '/api/placeholder/400/300',
    color: 'from-orange-500 to-yellow-600',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    featured: ['Running Shoes', 'Gym Equipment', 'Sports Wear', 'Accessories']
  },
  {
    id: 'beauty',
    name: 'Beauty & Health',
    description: 'Premium beauty products and health essentials',
    icon: '💄',
    productCount: 93,
    image: '/api/placeholder/400/300',
    color: 'from-purple-500 to-pink-600',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    featured: ['Skincare', 'Makeup', 'Fragrances', 'Health Supplements']
  },
  {
    id: 'books',
    name: 'Books & Media',
    description: 'Expand your knowledge with our curated book collection',
    icon: '📚',
    productCount: 45,
    image: '/api/placeholder/400/300',
    color: 'from-indigo-500 to-blue-600',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    featured: ['Fiction', 'Non-Fiction', 'Educational', 'Digital Media']
  }
];

const popularTags = [
  { id: 'new-arrivals', title: 'New Arrivals' },
  { id: 'best-sellers', title: 'Best Sellers' },
  { id: 'on-sale', title: 'On Sale' },
  { id: 'premium-collection', title: 'Premium Collection' },
  { id: 'customer-favourites', title: 'Customer Favourites' }
];

export default function CategoriesPage() {
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagSelect = (tagId: string) => {
    setSelectedTag(tagId);
    // Navigate to electronics category with filter
    const tag = popularTags.find(t => t.id === tagId);
    if (tag) {
      window.location.href = `/category/electronics?filter=${tagId}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Discover our extensive range of products across multiple categories. 
            Find exactly what you're looking for with our curated collections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <div className="group cursor-pointer">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100">
                  {/* Category Image/Icon */}
                  <div className={`relative h-48 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <span className="text-6xl">{category.icon}</span>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>

                  {/* Category Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#000000] group-hover:text-[#C8102E] transition-colors">
                        {category.name}
                      </h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${category.bgColor} ${category.textColor}`}>
                        {category.productCount} items
                      </span>
                    </div>
                    
                    <p className="text-[#4A4A4A] mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Featured Items */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {category.featured.slice(0, 3).map((item, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-[#4A4A4A] px-2 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                        {category.featured.length > 3 && (
                          <span className="text-xs text-[#4A4A4A] px-2 py-1">
                            +{category.featured.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Shop Now Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#4A4A4A]">
                        Starting from R99.99
                      </span>
                      <div className="flex items-center text-[#C8102E] font-medium group-hover:translate-x-1 transition-transform">
                        <span className="text-sm mr-1">Shop Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories Section */}
        <div className="bg-gradient-to-r from-[#F6E2E0] to-white rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-4">
              Why Shop by Category?
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              Our carefully curated categories make it easy to find exactly what you need, 
              with expert recommendations and quality guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-[#000000] mb-2">Curated Selection</h3>
              <p className="text-[#4A4A4A] text-sm">
                Hand-picked products from trusted brands and suppliers
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-[#000000] mb-2">Easy Navigation</h3>
              <p className="text-[#4A4A4A] text-sm">
                Find what you need quickly with our organised categories
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-[#000000] mb-2">Quality Guaranteed</h3>
              <p className="text-[#4A4A4A] text-sm">
                Every product is verified for quality and authenticity
              </p>
            </div>
          </div>
        </div>

        {/* Popular Categories Quick Links */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#000000] mb-8">Popular Right Now</h2>
          <CategoryFilter
            categories={popularTags}
            selectedCategory={selectedTag}
            onCategoryChange={handleTagSelect}
            variant="light"
            size="medium"
            showAllOption={false}
            layout="horizontal"
            showIcons={false}
            className="justify-center"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
