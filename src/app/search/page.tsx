"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Grid3X3, List, Star, Heart, ShoppingCart, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Navbar, Footer, ProductFilter, ProductCard, SortDropdown, ViewModeToggle } from '../../components';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

// Sample products data (in a real app, this would come from an API)
const allProducts = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 12999, originalPrice: 14999, image: "📱", brand: "Apple", rating: 4.8, reviews: 245, inStock: true, isNew: true, isBestSeller: false },
  { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: 11999, image: "📱", brand: "Samsung", rating: 4.7, reviews: 189, inStock: true, isNew: false, isBestSeller: true },
  { id: 3, name: "MacBook Pro M3", category: "Electronics", price: 24999, originalPrice: 27999, image: "💻", brand: "Apple", rating: 4.9, reviews: 156, inStock: true, isNew: true, isBestSeller: true },
  { id: 4, name: "Nike Air Max 270", category: "Fashion", price: 2499, image: "👟", brand: "Nike", rating: 4.6, reviews: 324, inStock: true, isNew: false, isBestSeller: false },
  { id: 5, name: "Adidas Ultraboost", category: "Fashion", price: 2299, originalPrice: 2799, image: "👟", brand: "Adidas", rating: 4.5, reviews: 267, inStock: true, isNew: false, isBestSeller: true },
  { id: 6, name: "Sony WH-1000XM5", category: "Electronics", price: 4999, image: "🎧", brand: "Sony", rating: 4.8, reviews: 412, inStock: true, isNew: false, isBestSeller: true },
  { id: 7, name: "Cotton T-Shirt", category: "Fashion", price: 299, image: "👕", brand: "eXobe", rating: 4.3, reviews: 89, inStock: true, isNew: false, isBestSeller: false },
  { id: 8, name: "Apple Watch Series 9", category: "Electronics", price: 3999, originalPrice: 4499, image: "⌚", brand: "Apple", rating: 4.7, reviews: 298, inStock: true, isNew: true, isBestSeller: false },
  { id: 9, name: "Sony WF-1000XM4", category: "Electronics", price: 1999, image: "🎧", brand: "Sony", rating: 4.6, reviews: 178, inStock: false, isNew: false, isBestSeller: false },
  { id: 10, name: "ASUS Gaming Laptop", category: "Electronics", price: 18999, originalPrice: 21999, image: "💻", brand: "ASUS", rating: 4.4, reviews: 145, inStock: true, isNew: false, isBestSeller: false },
  { id: 11, name: "Nike Dri-FIT Shirt", category: "Fashion", price: 599, image: "👕", brand: "Nike", rating: 4.2, reviews: 156, inStock: true, isNew: false, isBestSeller: false },
  { id: 12, name: "Samsung 4K Monitor", category: "Electronics", price: 5999, image: "🖥️", brand: "Samsung", rating: 4.5, reviews: 89, inStock: true, isNew: true, isBestSeller: false },
];

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' }
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showBestSellersOnly, setShowBestSellersOnly] = useState(false);

  // Search and filter products
  useEffect(() => {
    let results = allProducts;
    
    // Search filter
    if (query.trim()) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setSearchResults(results);
  }, [query]);

  // Apply filters
  useEffect(() => {
    let filtered = [...searchResults];
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }
    
    // Stock filter
    if (showInStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }
    
    // New products filter
    if (showNewOnly) {
      filtered = filtered.filter(product => product.isNew);
    }
    
    // Best sellers filter
    if (showBestSellersOnly) {
      filtered = filtered.filter(product => product.isBestSeller);
    }
    
    // Sort results
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
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Relevance - keep original order
        break;
    }
    
    setFilteredResults(filtered);
  }, [searchResults, selectedCategories, selectedBrands, priceRange, minRating, showInStockOnly, showNewOnly, showBestSellersOnly, sortBy]);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
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
        inStock: product.inStock
      });
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 30000]);
    setMinRating(0);
    setShowInStockOnly(false);
    setShowNewOnly(false);
    setShowBestSellersOnly(false);
  };

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + 
    (priceRange[0] > 0 || priceRange[1] < 30000 ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) + 
    (showInStockOnly ? 1 : 0) + 
    (showNewOnly ? 1 : 0) + 
    (showBestSellersOnly ? 1 : 0);

  const categories = [...new Set(allProducts.map(p => p.category))];
  const brands = [...new Set(allProducts.map(p => p.brand))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#000000]">
                {query ? `Search results for "${query}"` : 'All Products'}
              </h1>
              <p className="text-[#4A4A4A] mt-1">
                {filteredResults.length} product{filteredResults.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              variant="search"
              hideOnMobile={true}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#000000]">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#C8102E] hover:text-[#A00E26] font-medium"
                  >
                    Clear all ({activeFiltersCount})
                  </button>
                )}
              </div>

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
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                brands={brands}
                categories={categories}
                clearFilters={clearAllFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Toolbar */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-[#4A4A4A] hover:text-[#C8102E] transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                <SortDropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                  variant="compact"
                  showLabel={false}
                  showIcon={false}
                />
                
                <ViewModeToggle
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  variant="search"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-between mb-6">
              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                variant="default"
                showLabel={true}
                showIcon={false}
              />
            </div>

            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-[#4A4A4A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">No products found</h3>
                <p className="text-[#4A4A4A] mb-6">Try adjusting your search or filters</p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-[#C8102E] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredResults.map((product) => (
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
                    onAddToCart={handleAddToCart}
                    onWishlistToggle={handleWishlistToggle}
                    isInWishlist={isInWishlist(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-[#000000]">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-[#4A4A4A]" />
              </button>
            </div>
            
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
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              brands={brands}
              categories={categories}
              clearFilters={clearAllFilters}
              activeFiltersCount={activeFiltersCount}
              isMobile={true}
              onCloseMobile={() => setShowMobileFilters(false)}
              resultsCount={filteredResults.length}
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
