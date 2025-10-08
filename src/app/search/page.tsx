"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductFilter } from '../../components/common';
import {
  SearchHeader,
  SearchToolbar,
  SearchResults,
  NoResultsFound,
  MobileFiltersModal
} from '../../components/pages/search';
import { useCart } from '../../context/CartContext';
import { useWishlistStore } from '../../store/wishlist';
import { useAuthStore } from '../../store/auth';
import WishlistAuthModal from '../../components/common/WishlistAuthModal';

const allProducts = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 12999, originalPrice: 14999, image: "📱", brand: "Apple", rating: 4.8, reviews: 245, inStock: true, isNew: true, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
  { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: 11999, image: "📱", brand: "Samsung", rating: 4.7, reviews: 189, inStock: true, isNew: false, isBestSeller: true, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
  { id: 3, name: "MacBook Pro M3", category: "Electronics", price: 24999, originalPrice: 27999, image: "💻", brand: "Apple", rating: 4.9, reviews: 156, inStock: true, isNew: true, isBestSeller: true, availableLocations: ['Johannesburg', 'Cape Town'] },
  { id: 4, name: "Nike Air Max 270", category: "Fashion", price: 2499, image: "👟", brand: "Nike", rating: 4.6, reviews: 324, inStock: true, isNew: false, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'] },
  { id: 5, name: "Adidas Ultraboost", category: "Fashion", price: 2299, originalPrice: 2799, image: "👟", brand: "Adidas", rating: 4.5, reviews: 267, inStock: true, isNew: false, isBestSeller: true, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
  { id: 6, name: "Sony WH-1000XM5", category: "Electronics", price: 4999, image: "🎧", brand: "Sony", rating: 4.8, reviews: 412, inStock: true, isNew: false, isBestSeller: true, availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'] },
  { 
    id: 7, 
    name: "Cotton T-Shirt", 
    category: "Fashion", 
    price: 299, 
    image: "👕", 
    brand: "eXobe", 
    rating: 4.3, 
    reviews: 89, 
    inStock: true, 
    isNew: false, 
    isBestSeller: false, 
    availableLocations: ['Johannesburg', 'Cape Town'],
    description: 'Premium 100% organic cotton t-shirt with a comfortable fit.',
    variants: {
      colors: [
        { name: 'Classic White', value: 'white', image: '👕', price: 299, stock: 20, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'Jet Black', value: 'black', image: '🖤', price: 299, stock: 15, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'Navy Blue', value: 'navy', image: '💙', price: 299, stock: 12, availableLocations: ['Cape Town'] }
      ],
      sizes: [
        { name: 'S', value: 's', stock: 15, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'M', value: 'm', stock: 20, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'L', value: 'l', stock: 18, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'XL', value: 'xl', stock: 12, availableLocations: ['Johannesburg'] }
      ]
    }
  },
  { id: 8, name: "Apple Watch Series 9", category: "Electronics", price: 3999, originalPrice: 4499, image: "⌚", brand: "Apple", rating: 4.7, reviews: 298, inStock: true, isNew: true, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
  { id: 9, name: "Sony WF-1000XM4", category: "Electronics", price: 1999, image: "🎧", brand: "Sony", rating: 4.6, reviews: 178, inStock: false, isNew: false, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town'] },
  { id: 10, name: "ASUS Gaming Laptop", category: "Electronics", price: 18999, originalPrice: 21999, image: "💻", brand: "ASUS", rating: 4.4, reviews: 145, inStock: true, isNew: false, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
  { id: 11, name: "Nike Dri-FIT Shirt", category: "Fashion", price: 599, image: "👕", brand: "Nike", rating: 4.2, reviews: 156, inStock: true, isNew: false, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'] },
  { id: 12, name: "Samsung 4K Monitor", category: "Electronics", price: 5999, image: "🖥️", brand: "Samsung", rating: 4.5, reviews: 89, inStock: true, isNew: true, isBestSeller: false, availableLocations: ['Johannesburg', 'Cape Town'] },
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
  const { isAuthenticated } = useAuthStore();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    showAuthModal,
    closeAuthModal,
    handleAuthSuccess,
    openAuthModal
  } = useWishlistStore();
  
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

  useEffect(() => {
    let results = allProducts;
    
    if (query.trim()) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setSearchResults(results);
  }, [query]);

  useEffect(() => {
    let filtered = [...searchResults];
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }
    
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
      category: product.category,
      availableLocations: product.availableLocations
    });
  };

  // Quick view add to cart handler used by ProductCard quick view
  const handleQuickViewAddToCart = (
    product: any,
    selectedVariants: Record<string, string>,
    quantity: number,
    currentLocations: string[]
  ) => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        variant: selectedVariants,
        availableLocations: currentLocations,
      });
    }
  };

  const handleWishlistToggle = (product: any) => {
    // Always check authentication first
    if (!isAuthenticated) {
      openAuthModal({ type: 'add', productId: product.id });
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleWishlistToggleWithAuth = (product: any) => {
    // Always check authentication first
    if (!isAuthenticated) {
      openAuthModal({ type: 'add', productId: product.id });
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
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
      
      <SearchHeader
        query={query}
        resultsCount={filteredResults.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

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

          <div className="flex-1">
            <SearchToolbar
              onShowMobileFilters={() => setShowMobileFilters(true)}
              activeFiltersCount={activeFiltersCount}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={sortOptions}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isMobile={true}
            />

            <SearchToolbar
              onShowMobileFilters={() => setShowMobileFilters(true)}
              activeFiltersCount={activeFiltersCount}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={sortOptions}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isMobile={false}
            />

            {filteredResults.length === 0 ? (
              <NoResultsFound
                activeFiltersCount={activeFiltersCount}
                onClearFilters={clearAllFilters}
              />
            ) : (
              <SearchResults
                products={filteredResults}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onQuickViewAddToCart={handleQuickViewAddToCart}
                onWishlistToggle={handleWishlistToggleWithAuth}
                isInWishlist={(id) => isInWishlist(id.toString())}
              />
            )}
          </div>
        </div>
      </div>

      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
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
        resultsCount={filteredResults.length}
      />

      {/* Authentication Modal for Wishlist Access */}
      <WishlistAuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />

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
