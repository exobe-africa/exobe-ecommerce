"use client";

import { AlertCircle } from 'lucide-react';
import { ProductCard } from '../../common/index';
import type { WishlistItem } from '../../../context/WishlistContext';

interface WishlistGridProps {
  items: WishlistItem[];
  viewMode: 'grid' | 'list';
  totalItems: number;
  onAddToCart: (item: WishlistItem) => void;
  onRemoveFromWishlist: (item: WishlistItem) => void;
  onClearFilters: () => void;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({
  items,
  viewMode,
  totalItems,
  onAddToCart,
  onRemoveFromWishlist,
  onClearFilters
}) => {
  // Show no results message if filtered items is empty but total items exist
  if (items.length === 0 && totalItems > 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-[#4A4A4A] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#000000] mb-2">No items match your filters</h3>
        <p className="text-[#4A4A4A] mb-4">Try adjusting your filter or sort options.</p>
        <button
          onClick={onClearFilters}
          className="bg-[#C8102E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6' 
      : 'space-y-3 sm:space-y-4'
    }>
      {items.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          originalPrice={item.originalPrice}
          image={item.image}
          category={item.category}
          brand={item.brand || 'eXobe'}
          rating={item.rating || 0}
          reviews={item.reviews || 0}
          inStock={item.inStock !== false}
          addedAt={new Date(item.addedAt)}
          variant="wishlist"
          viewMode={viewMode}
          description={item.description}
          variants={item.variants}
          availableLocations={item.availableLocations}
          onAddToCart={onAddToCart}
          onQuickViewAddToCart={(product, selectedVariants, quantity, currentLocations) => {
            // Adapt wishlist item -> add to cart with selected variants
            for (let i = 0; i < quantity; i++) {
              onAddToCart({
                ...item,
                id: product.id as string,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                category: product.category,
                variant: selectedVariants as any,
                availableLocations: currentLocations as any,
              } as any);
            }
          }}
          onRemoveFromWishlist={onRemoveFromWishlist}
          showWishlistDate={true}
          showQuickActions={true}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;
