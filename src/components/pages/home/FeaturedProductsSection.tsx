"use client";

import Link from 'next/link';
import { ProductCard } from '../../common/index';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
}

interface FeaturedProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onWishlistToggle: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  onAddToCart,
  onWishlistToggle,
  isInWishlist
}) => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-3 sm:mb-4">Featured Products</h2>
          <p className="text-base sm:text-lg text-[#4A4A4A] max-w-2xl mx-auto px-4 sm:px-0">
            Handpicked products that our customers love most
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              category={product.category}
              variant="default"
              onAddToCart={() => onAddToCart(product)}
              onWishlistToggle={() => onWishlistToggle(product)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link href="/categories">
            <button className="w-full sm:w-auto bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
