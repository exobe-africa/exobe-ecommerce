"use client";

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Navbar, Footer, ConfirmationModal } from '../../components';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
  EmptyCartSection, 
  CartHeader, 
  ShippingProgressBar, 
  CartItemsList, 
  SuggestedProducts, 
  OrderSummary 
} from '../../components/cart';

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
        <EmptyCartSection suggestedProducts={suggestedProducts} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <CartHeader totalItems={state.totalItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Progress */}
            <ShippingProgressBar subtotal={subtotal} />

            {/* Cart Items List */}
            <CartItemsList
              items={state.items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onMoveToWishlist={handleMoveToWishlist}
              onClearCart={() => setShowClearConfirm(true)}
            />

            {/* Suggested Add-ons */}
            <SuggestedProducts products={suggestedProducts} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              totalItems={state.totalItems}
            />
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
