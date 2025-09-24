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
    { 
      id: '1', 
      name: 'Premium Headphones', 
      price: 79.99, 
      originalPrice: 99.99, 
      image: '🎧', 
      category: 'Electronics', 
      availableLocations: ['Johannesburg', 'Cape Town', 'Durban'],
      description: 'Experience crystal-clear audio with our premium wireless headphones.',
      rating: 4.8,
      reviews: 124,
      variants: {
        colors: [
          { name: 'Midnight Black', value: 'black', image: '🎧', price: 79.99, stock: 15, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
          { name: 'Space Gray', value: 'gray', image: '🎤', price: 79.99, stock: 8, availableLocations: ['Johannesburg', 'Cape Town'] },
          { name: 'Rose Gold', value: 'rose', image: '🎵', price: 89.99, stock: 5, availableLocations: ['Cape Town', 'Durban'] }
        ]
      }
    },
    { 
      id: '2', 
      name: 'Cotton T-Shirt', 
      price: 29.99, 
      originalPrice: 39.99, 
      image: '👕', 
      category: 'Fashion', 
      availableLocations: ['Johannesburg', 'Cape Town'],
      description: 'Premium 100% organic cotton t-shirt with a comfortable fit.',
      rating: 4.6,
      reviews: 89,
      variants: {
        colors: [
          { name: 'Classic White', value: 'white', image: '👕', price: 29.99, stock: 20, availableLocations: ['Johannesburg', 'Cape Town'] },
          { name: 'Jet Black', value: 'black', image: '🖤', price: 29.99, stock: 15, availableLocations: ['Johannesburg', 'Cape Town'] },
          { name: 'Navy Blue', value: 'navy', image: '💙', price: 29.99, stock: 12, availableLocations: ['Cape Town'] }
        ],
        sizes: [
          { name: 'S', value: 's', stock: 15, availableLocations: ['Johannesburg', 'Cape Town'] },
          { name: 'M', value: 'm', stock: 20, availableLocations: ['Johannesburg', 'Cape Town'] },
          { name: 'L', value: 'l', stock: 18, availableLocations: ['Johannesburg', 'Cape Town'] },
          { name: 'XL', value: 'xl', stock: 12, availableLocations: ['Johannesburg'] }
        ]
      }
    },
    { 
      id: '3', 
      name: 'Smartphone', 
      price: 599.99, 
      originalPrice: 699.99, 
      image: '📱', 
      category: 'Electronics', 
      availableLocations: ['Johannesburg', 'Durban'],
      description: 'Latest flagship smartphone with cutting-edge technology.',
      rating: 4.9,
      reviews: 256,
      variants: {
        colors: [
          { name: 'Cosmic Black', value: 'black', image: '📱', price: 599.99, stock: 8, availableLocations: ['Johannesburg', 'Durban'] },
          { name: 'Starlight', value: 'white', image: '🤍', price: 599.99, stock: 5, availableLocations: ['Johannesburg'] },
          { name: 'Deep Purple', value: 'purple', image: '💜', price: 599.99, stock: 3, availableLocations: ['Durban'] }
        ],
        storage: [
          { name: '128GB', value: '128gb', price: 599.99, stock: 10, availableLocations: ['Johannesburg', 'Durban'] },
          { name: '256GB', value: '256gb', price: 749.99, stock: 8, availableLocations: ['Johannesburg'] },
          { name: '512GB', value: '512gb', price: 899.99, stock: 4, availableLocations: ['Durban'] }
        ]
      }
    },
    { 
      id: '4', 
      name: 'Smart Watch', 
      price: 199.99, 
      originalPrice: 249.99, 
      image: '⌚', 
      category: 'Electronics', 
      availableLocations: ['Cape Town', 'Durban', 'Pretoria'],
      description: 'Advanced smartwatch with health monitoring and GPS tracking.',
      rating: 4.7,
      reviews: 178,
      variants: {
        colors: [
          { name: 'Midnight', value: 'black', image: '⌚', price: 199.99, stock: 15, availableLocations: ['Cape Town', 'Durban', 'Pretoria'] },
          { name: 'Silver', value: 'silver', image: '⚪', price: 199.99, stock: 12, availableLocations: ['Cape Town', 'Durban'] },
          { name: 'Gold', value: 'gold', image: '🟡', price: 229.99, stock: 8, availableLocations: ['Pretoria'] }
        ]
      }
    },
    { 
      id: '5', 
      name: 'Wireless Speaker', 
      price: 89.99, 
      originalPrice: 119.99, 
      image: '🔊', 
      category: 'Electronics', 
      availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'],
      description: 'Portable wireless speaker with exceptional sound quality.',
      rating: 4.5,
      reviews: 92
    },
    { 
      id: '6', 
      name: 'Designer Jacket', 
      price: 149.99, 
      originalPrice: 199.99, 
      image: '🧥', 
      category: 'Fashion', 
      availableLocations: ['Cape Town', 'Durban'],
      description: 'Stylish designer jacket perfect for any occasion.',
      rating: 4.3,
      reviews: 67
    },
    { 
      id: '7', 
      name: 'Gaming Mouse', 
      price: 49.99, 
      originalPrice: 69.99, 
      image: '🖱️', 
      category: 'Electronics', 
      availableLocations: ['Johannesburg', 'Pretoria'],
      description: 'High-precision gaming mouse with customizable buttons.',
      rating: 4.6,
      reviews: 134
    },
    { 
      id: '8', 
      name: 'Running Shoes', 
      price: 119.99, 
      originalPrice: 149.99, 
      image: '👟', 
      category: 'Sports', 
      availableLocations: ['Johannesburg', 'Cape Town', 'Durban'],
      description: 'Comfortable running shoes with advanced cushioning.',
      rating: 4.4,
      reviews: 203
    },
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

  const handleQuickViewAddToCart = (product: any, selectedVariants: Record<string, string>, quantity: number, currentLocations: string[]) => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        variant: selectedVariants,
        availableLocations: currentLocations,
      });
    }
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
        rating: product.rating || 4.8,
        reviews: product.reviews || 124,
        inStock: true,
        description: product.description,
        variants: product.variants,
        availableLocations: product.availableLocations,
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
        onQuickViewAddToCart={handleQuickViewAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={isInWishlist}
      />

      <Newsletter />

    </div>
  );
}
