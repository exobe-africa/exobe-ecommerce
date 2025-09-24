"use client";

import Link from 'next/link';
import { ShoppingCart, Home, HelpCircle } from 'lucide-react';

const QuickActionsSidebar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        <Link href="/cart" className="block">
          <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center justify-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Return to Cart
          </button>
        </Link>
        
        <Link href="/" className="block">
          <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-medium hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center">
            <Home className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </Link>
        
        <Link href="/help-center" className="block">
          <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Help Centre
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActionsSidebar;
