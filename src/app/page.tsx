"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Truck, Shield, RotateCcw, Heart, ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Toast from "../components/Toast";
import { ProductCard } from "../components";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

export default function Home() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sample products data
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#F6E2E0] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#000000] mb-4 sm:mb-6 leading-tight">
                Discover Premium
                <span className="text-[#C8102E] block">Products</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#4A4A4A] mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
                Experience luxury shopping with our curated collection of high-quality products. 
                From fashion to electronics, find everything you need with exceptional service.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-0">
                <Link href="/categories">
                  <button className="w-full sm:w-auto bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 flex items-center justify-center group touch-manipulation text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/categories">
                  <button className="w-full sm:w-auto border-2 border-[#4A4A4A] text-[#4A4A4A] px-8 py-4 rounded-full font-semibold hover:bg-[#4A4A4A] hover:text-white transition-all duration-300 touch-manipulation">
                    Browse Categories
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 mb-4 lg:mb-0">
              <div className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Special Offer</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6">Up to 50% off on selected items</p>
                  <div className="bg-white text-[#C8102E] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-lg sm:text-xl">
                    LIMITED TIME
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
              <div className="bg-[#C8102E] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#000000] mb-2">Free Shipping</h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">Free delivery on orders over R99. Fast and reliable shipping.</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
              <div className="bg-[#C8102E] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#000000] mb-2">Secure Payment</h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">Your payment information is safe and secure with our encryption.</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm sm:col-span-1 col-span-1">
              <div className="bg-[#C8102E] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <RotateCcw className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#000000] mb-2">Easy Returns</h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">30-day return policy. Not satisfied? Return it hassle-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-3 sm:mb-4">Shop by Category</h2>
            <p className="text-base sm:text-lg text-[#4A4A4A] max-w-2xl mx-auto px-4 sm:px-0">
              Explore our diverse range of products across multiple categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Electronics', slug: 'electronics', icon: '📱' },
              { name: 'Fashion', slug: 'fashion', icon: '👕' },
              { name: 'Home & Garden', slug: 'home-garden', icon: '🏠' },
              { name: 'Sports', slug: 'sports', icon: '⚽' }
            ].map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <div className="group cursor-pointer touch-manipulation">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 active:scale-95">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#A00E26] transition-colors">
                      <span className="text-xl sm:text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-[#000000] mb-1 sm:mb-2 text-sm sm:text-base">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-tight">Discover amazing products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-3 sm:mb-4">Featured Products</h2>
            <p className="text-base sm:text-lg text-[#4A4A4A] max-w-2xl mx-auto px-4 sm:px-0">
              Handpicked products that our customers love most
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.category}
                variant="default"
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/categories">
              <button className="w-full sm:w-auto bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />

      <Footer />
      
      {/* Toast Notifications */}
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
