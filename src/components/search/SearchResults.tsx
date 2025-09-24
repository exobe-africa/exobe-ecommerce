"use client";

import { ProductCard } from '../index';

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
}

interface SearchResultsProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onAddToCart: (product: Product) => void;
  onWishlistToggle: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  viewMode,
  onAddToCart,
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
          onWishlistToggle={() => onWishlistToggle(product)}
          isInWishlist={isInWishlist(product.id)}
        />
      ))}
    </div>
  );
};

export default SearchResults;
