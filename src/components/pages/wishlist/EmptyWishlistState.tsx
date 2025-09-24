"use client";

import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const EmptyWishlistState: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-[#F6E2E0] rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="h-12 w-12 text-[#C8102E]" />
      </div>
      <h2 className="text-3xl font-bold text-[#000000] mb-4">Your Wishlist is Empty</h2>
      <p className="text-lg text-[#4A4A4A] mb-8 max-w-md mx-auto">
        Start adding items you love to your wishlist. They'll appear here so you can easily find them later.
      </p>
      
      <div className="space-y-4">
        <Link href="/categories">
          <button className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Start Shopping
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </Link>
        
        <div className="flex justify-center space-x-6 text-sm text-[#4A4A4A]">
          <Link href="/categories/electronics" className="hover:text-[#C8102E] transition-colors">Electronics</Link>
          <Link href="/categories/fashion" className="hover:text-[#C8102E] transition-colors">Fashion</Link>
          <Link href="/categories/sports" className="hover:text-[#C8102E] transition-colors">Sports</Link>
          <Link href="/categories/home-garden" className="hover:text-[#C8102E] transition-colors">Home & Garden</Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlistState;
