"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Heart,
  Truck,
  Shield,
  Clock,
  Gift,
  Tag,
  Trash2
} from 'lucide-react';
import { Navbar, Footer, ConfirmationModal } from '../../components';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleMoveToWishlist = (item: any) => {
    if (!isInWishlist(item.id)) {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        rating: 4.5,
        reviews: 100,
        inStock: true
      });
    }
    removeItem(item.id);
  };

  const subtotal = state.totalPrice;
  const shipping = subtotal >= 499 ? 0 : 99;
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + shipping + tax;

  const suggestedProducts = [
    { id: 101, name: "Wireless Earbuds", price: 899, image: "🎧", category: "Electronics" },
    { id: 102, name: "Phone Case", price: 199, image: "📱", category: "Accessories" },
    { id: 103, name: "Portable Charger", price: 299, image: "🔋", category: "Electronics" },
    { id: 104, name: "Screen Protector", price: 99, image: "📱", category: "Accessories" },
  ];

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            {/* Empty Cart Illustration */}
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

          {/* Suggested Products */}
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
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
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
              <span>{state.totalItems} item{state.totalItems !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Progress */}
            {subtotal < 499 && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Free Shipping</span>
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    R{(499 - subtotal).toFixed(2)} away
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-blue-700">
                  Add <span className="font-semibold">R{(499 - subtotal).toFixed(2)}</span> more to get <span className="font-semibold text-green-600">FREE delivery</span>!
                </p>
              </div>
            )}

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#000000]">Cart Items</h2>
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-sm text-[#4A4A4A] hover:text-red-500 transition-colors flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      {/* Product Image */}
                      <Link href={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                          <span className="text-2xl sm:text-3xl">{item.image}</span>
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-semibold text-[#000000] hover:text-[#C8102E] transition-colors cursor-pointer">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-[#4A4A4A]">{item.category}</p>
                        <div className="flex items-center space-x-4">
                          <span className="font-bold text-[#C8102E] text-lg">
                            R{item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-[#4A4A4A]">
                            Each: R{item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-[#000000] w-16">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-5 w-5 text-[#000000] font-bold" />
                            </button>
                            
                            <span className="w-8 text-center font-semibold text-lg text-[#000000]">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-5 w-5 text-[#000000] font-bold" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-bold text-[#C8102E] text-lg">
                            R{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="p-2 rounded-full hover:bg-pink-50 text-[#4A4A4A] hover:text-pink-500 transition-all duration-200 group"
                            title="Move to Wishlist"
                          >
                            <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          </button>
                          
                          <button
                            onClick={() => removeItem(item.id)}
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

            {/* Suggested Add-ons */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-[#C8102E]" />
                Frequently bought together
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {suggestedProducts.slice(0, 2).map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <span className="text-2xl">{product.image}</span>
                      </div>
                      <h4 className="font-medium text-[#000000] text-sm line-clamp-2 mb-1">{product.name}</h4>
                      <p className="font-semibold text-[#C8102E] text-sm">R{product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-6 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-[#C8102E]" />
                Order Summary
              </h3>
              
              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">Subtotal ({state.totalItems} items)</span>
                  <span className="text-[#000000] font-medium">R{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#000000]'}`}>
                    {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">VAT (15%)</span>
                  <span className="text-[#000000] font-medium">R{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#000000]">Total</span>
                    <span className="text-[#C8102E]">R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Link href="/checkout" className="block mb-4">
                <button className="w-full bg-[#C8102E] text-white py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group text-lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              {/* Continue Shopping */}
              <Link href="/">
                <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-4 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-all duration-300 flex items-center justify-center text-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Continue Shopping
                </button>
              </Link>
              
              {/* Trust Signals */}
              <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <Shield className="h-4 w-4 mr-3 text-green-600" />
                  Secure 256-bit SSL encryption
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <Truck className="h-4 w-4 mr-3 text-blue-600" />
                  Free returns within 30 days
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <Clock className="h-4 w-4 mr-3 text-purple-600" />
                  24/7 customer support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={clearCart}
        title="Clear Cart?"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Cancel"
        icon={Trash2}
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
        confirmButtonColor="bg-red-500"
        confirmButtonHoverColor="hover:bg-red-600"
      />
      
      <Footer />
    </div>
  );
}
