"use client";

import { ProductCard } from '../../common/index';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
  variants?: any;
  availableLocations?: string[];
}

interface SearchResultsProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onAddToCart: (product: Product) => void;
  onQuickViewAddToCart?: (product: Product, selectedVariants: Record<string, string>, quantity: number, currentLocations: string[]) => void;
  onWishlistToggle: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  viewMode,
  onAddToCart,
  onQuickViewAddToCart,
  onWishlistToggle,
  isInWishlist,
}) => {
  return (
    <div className={viewMode === 'grid' 
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
      : 'space-y-4'
    }>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.image}
          category={product.category}
          brand={product.brand}
          rating={product.rating}
          reviews={product.reviews}
          inStock={product.inStock}
          isNew={product.isNew}
          isBestSeller={product.isBestSeller}
          variant="search"
          viewMode={viewMode}
          onAddToCart={() => onAddToCart(product)}
          onQuickViewAddToCart={onQuickViewAddToCart}
          onWishlistToggle={() => onWishlistToggle(product)}
          isInWishlist={isInWishlist(product.id)}
          description={product.description}
          variants={product.variants}
          availableLocations={product.availableLocations}
        />
      ))}
    </div>
  );
};

export default SearchResults;
