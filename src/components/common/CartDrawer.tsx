"use client";

import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const formatVariant = (variant?: { [key: string]: string | undefined }) => {
  if (!variant) return null;
  
  const variantEntries = Object.entries(variant).filter(([_, value]) => value);
  if (variantEntries.length === 0) return null;
  
  return variantEntries
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join(' • ');
};

export default function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart, clearCart } = useCart();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, [state.isOpen]);

  useEffect(() => {
    if (state.isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.isOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (state.isOpen) {
        closeCart();
      }
    };

    const handlePopState = () => {
      handleRouteChange();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [state.isOpen, closeCart]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 cursor-pointer ${
          state.isOpen && !isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={closeCart}
      />

      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-all duration-300 ease-in-out shadow-xl flex flex-col ${
          state.isOpen && !isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          position: 'fixed',
          height: '100vh',
          overscrollBehavior: 'contain'
        }}
        onTouchMove={(e) => {
          const target = e.target as HTMLElement;
          const scrollableArea = target.closest('[data-scrollable]');
          if (!scrollableArea) {
            e.preventDefault();
          }
        }}
      >
        <div className={`flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 transition-all duration-300 delay-100 ${
          state.isOpen && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-[#C8102E]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#000000]">
              Cart ({state.totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
          >
            <X className="h-6 w-6 text-[#4A4A4A]" />
          </button>
        </div>

        <div className={`flex flex-col flex-1 min-h-0 transition-all duration-300 delay-200 ${
          state.isOpen && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F6E2E0] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-[#C8102E]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#000000] mb-2 sm:mb-3">
                Your cart is empty
              </h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] mb-6 sm:mb-8 max-w-sm leading-relaxed">
                Discover our amazing products and start adding items to your cart for the best shopping experience.
              </p>
              <button
                onClick={closeCart}
                className="bg-[#C8102E] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center group touch-manipulation"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <>
              <div 
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 pb-4" 
                data-scrollable="true"
              >
                {state.items.map((item) => (
                  <div key={item.uniqueId || item.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="relative flex-shrink-0">
                      <Link href={`/product/${item.id}`} className="block touch-manipulation" onClick={closeCart}>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                          <span className="text-xl sm:text-2xl">{item.image}</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
                        title="Remove item"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`} className="block hover:text-[#C8102E] transition-colors" onClick={closeCart}>
                        <h4 className="font-semibold text-[#000000] text-sm leading-tight cursor-pointer mb-1">
                          {item.name}
                        </h4>
                      </Link>
                      
                      {formatVariant(item.variant) && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {Object.entries(item.variant || {})
                            .filter(([_, value]) => value)
                            .map(([key, value]) => (
                              <span key={key} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#C8102E] text-white shadow-sm">
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                              </span>
                            ))
                          }
                        </div>
                      )}

                      
                      <p className="text-xs text-[#4A4A4A] mb-1">{item.category}</p>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#C8102E]">
                          R{item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-[#4A4A4A] line-through">
                            R{item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-[#C8102E] transition-all duration-200 touch-manipulation shadow-sm"
                      >
                        <Minus className="h-4 w-4 text-[#000000] font-bold" />
                      </button>
                      
                      <span className="w-8 text-center font-semibold text-[#000000] text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-[#C8102E] transition-all duration-200 touch-manipulation shadow-sm"
                      >
                        <Plus className="h-4 w-4 text-[#000000] font-bold" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4 sm:p-4 bg-white shadow-lg flex-shrink-0">
                <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  {(() => {
                    const freeDeliveryThreshold = 499;
                    const currentTotal = state.totalPrice;
                    const remainingAmount = Math.max(0, freeDeliveryThreshold - currentTotal);
                    const progress = Math.min(100, (currentTotal / freeDeliveryThreshold) * 100);
                    const isEligible = currentTotal >= freeDeliveryThreshold;

                    return (
                      <div>
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className="flex items-center space-x-2">
                            <div className={`p-1.5 sm:p-2 rounded-full ${isEligible ? 'bg-green-500' : 'bg-blue-500'}`}>
                              {isEligible ? (
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm sm:text-base font-semibold ${isEligible ? 'text-green-700' : 'text-blue-700'}`}>
                              {isEligible ? 'Free Delivery Unlocked!' : 'Free Delivery'}
                            </span>
                          </div>
                          <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full ${
                            isEligible 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isEligible ? 'Qualified ✓' : `R${remainingAmount.toFixed(2)} to go`}
                          </span>
                        </div>

                        <div className="mb-2 sm:mb-3">
                          <div className="flex justify-between items-center mb-1 sm:mb-2">
                            <span className="text-xs sm:text-sm text-gray-600">R0</span>
                            <span className="text-xs sm:text-sm font-medium text-gray-700">R{freeDeliveryThreshold}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                            <div 
                              className={`h-2.5 sm:h-3 rounded-full transition-all duration-700 ease-out ${
                                isEligible 
                                  ? 'bg-gradient-to-r from-green-400 to-green-500' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            >
                              {progress > 0 && (
                                <div className="h-full bg-white bg-opacity-20 animate-pulse"></div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          {isEligible ? (
                            <p className="text-xs sm:text-sm text-green-700 font-medium">
                              🎉 Congratulations! Your order qualifies for free delivery
                            </p>
                          ) : (
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              Add <span className="font-semibold text-blue-600">R{remainingAmount.toFixed(2)}</span> more to get 
                              <span className="font-semibold text-green-600"> FREE delivery</span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold text-[#000000]">Total:</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#C8102E]">
                    R{state.totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <Link href="/checkout" className="block">
                    <button 
                      onClick={closeCart}
                      className="w-full bg-[#C8102E] text-white py-3.5 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group touch-manipulation text-base sm:text-lg"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <Link href="/cart" className="block">
                    <button
                      onClick={closeCart}
                      className="w-full bg-white border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-all duration-300 touch-manipulation text-base shadow-md hover:shadow-lg flex items-center justify-center group"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                      View Cart
                    </button>
                  </Link>

                  <button
                    onClick={closeCart}
                    className="w-full bg-gray-100 text-[#4A4A4A] py-2.5 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="text-center mt-3">
                  <button
                    onClick={clearCart}
                    className="text-xs sm:text-sm text-[#4A4A4A] hover:text-[#C8102E] transition-colors py-1 px-2 touch-manipulation underline"
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
