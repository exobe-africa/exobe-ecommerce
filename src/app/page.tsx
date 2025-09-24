"use client";

import Newsletter from "../components/common/Newsletter";
import { HeroSection, FeaturesSection, CategoriesSection, FeaturedProductsSection } from "../components/pages/home";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

export default function Home() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const products = [
    { id: '1', name: 'Premium Headphones', price: 79.99, originalPrice: 99.99, image: '🎧', category: 'Electronics', availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
    { id: '2', name: 'Cotton T-Shirt', price: 29.99, originalPrice: 39.99, image: '👕', category: 'Fashion', availableLocations: ['Johannesburg', 'Cape Town'] },
    { id: '3', name: 'Smartphone', price: 599.99, originalPrice: 699.99, image: '📱', category: 'Electronics', availableLocations: ['Johannesburg', 'Durban'] },
    { id: '4', name: 'Smart Watch', price: 199.99, originalPrice: 249.99, image: '⌚', category: 'Electronics', availableLocations: ['Cape Town', 'Durban', 'Pretoria'] },
    { id: '5', name: 'Wireless Speaker', price: 89.99, originalPrice: 119.99, image: '🔊', category: 'Electronics', availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'] },
    { id: '6', name: 'Designer Jacket', price: 149.99, originalPrice: 199.99, image: '🧥', category: 'Fashion', availableLocations: ['Cape Town', 'Durban'] },
    { id: '7', name: 'Gaming Mouse', price: 49.99, originalPrice: 69.99, image: '🖱️', category: 'Electronics', availableLocations: ['Johannesburg', 'Pretoria'] },
    { id: '8', name: 'Running Shoes', price: 119.99, originalPrice: 149.99, image: '👟', category: 'Sports', availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    const exampleVariants = {
      '1': { size: 'Large', color: 'Black' },
      '2': { size: 'Medium', color: 'Blue' },
      '3': { size: 'Large', color: 'Space Gray' },
      '4': { size: 'Large', color: 'Black' },
      '5': { color: 'White' },
      '6': { size: 'Large', color: 'Navy' },
      '7': { color: 'Black' },
      '8': { size: '10', color: 'White' },
    };

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      variant: exampleVariants[product.id as keyof typeof exampleVariants],
      availableLocations: product.availableLocations,
    });
    
    // Toast removed - cart drawer opens automatically
  };

  const handleWishlistToggle = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
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
    }
  };
  return (
    <div className="min-h-screen bg-white">
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
      
    </div>
  );
}
