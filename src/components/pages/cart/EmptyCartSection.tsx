"use client";

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface EmptyCartSectionProps {
  suggestedProducts: Product[];
}

const EmptyCartSection: React.FC<EmptyCartSectionProps> = ({ suggestedProducts }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="h-16 w-16 sm:h-20 sm:w-20 text-[#4A4A4A]" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4">Your cart is empty</h1>
        <p className="text-[#4A4A4A] mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="w-full sm:w-auto bg-[#C8102E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </button>
          </Link>
          <Link href="/wishlist">
            <button className="w-full sm:w-auto border-2 border-[#C8102E] text-[#C8102E] px-8 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center">
              <Heart className="h-5 w-5 mr-2" />
              View Wishlist
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#000000] mb-6 text-center">You might like these</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {suggestedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <span className="text-3xl sm:text-4xl">{product.image}</span>
                </div>
                <h3 className="font-semibold text-[#000000] text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-[#4A4A4A] mb-2">{product.category}</p>
                <p className="font-bold text-[#C8102E]">R{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCartSection;
