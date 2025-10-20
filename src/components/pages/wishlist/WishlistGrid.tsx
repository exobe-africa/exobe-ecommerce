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
      {items.map((item) => {
        const p = (item as any).product;
        const imageUrl = p?.media?.[0]?.url || '';
        const price = typeof p?.priceInCents === 'number' ? p.priceInCents / 100 : 0;
        const originalPrice = typeof p?.compareAtPriceInCents === 'number' ? p.compareAtPriceInCents / 100 : undefined;
        const name = p?.title || `Product ${item.product_id}`;
        const category = p?.category?.name || '';
        const createdAtRaw = (item as any).created_at;
        let addedDate: Date | undefined = undefined;
        if (createdAtRaw !== undefined && createdAtRaw !== null) {
          if (typeof createdAtRaw === 'number') {
            addedDate = new Date(createdAtRaw);
          } else if (typeof createdAtRaw === 'string' && /^\d+$/.test(createdAtRaw)) {
            addedDate = new Date(Number(createdAtRaw));
          } else if (typeof createdAtRaw === 'string') {
            addedDate = new Date(createdAtRaw);
          }
        }
        return (
        <ProductCard
          key={item.id}
          id={item.product_id}
          name={name}
          price={price}
          originalPrice={originalPrice}
          image={imageUrl}
          category={category}
          brand={'eXobe'}
          rating={0}
          reviews={0}
          inStock={true}
          addedAt={addedDate}
          variant="wishlist"
          viewMode={viewMode}
          description={p?.description || ''}
          variants={[]}
          availableLocations={p?.availableLocations || []}
          onAddToCart={onAddToCart}
          onQuickViewAddToCart={(product, selectedVariants, quantity, currentLocations) => {
            // TODO: Implement when product details are available
            console.log('Quick view add to cart not implemented yet');
          }}
          onRemoveFromWishlist={onRemoveFromWishlist}
          showWishlistDate={true}
          showQuickActions={true}
        />
      )})}
    </div>
  );
};

export default WishlistGrid;
