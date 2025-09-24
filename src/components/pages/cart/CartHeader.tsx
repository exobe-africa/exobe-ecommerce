"use client";

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface CartHeaderProps {
  totalItems: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ totalItems }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors touch-manipulation">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Continue Shopping</span>
              </button>
            </Link>
            <div className="h-5 w-px bg-gray-300 hidden sm:block" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000]">Shopping Cart</h1>
          </div>
          
          <div className="flex items-center text-sm text-[#4A4A4A]">
            <ShoppingBag className="h-4 w-4 mr-2" />
            <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
