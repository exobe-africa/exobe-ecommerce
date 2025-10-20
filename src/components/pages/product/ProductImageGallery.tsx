"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

interface ProductImageGalleryProps {
  currentImage: string;
  images?: string[];
  productName: string;
  productId: string;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
  onShare: () => void;
  isWishlistLoading?: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  currentImage,
  images,
  productName,
  productId,
  isInWishlist,
  onWishlistToggle,
  onShare,
  isWishlistLoading = false,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (images && images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images && images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const displayImage = images && images.length > 0 ? images[selectedImageIndex] : currentImage;
  const isUrl = displayImage && (displayImage.startsWith('http') || displayImage.startsWith('/'));

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square flex items-center justify-center group touch-pan-y overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isUrl ? (
          <img 
            src={displayImage} 
            alt={productName}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-8xl lg:text-9xl">{displayImage}</span>
        )}
        
        {/* Image Navigation */}
        {images && images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronLeft className="h-6 w-6 text-[#4A4A4A]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronRight className="h-6 w-6 text-[#4A4A4A]" />
            </button>
          </>
        )}

        {/* Wishlist Button */}
        <button
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
          disabled={isWishlistLoading}
        >
          {isWishlistLoading ? (
            <span className="block w-5 h-5 rounded-full border-2 border-[#C8102E]/60 border-t-transparent animate-spin" />
          ) : (
            <Heart className={`h-6 w-6 transition-colors ${
              isInWishlist 
                ? 'fill-[#C8102E] text-[#C8102E]' 
                : 'text-[#4A4A4A] hover:text-[#C8102E]'
            }`} />
          )}
        </button>

        {/* Share Button */}
        <button 
          onClick={onShare}
          className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
          title="Share product"
        >
          <Share2 className="h-6 w-6 text-[#4A4A4A]" />
        </button>
      </div>

      {/* Thumbnail Images */}
      {images && images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => {
            const isThumbUrl = img && (img.startsWith('http') || img.startsWith('/'));
            return (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden transition-all ${
                  selectedImageIndex === index 
                    ? 'ring-2 ring-[#C8102E] scale-105' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                {isThumbUrl ? (
                  <img 
                    src={img} 
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">{img}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
