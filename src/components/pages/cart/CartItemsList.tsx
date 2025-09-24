"use client";

import Link from 'next/link';
import { Plus, Minus, X, Heart, Trash2 } from 'lucide-react';
import LocationChips from '../../common/LocationChips';

// Helper function to format variant display
const formatVariant = (variant?: { [key: string]: string | undefined }) => {
  if (!variant) return null;
  
  const variantEntries = Object.entries(variant).filter(([_, value]) => value);
  if (variantEntries.length === 0) return null;
  
  return variantEntries
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join(' • ');
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  variant?: {
    size?: string;
    color?: string;
    style?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  uniqueId?: string;
  availableLocations?: string[];
}

interface CartItemsListProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number, variant?: { [key: string]: string | undefined }) => void;
  onRemoveItem: (id: string, variant?: { [key: string]: string | undefined }) => void;
  onMoveToWishlist: (item: CartItem) => void;
  onClearCart: () => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToWishlist,
  onClearCart,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-[#000000]">Cart Items</h2>
          <button
            onClick={onClearCart}
            className="text-sm text-[#4A4A4A] hover:text-red-500 transition-colors flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.uniqueId || item.id} className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href={`/product/${item.id}`} className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <span className="text-2xl sm:text-3xl">{item.image}</span>
                </div>
              </Link>

              <div className="flex-1 space-y-2">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-[#000000] hover:text-[#C8102E] transition-colors cursor-pointer">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-[#4A4A4A]">{item.category}</p>
                
                {/* Variant Info */}
                {formatVariant(item.variant) && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Object.entries(item.variant || {})
                      .filter(([_, value]) => value)
                      .map(([key, value]) => (
                        <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#F6E2E0] text-[#C8102E] border border-[#C8102E]/20">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                        </span>
                      ))
                    }
                  </div>
                )}

                {/* Location Availability */}
                {item.availableLocations && item.availableLocations.length > 0 && (
                  <LocationChips 
                    locations={item.availableLocations} 
                    size="sm"
                    className="mb-2"
                  />
                )}
                
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-[#C8102E] text-lg">
                    R{item.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-[#4A4A4A]">
                    Each: R{item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-[#000000] w-16">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.variant)}
                      className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-5 w-5 text-[#000000] font-bold" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold text-lg text-[#000000]">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.variant)}
                      className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5 text-[#000000] font-bold" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#C8102E] text-lg">
                    R{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onMoveToWishlist(item)}
                    className="p-2 rounded-full hover:bg-pink-50 text-[#4A4A4A] hover:text-pink-500 transition-all duration-200 group"
                    title="Move to Wishlist"
                  >
                    <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => onRemoveItem(item.id, item.variant)}
                    className="p-2 rounded-full hover:bg-red-50 text-[#4A4A4A] hover:text-red-500 transition-all duration-200 group"
                    title="Remove Item"
                  >
                    <X className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
