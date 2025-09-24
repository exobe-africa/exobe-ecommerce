"use client";

import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';

interface AddToCartSectionProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  currentStock: number;
  inStock: boolean;
  isInWishlist: boolean;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

const AddToCartSection: React.FC<AddToCartSectionProps> = ({
  quantity,
  setQuantity,
  currentStock,
  inStock,
  isInWishlist,
  onAddToCart,
  onWishlistToggle,
}) => {
  return (
    <div className="space-y-6">
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${currentStock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={`font-medium ${currentStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {currentStock > 0 ? `In Stock (${currentStock} available)` : 'Out of Stock'}
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="font-medium text-[#000000]">Quantity:</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inStock}
          >
            <Minus className="h-5 w-5 text-[#000000] font-bold" />
          </button>
          <span className="w-12 text-center font-semibold text-lg text-[#000000]">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inStock || quantity >= currentStock}
          >
            <Plus className="h-5 w-5 text-[#000000] font-bold" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          className={`w-full py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 ${
            inStock
              ? 'bg-[#C8102E] text-white hover:bg-[#A00E26] transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>

        <button
          onClick={onWishlistToggle}
          className={`w-full py-3 rounded-full border-2 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            isInWishlist
              ? 'border-pink-500 bg-pink-500 text-white hover:bg-pink-600 hover:border-pink-600'
              : 'border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
          <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>
    </div>
  );
};

export default AddToCartSection;
