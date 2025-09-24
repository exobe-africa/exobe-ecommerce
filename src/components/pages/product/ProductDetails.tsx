"use client";

import { Star } from 'lucide-react';
import LocationChips from '../../common/LocationChips';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  reviews: number;
  availableLocations?: string[];
}

interface ProductDetailsProps {
  product: Product;
  currentPrice: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, currentPrice }) => {
  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-2">{product.name}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-[#4A4A4A]">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
        <p className="text-[#4A4A4A] leading-relaxed">{product.description}</p>
      </div>

      {/* Location Availability */}
      {product.availableLocations && product.availableLocations.length > 0 && (
        <LocationChips 
          locations={product.availableLocations} 
          size="lg"
          className="py-2"
        />
      )}

      {/* Price */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-2xl sm:text-3xl font-bold text-[#C8102E] break-words">
          R{currentPrice.toFixed(2)}
        </span>
        <div className="flex items-center gap-2 sm:gap-4">
          {product.originalPrice && (
            <span className="text-lg sm:text-xl text-[#4A4A4A] line-through">
              R{product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#C8102E] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
              Save R{(product.originalPrice - currentPrice).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
