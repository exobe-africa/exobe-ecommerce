"use client";

import { AlertCircle } from 'lucide-react';
import { ProductCard } from '../../common/index';
import type { WishlistItem } from '../../../store/wishlist';

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
          name={`Product ${item.product_id}`}
          price={0} // TODO: Add price when product details are available
          originalPrice={undefined}
          image={''} // TODO: Add image when product details are available
          category={''} // TODO: Add category when available
          brand={'eXobe'}
          rating={0} // TODO: Add rating when available
          reviews={0} // TODO: Add reviews when available
          inStock={true} // TODO: Add stock info when available
          addedAt={new Date(item.created_at)}
          variant="wishlist"
          viewMode={viewMode}
          description={''} // TODO: Add description when available
          variants={[]} // TODO: Add variants when available
          availableLocations={[]} // TODO: Add location info when available
          onAddToCart={onAddToCart}
          onQuickViewAddToCart={(product, selectedVariants, quantity, currentLocations) => {
            // TODO: Implement when product details are available
            console.log('Quick view add to cart not implemented yet');
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
