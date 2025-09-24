"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Toast from "../components/Toast";
import { HeroSection, FeaturesSection, CategoriesSection, FeaturedProductsSection } from "../components/home";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

export default function Home() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const products = [
    { id: '1', name: 'Premium Headphones', price: 79.99, originalPrice: 99.99, image: '🎧', category: 'Electronics' },
    { id: '2', name: 'Cotton T-Shirt', price: 29.99, originalPrice: 39.99, image: '👕', category: 'Fashion' },
    { id: '3', name: 'Smartphone', price: 599.99, originalPrice: 699.99, image: '📱', category: 'Electronics' },
    { id: '4', name: 'Smart Watch', price: 199.99, originalPrice: 249.99, image: '⌚', category: 'Electronics' },
    { id: '5', name: 'Wireless Speaker', price: 89.99, originalPrice: 119.99, image: '🔊', category: 'Electronics' },
    { id: '6', name: 'Designer Jacket', price: 149.99, originalPrice: 199.99, image: '🧥', category: 'Fashion' },
    { id: '7', name: 'Gaming Mouse', price: 49.99, originalPrice: 69.99, image: '🖱️', category: 'Electronics' },
    { id: '8', name: 'Running Shoes', price: 119.99, originalPrice: 149.99, image: '👟', category: 'Sports' },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    
    setToast({
      message: `${product.name} added to cart!`,
      type: 'success'
    });
  };

  const handleWishlistToggle = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToast({
        message: `${product.name} removed from wishlist`,
        type: 'info'
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: 4.8,
        reviews: 124,
        inStock: true,
      });
      setToast({
        message: `${product.name} added to wishlist!`,
        type: 'success'
      });
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <CategoriesSection />

      <FeaturedProductsSection
        products={products}
        onAddToCart={handleAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={isInWishlist}
      />

      <Newsletter />

      <Footer />
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
