"use client";

import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye, Share2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ProductQuickViewModal } from './index';

export interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  addedAt?: Date;
  
  variant?: 'default' | 'search' | 'category' | 'wishlist';
  viewMode?: 'grid' | 'list';
  
  onAddToCart?: (product: any) => void;
  onQuickViewAddToCart?: (product: any, selectedVariants: Record<string, string>, quantity: number, currentLocations: string[]) => void;
  onWishlistToggle?: (product: any) => void;
  onRemoveFromWishlist?: () => void;
  isInWishlist?: boolean;
  
  // Product details for quick view
  description?: string;
  variants?: any;
  availableLocations?: string[];
  
  showWishlistDate?: boolean;
  showQuickActions?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  brand,
  rating = 4.8,
  reviews = 124,
  inStock = true,
  isNew = false,
  isBestSeller = false,
  addedAt,
  variant = 'default',
  viewMode = 'grid',
  onAddToCart,
  onQuickViewAddToCart,
  onWishlistToggle,
  onRemoveFromWishlist,
  isInWishlist = false,
  description,
  variants,
  availableLocations,
  showWishlistDate = false,
  showQuickActions = false,
  className = ''
}: ProductCardProps) => {
  const [showQuickView, setShowQuickView] = useState(false);
  
  const product = {
    id, name, price, originalPrice, image, category, brand, rating, reviews, inStock, isNew, isBestSeller, addedAt,
    description, variants, availableLocations
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If product has variants or we have quick view handler, show modal
    if (variants || onQuickViewAddToCart) {
      setShowQuickView(true);
    } else if (onAddToCart) {
      // Fallback to direct add to cart for simple products
      onAddToCart(product);
    }
  };

  const handleQuickViewAddToCart = (product: any, selectedVariants: Record<string, string>, quantity: number, currentLocations: string[]) => {
    if (onQuickViewAddToCart) {
      onQuickViewAddToCart(product, selectedVariants, quantity, currentLocations);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist();
    }
  };

  if (variant === 'default') {
    return (
      <>
      <div className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${className}`}>
        <Link href={`/product/${id}`}>
          <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 h-32 sm:h-40 lg:h-48 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform overflow-hidden">
            {image && (image.startsWith('http') || image.startsWith('/')) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl sm:text-3xl lg:text-4xl">{image}</span>
            )}

            {originalPrice && (
              <div className="absolute top-2 right-2 bg-[#C8102E] text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 left-2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-md transition-all duration-300 hover:scale-110 z-10"
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                isInWishlist 
                  ? 'fill-[#C8102E] text-[#C8102E]' 
                  : 'text-[#4A4A4A] hover:text-[#C8102E]'
              }`} />
            </button>
          </div>
        </Link>
        
        <div className="p-3 sm:p-4">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-[#000000] mb-1 sm:mb-2 hover:text-[#C8102E] transition-colors cursor-pointer text-sm sm:text-base line-clamp-2">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs sm:text-sm text-[#4A4A4A] ml-1 sm:ml-2">({reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-2">
              <span className="text-sm sm:text-lg font-bold text-[#C8102E] block">
                R{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs sm:text-sm text-[#4A4A4A] line-through">
                  R{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-[#000000] text-white p-2 sm:p-2.5 rounded-full hover:bg-[#4A4A4A] transition-all duration-300 transform hover:scale-110 active:scale-95 group/btn z-10 relative touch-manipulation"
              title="Add to cart"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
        onAddToCart={handleQuickViewAddToCart}
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
      />
      </>
    );
  }

  if (variant === 'search') {
    if (viewMode === 'list') {
      return (
        <>
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex items-center p-4 ${className}`}>
          <div className="flex-shrink-0 mr-4">
            <Link href={`/product/${id}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer overflow-hidden">
                {image && (image.startsWith('http') || image.startsWith('/')) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">{image}</span>
                )}
              </div>
            </Link>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <Link href={`/product/${id}`}>
                  <h3 className="font-semibold text-[#000000] hover:text-[#C8102E] transition-colors cursor-pointer">
                    {name}
                  </h3>
                </Link>
                <p className="text-sm text-[#4A4A4A]">{brand}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                )}
                {isBestSeller && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Best Seller
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating!) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-[#4A4A4A]">({reviews})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-[#C8102E]">
                  R{price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-[#4A4A4A] line-through">
                    R{originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleWishlistToggle}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart className={`h-5 w-5 transition-colors ${
                    isInWishlist 
                      ? 'fill-[#C8102E] text-[#C8102E]' 
                      : 'text-[#4A4A4A] hover:text-[#C8102E]'
                  }`} />
                </button>
                
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="bg-[#C8102E] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <ProductQuickViewModal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          product={product}
          onAddToCart={handleQuickViewAddToCart}
          onWishlistToggle={onWishlistToggle}
          isInWishlist={isInWishlist}
        />
        </>
      );
    }

    return (
      <>
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group p-4 ${className}`}>
        <div className="relative">
          <Link href={`/product/${id}`}>
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform cursor-pointer overflow-hidden">
              {image && (image.startsWith('http') || image.startsWith('/')) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl">{image}</span>
              )}
            </div>
          </Link>
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            )}
            {isBestSeller && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Best Seller
              </span>
            )}
            {!inStock && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {originalPrice && (
            <div className="absolute top-2 right-2 bg-[#C8102E] text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </div>
          )}

          <button
            onClick={handleWishlistToggle}
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          >
            <Heart className={`h-5 w-5 transition-colors ${
              isInWishlist 
                ? 'fill-[#C8102E] text-[#C8102E]' 
                : 'text-[#4A4A4A] hover:text-[#C8102E]'
            }`} />
          </button>
        </div>

        <div className="space-y-2">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-[#000000] hover:text-[#C8102E] transition-colors cursor-pointer line-clamp-2">
              {name}
            </h3>
          </Link>
          
          <p className="text-sm text-[#4A4A4A]">{brand}</p>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating!) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#4A4A4A]">({reviews})</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[#C8102E]">
              R{price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-[#4A4A4A] line-through">
                R{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
        onAddToCart={handleQuickViewAddToCart}
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
      />
      </>
    );
  }

  if (variant === 'category') {
    if (viewMode === 'list') {
      return (
        <>
        <div className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 ${className}`}>
          <Link href={`/product/${id}`}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 relative cursor-pointer touch-manipulation">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                {image && (image.startsWith('http') || image.startsWith('/')) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl sm:text-2xl">{image}</span>
                )}
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                {isNew && (
                  <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                    New
                  </span>
                )}
                {isBestSeller && (
                  <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                    Best Seller
                  </span>
                )}
                {!inStock && (
                  <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              {originalPrice && (
                <div className="absolute top-2 right-2 bg-[#C8102E] text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm z-10">
                  -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
                </div>
              )}
            </div>
          </Link>
          
          <div className="flex-1">
            <Link href={`/product/${id}`}>
              <h3 className="font-semibold text-[#000000] mb-1 sm:mb-2 hover:text-[#C8102E] transition-colors cursor-pointer text-sm sm:text-base line-clamp-2">
                {name}
              </h3>
            </Link>
            
            <p className="text-xs sm:text-sm text-[#4A4A4A] mb-1 sm:mb-2">{brand}</p>
            
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    i < Math.floor(rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs sm:text-sm text-[#4A4A4A] ml-1 sm:ml-2">
                {rating} ({reviews})
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-2">
                <span className="text-sm sm:text-lg font-bold text-[#C8102E] block">
                  R{price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-xs sm:text-sm text-[#4A4A4A] line-through">
                    R{originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button 
                  onClick={handleWishlistToggle}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-[#F6E2E0] transition-colors touch-manipulation"
                >
                  <Heart className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                    isInWishlist 
                      ? 'text-[#C8102E] fill-[#C8102E]' 
                      : 'text-[#4A4A4A] hover:text-[#C8102E]'
                  }`} />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation ${
                    inStock
                      ? 'bg-[#000000] text-white hover:bg-[#4A4A4A]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title={inStock ? "Add to cart" : "Out of stock"}
                >
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <ProductQuickViewModal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          product={product}
          onAddToCart={handleQuickViewAddToCart}
          onWishlistToggle={onWishlistToggle}
          isInWishlist={isInWishlist}
        />
        </>
      );
    }

    // Category grid view
    return (
      <>
      <div className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${className}`}>
        <Link href={`/product/${id}`}>
          <div className="relative cursor-pointer touch-manipulation">
            <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
              {image && (image.startsWith('http') || image.startsWith('/')) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl sm:text-3xl lg:text-4xl">{image}</span>
              )}
            </div>
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
              {isNew && (
                <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                  New
                </span>
              )}
              {isBestSeller && (
                <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                  Best Seller
                </span>
              )}
              {!inStock && (
                <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Discount Badge */}
            {originalPrice && (
              <div className="absolute top-2 right-2 bg-[#C8102E] text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm z-10">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-3 sm:p-4">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-[#000000] mb-1 sm:mb-2 hover:text-[#C8102E] transition-colors cursor-pointer text-sm sm:text-base line-clamp-2">
              {name}
            </h3>
          </Link>
          
          <p className="text-xs sm:text-sm text-[#4A4A4A] mb-1 sm:mb-2">{brand}</p>
          
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(rating!)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs sm:text-sm text-[#4A4A4A] ml-1 sm:ml-2">
              {rating} ({reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-2">
              <span className="text-sm sm:text-lg font-bold text-[#C8102E] block">
                R{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs sm:text-sm text-[#4A4A4A] line-through">
                  R{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button 
                onClick={handleWishlistToggle}
                className="p-1.5 sm:p-2 rounded-full hover:bg-[#F6E2E0] transition-colors touch-manipulation"
              >
                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                  isInWishlist 
                    ? 'text-[#C8102E] fill-[#C8102E]' 
                    : 'text-[#4A4A4A] hover:text-[#C8102E]'
                }`} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation ${
                  inStock
                    ? 'bg-[#000000] text-white hover:bg-[#4A4A4A]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title={inStock ? "Add to cart" : "Out of stock"}
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
        onAddToCart={handleQuickViewAddToCart}
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
      />
      </>
    );
  }

  // Wishlist page variant
  if (variant === 'wishlist') {
    if (viewMode === 'list') {
      return (
        <>
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ${className}`}>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden" onClick={() => window.location.href = `/product/${id}`}>
              {image && (image.startsWith('http') || image.startsWith('/')) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">{image}</span>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <Link href={`/product/${id}`}>
                <h3 className="text-lg font-semibold text-[#000000] mb-2 hover:text-[#C8102E] transition-colors">
                  {name}
                </h3>
              </Link>
              
              {reviews > 0 && (
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-[#4A4A4A] ml-2">
                    ({reviews} reviews)
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-4 mb-2">
                <div>
                  {price > 0 && (
                    <span className="text-xl font-bold text-[#C8102E]">
                      R{price.toFixed(2)}
                    </span>
                  )}
                  {originalPrice && originalPrice > 0 && (
                    <span className="text-sm text-[#4A4A4A] line-through ml-2">
                      R{originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {originalPrice && originalPrice > price && price > 0 && (
                  <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Save R{(originalPrice - price).toFixed(2)}
                  </span>
                )}
              </div>
              
              {showWishlistDate && addedAt && (
                <p className="text-sm text-[#4A4A4A]">
                  Added to wishlist on {formatDate(addedAt)}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-col space-y-2 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center text-sm ${
                  !inStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {!inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleRemoveFromWishlist}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-[#4A4A4A] hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center text-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <ProductQuickViewModal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          product={product}
          onAddToCart={handleQuickViewAddToCart}
          onWishlistToggle={onWishlistToggle}
          isInWishlist={isInWishlist}
        />
        </>
      );
    }

    // Wishlist grid view
    return (
      <>
      <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 ${className}`}>
        <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 h-48 flex items-center justify-center cursor-pointer overflow-hidden" onClick={() => window.location.href = `/product/${id}`}>
          {image && (image.startsWith('http') || image.startsWith('/')) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">{image}</span>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {originalPrice && originalPrice > price && price > 0 && (
              <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-semibold">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </span>
            )}
            {!inStock && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          {showQuickActions && (
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                title="Share"
              >
                <Share2 className="h-4 w-4 text-[#4A4A4A]" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/product/${id}`;
                }}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                title="View Product"
              >
                <Eye className="h-4 w-4 text-[#4A4A4A]" />
              </button>
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-[#000000] mb-2 hover:text-[#C8102E] transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          
          {reviews > 0 && (
            <div className="flex items-center mb-2 sm:mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs sm:text-sm text-[#4A4A4A] ml-1 sm:ml-2">
                ({reviews || 0})
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              {price > 0 && (
                <span className="text-base sm:text-lg font-bold text-[#C8102E]">
                  R{price.toFixed(2)}
                </span>
              )}
              {originalPrice && originalPrice > 0 && (
                <span className="text-xs sm:text-sm text-[#4A4A4A] line-through ml-1 sm:ml-2">
                  R{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {showWishlistDate && addedAt && (
            <div className="text-xs text-[#4A4A4A] mb-3 sm:mb-4">
              Added {formatDate(addedAt)}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm ${
                !inStock
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {!inStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={handleRemoveFromWishlist}
              className="sm:w-auto w-full py-2.5 sm:py-2 px-3 sm:px-2 border border-gray-300 rounded-lg text-[#4A4A4A] hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center sm:justify-center text-sm"
              title="Remove from wishlist"
            >
              <Trash2 className="h-4 w-4 sm:mr-0 mr-2" />
              <span className="sm:hidden">Remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
        onAddToCart={handleQuickViewAddToCart}
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
      />
      </>
    );
  }

  return (
    <>
      <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
        <div className="p-4">
          <h3 className="font-semibold text-[#000000]">{name}</h3>
          <p className="text-[#C8102E] font-bold">R{price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
        onAddToCart={handleQuickViewAddToCart}
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
      />
    </>
  );
};

export default ProductCard;
