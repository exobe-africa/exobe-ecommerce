"use client";

import { 
  CategoriesHeader, 
  CategoriesGrid, 
  CategoryBenefitsSection, 
  PopularTagsSection 
} from "../../components/pages/categories";

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
  return (
    <div className="min-h-screen bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoriesHeader />

        <CategoriesGrid categories={categories} />

        <CategoryBenefitsSection />

        <PopularTagsSection tags={popularTags} />
      </div>

    </div>
  );
}
