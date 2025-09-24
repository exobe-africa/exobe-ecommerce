"use client";

import Link from 'next/link';
import { Home, ShoppingBag, Heart } from 'lucide-react';

const QuickActionsSidebar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        <Link href="/" className="block">
          <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center justify-center">
            <Home className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </Link>
        
        <Link href="/categories" className="block">
          <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-medium hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Browse Categories
          </button>
        </Link>
        
        <Link href="/wishlist" className="block">
          <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
            <Heart className="h-5 w-5 mr-2" />
            View Wishlist
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActionsSidebar;
