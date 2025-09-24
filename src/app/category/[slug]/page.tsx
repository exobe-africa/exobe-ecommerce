"use client";

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Star, 
  Heart, 
  ShoppingCart, 
  ChevronDown,
  X,
  ArrowLeft,
  ArrowUpDown
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Toast from '../../../components/Toast';
import { ProductFilter } from '../../../components';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

// Sample products data - expanded for filtering/sorting
const allProducts = [
  // Electronics
  { id: '1', name: 'Premium Headphones', price: 1299.99, originalPrice: 1599.99, image: '🎧', category: 'electronics', brand: 'Sony', rating: 4.8, reviews: 124, inStock: true, isNew: true, isBestSeller: true },
  { id: '3', name: 'Smartphone Pro', price: 9999.99, originalPrice: 11999.99, image: '📱', category: 'electronics', brand: 'Apple', rating: 4.9, reviews: 256, inStock: true, isNew: true, isBestSeller: true },
  { id: '4', name: 'Smart Watch', price: 3499.99, originalPrice: 4199.99, image: '⌚', category: 'electronics', brand: 'Samsung', rating: 4.7, reviews: 178, inStock: true, isNew: false, isBestSeller: true },
  { id: '5', name: 'Wireless Speaker', price: 1499.99, originalPrice: 1999.99, image: '🔊', category: 'electronics', brand: 'JBL', rating: 4.5, reviews: 95, inStock: true, isNew: false, isBestSeller: false },
  { id: '7', name: 'Gaming Mouse', price: 799.99, originalPrice: 999.99, image: '🖱️', category: 'electronics', brand: 'Logitech', rating: 4.7, reviews: 143, inStock: true, isNew: true, isBestSeller: false },
  { id: '9', name: 'Bluetooth Earbuds', price: 599.99, originalPrice: 799.99, image: '🎵', category: 'electronics', brand: 'Sony', rating: 4.6, reviews: 89, inStock: true, isNew: false, isBestSeller: true },
  { id: '10', name: 'Tablet Pro', price: 4999.99, originalPrice: 5999.99, image: '📱', category: 'electronics', brand: 'Apple', rating: 4.8, reviews: 167, inStock: false, isNew: true, isBestSeller: false },
  { id: '11', name: 'Wireless Charger', price: 299.99, originalPrice: 399.99, image: '🔋', category: 'electronics', brand: 'Samsung', rating: 4.4, reviews: 73, inStock: true, isNew: false, isBestSeller: false },
  
  // Fashion
  { id: '2', name: 'Cotton T-Shirt', price: 299.99, originalPrice: 399.99, image: '👕', category: 'fashion', brand: 'Nike', rating: 4.6, reviews: 89, inStock: true, isNew: false, isBestSeller: true },
  { id: '6', name: 'Designer Jacket', price: 2499.99, originalPrice: 3299.99, image: '🧥', category: 'fashion', brand: 'Adidas', rating: 4.8, reviews: 67, inStock: true, isNew: true, isBestSeller: false },
  { id: '12', name: 'Denim Jeans', price: 899.99, originalPrice: 1199.99, image: '👖', category: 'fashion', brand: 'Levi\'s', rating: 4.5, reviews: 156, inStock: true, isNew: false, isBestSeller: true },
  { id: '13', name: 'Summer Dress', price: 699.99, originalPrice: 999.99, image: '👗', category: 'fashion', brand: 'Zara', rating: 4.7, reviews: 92, inStock: true, isNew: true, isBestSeller: false },
  
  // Sports
  { id: '8', name: 'Running Shoes', price: 1999.99, originalPrice: 2499.99, image: '👟', category: 'sports', brand: 'Nike', rating: 4.6, reviews: 201, inStock: false, isNew: false, isBestSeller: true },
  { id: '14', name: 'Yoga Mat', price: 399.99, originalPrice: 499.99, image: '🧘', category: 'sports', brand: 'Adidas', rating: 4.5, reviews: 134, inStock: true, isNew: false, isBestSeller: false },
  { id: '15', name: 'Fitness Tracker', price: 1299.99, originalPrice: 1599.99, image: '⌚', category: 'sports', brand: 'Fitbit', rating: 4.4, reviews: 88, inStock: true, isNew: true, isBestSeller: false },
  
  // Home & Garden
  { id: '16', name: 'Coffee Maker', price: 1899.99, originalPrice: 2399.99, image: '☕', category: 'home-garden', brand: 'Nespresso', rating: 4.7, reviews: 156, inStock: true, isNew: false, isBestSeller: true },
  { id: '17', name: 'Plant Pot Set', price: 599.99, originalPrice: 799.99, image: '🪴', category: 'home-garden', brand: 'IKEA', rating: 4.3, reviews: 67, inStock: true, isNew: true, isBestSeller: false },
  { id: '18', name: 'LED Desk Lamp', price: 799.99, originalPrice: 999.99, image: '💡', category: 'home-garden', brand: 'Philips', rating: 4.6, reviews: 123, inStock: true, isNew: false, isBestSeller: false },
];

const categories = {
  'electronics': { name: 'Electronics', icon: '📱', description: 'Latest technology and gadgets' },
  'fashion': { name: 'Fashion', icon: '👕', description: 'Trendy clothing and accessories' },
  'sports': { name: 'Sports & Fitness', icon: '⚽', description: 'Sports gear and fitness equipment' },
  'home-garden': { name: 'Home & Garden', icon: '🏠', description: 'Home essentials and garden supplies' },
  'beauty': { name: 'Beauty & Health', icon: '💄', description: 'Beauty products and health essentials' },
  'books': { name: 'Books & Media', icon: '📚', description: 'Books and digital media' }
};

const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'JBL', 'Logitech', 'Levi\'s', 'Zara', 'Fitbit', 'Nespresso', 'IKEA', 'Philips'];
const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'best-seller', label: 'Best Sellers' }
];

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 12000]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showBestSellersOnly, setShowBestSellersOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const categorySlug = params.slug as string;
  const category = categories[categorySlug as keyof typeof categories];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      if (product.category !== categorySlug) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (product.rating < minRating) return false;
      if (showInStockOnly && !product.inStock) return false;
      if (showNewOnly && !product.isNew) return false;
      if (showBestSellersOnly && !product.isBestSeller) return false;
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'best-seller':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [categorySlug, selectedBrands, priceRange, minRating, showInStockOnly, showNewOnly, showBestSellersOnly, sortBy]);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    if (!product.inStock) {
      setToast({
        message: 'This product is currently out of stock',
        type: 'error'
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    
    setToast({
      message: `${product.name} added to cart!`,
      type: 'success'
    });
  };

  const handleWishlistToggle = (product: typeof allProducts[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToast({
        message: `${product.name} removed from wishlist`,
        type: 'info'
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
      });
      setToast({
        message: `${product.name} added to wishlist!`,
        type: 'success'
      });
    }
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 12000]);
    setMinRating(0);
    setShowInStockOnly(false);
    setShowNewOnly(false);
    setShowBestSellersOnly(false);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 12000) count++;
    if (minRating > 0) count++;
    if (showInStockOnly) count++;
    if (showNewOnly) count++;
    if (showBestSellersOnly) count++;
    return count;
  }, [selectedBrands, priceRange, minRating, showInStockOnly, showNewOnly, showBestSellersOnly]);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#000000] mb-4">Category Not Found</h1>
          <p className="text-[#4A4A4A] mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/categories"
            className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-[#4A4A4A] mb-6">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#C8102E] transition-colors">
            Categories
          </Link>
          <span>/</span>
          <span className="text-[#000000] font-medium">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C8102E] to-[#A00E26] rounded-xl sm:rounded-2xl flex items-center justify-center">
            <span className="text-xl sm:text-2xl">{category.icon}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000] leading-tight">{category.name}</h1>
            <p className="text-sm sm:text-base text-[#4A4A4A] mt-1">{category.description}</p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <ProductFilter
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  showInStockOnly={showInStockOnly}
                  setShowInStockOnly={setShowInStockOnly}
                  showNewOnly={showNewOnly}
                  setShowNewOnly={setShowNewOnly}
                  showBestSellersOnly={showBestSellersOnly}
                  setShowBestSellersOnly={setShowBestSellersOnly}
                  brands={brands}
                  clearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="sticky top-4 z-10 bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4">
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation bg-white"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#C8102E] text-white text-xs rounded-full px-2 py-1 font-medium">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Results Count */}
                <span className="text-sm text-[#4A4A4A] font-medium">
                  {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2 flex-1 sm:flex-none">
                  <ArrowUpDown className="h-4 w-4 text-[#4A4A4A] hidden sm:block" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white flex-1 sm:flex-none touch-manipulation"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center space-x-1 border border-gray-300 rounded-lg p-1 bg-white">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors touch-manipulation ${
                      viewMode === 'grid' 
                        ? 'bg-[#C8102E] text-white' 
                        : 'text-[#4A4A4A] hover:bg-gray-100'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors touch-manipulation ${
                      viewMode === 'list' 
                        ? 'bg-[#C8102E] text-white' 
                        : 'text-[#4A4A4A] hover:bg-gray-100'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">No products found</h3>
                <p className="text-[#4A4A4A] mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'
                  : 'space-y-3 sm:space-y-4'
              }>
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${
                      viewMode === 'list' ? 'flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4' : ''
                    }`}
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className={`relative cursor-pointer touch-manipulation ${
                        viewMode === 'list' ? 'w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0' : ''
                      }`}>
                        <div className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${
                          viewMode === 'list' ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-lg' : 'h-32 sm:h-40 lg:h-48'
                        }`}>
                          <span className={viewMode === 'list' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-4xl'}>
                            {product.image}
                          </span>
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                          {product.isNew && (
                            <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                              New
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                              Best Seller
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        {/* Discount Badge */}
                        {product.originalPrice && (
                          <div className="absolute top-2 right-2 bg-[#C8102E] text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm z-10">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className={`${viewMode === 'list' ? 'flex-1' : 'p-3 sm:p-4'}`}>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-[#000000] mb-1 sm:mb-2 hover:text-[#C8102E] transition-colors cursor-pointer text-sm sm:text-base line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-xs sm:text-sm text-[#4A4A4A] mb-1 sm:mb-2">{product.brand}</p>
                      
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs sm:text-sm text-[#4A4A4A] ml-1 sm:ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      <div className={`flex items-center ${viewMode === 'list' ? 'justify-between' : 'justify-between'}`}>
                        <div className="flex-1 mr-2">
                          <span className="text-sm sm:text-lg font-bold text-[#C8102E] block">
                            R{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-[#4A4A4A] line-through">
                              R{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleWishlistToggle(product);
                            }}
                            className="p-1.5 sm:p-2 rounded-full hover:bg-[#F6E2E0] transition-colors touch-manipulation"
                          >
                            <Heart className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                              isInWishlist(product.id) 
                                ? 'text-[#C8102E] fill-[#C8102E]' 
                                : 'text-[#4A4A4A] hover:text-[#C8102E]'
                            }`} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            disabled={!product.inStock}
                            className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation ${
                              product.inStock
                                ? 'bg-[#000000] text-white hover:bg-[#4A4A4A]'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            title={product.inStock ? "Add to cart" : "Out of stock"}
                          >
                            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 cursor-pointer" onClick={() => setShowMobileFilters(false)} />
          <ProductFilter
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange as [number, number]}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            showInStockOnly={showInStockOnly}
            setShowInStockOnly={setShowInStockOnly}
            showNewOnly={showNewOnly}
            setShowNewOnly={setShowNewOnly}
            showBestSellersOnly={showBestSellersOnly}
            setShowBestSellersOnly={setShowBestSellersOnly}
            brands={brands}
            clearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
            isMobile={true}
            onCloseMobile={() => setShowMobileFilters(false)}
            resultsCount={filteredAndSortedProducts.length}
          />
        </div>
      )}

      <Footer />
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
