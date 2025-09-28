"use client";

import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const EmptyWishlistState: React.FC = () => {
  return (
    <div className="text-center py-20 px-4">
      {/* Icon Container */}
      <div className="w-32 h-32 bg-[#F6E2E0] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
        <Heart className="h-16 w-16 text-[#C8102E]" />
      </div>
      
      {/* Title */}
      <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-6">
        Your Wishlist is Empty
      </h2>
      
      {/* Description */}
      <p className="text-xl text-[#4A4A4A] mb-12 max-w-2xl mx-auto leading-relaxed">
        Start adding items you love to your wishlist. They'll appear here so you can easily find them later.
      </p>
      
      {/* Action Section */}
      <div className="space-y-8">
        {/* Primary CTA Button */}
        <div className="flex justify-center">
          <Link href="/categories">
            <button className="bg-[#C8102E] text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl">
              <ShoppingBag className="h-6 w-6 mr-3" />
              Start Shopping
              <ArrowRight className="h-6 w-6 ml-3" />
            </button>
          </Link>
        </div>
        
        {/* Category Links */}
        <div className="pt-4">
          <p className="text-sm text-[#6B7280] mb-4 font-medium">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base text-[#4A4A4A]">
            <Link href="/categories/electronics" className="hover:text-[#C8102E] transition-colors font-medium border-b border-transparent hover:border-[#C8102E] pb-1">
              Electronics
            </Link>
            <Link href="/categories/fashion" className="hover:text-[#C8102E] transition-colors font-medium border-b border-transparent hover:border-[#C8102E] pb-1">
              Fashion
            </Link>
            <Link href="/categories/sports" className="hover:text-[#C8102E] transition-colors font-medium border-b border-transparent hover:border-[#C8102E] pb-1">
              Sports
            </Link>
            <Link href="/categories/home-garden" className="hover:text-[#C8102E] transition-colors font-medium border-b border-transparent hover:border-[#C8102E] pb-1">
              Home & Garden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlistState;
