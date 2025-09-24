"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Grid3X3, List, Star, Heart, ShoppingCart, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Navbar, Footer } from '../../components';
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
            
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#C8102E] shadow-sm' 
                    : 'text-[#4A4A4A] hover:text-[#C8102E]'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#C8102E] shadow-sm' 
                    : 'text-[#4A4A4A] hover:text-[#C8102E]'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
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

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#000000] mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                          className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                        />
                        <span className="ml-3 text-sm text-[#4A4A4A]">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-medium text-[#000000] mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                          className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                        />
                        <span className="ml-3 text-sm text-[#4A4A4A]">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-[#000000] mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                      <span className="text-[#4A4A4A]">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 30000])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-medium text-[#000000] mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                        />
                        <div className="ml-3 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-[#4A4A4A]">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <h3 className="font-medium text-[#000000] mb-3">Additional Filters</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showInStockOnly}
                        onChange={(e) => setShowInStockOnly(e.target.checked)}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                      />
                      <span className="ml-3 text-sm text-[#4A4A4A]">In Stock Only</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showNewOnly}
                        onChange={(e) => setShowNewOnly(e.target.checked)}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                      />
                      <span className="ml-3 text-sm text-[#4A4A4A]">New Products</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showBestSellersOnly}
                        onChange={(e) => setShowBestSellersOnly(e.target.checked)}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                      />
                      <span className="ml-3 text-sm text-[#4A4A4A]">Best Sellers</span>
                    </label>
                  </div>
                </div>
              </div>
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
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
                
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-[#C8102E] shadow-sm' 
                        : 'text-[#4A4A4A]'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-[#C8102E] shadow-sm' 
                        : 'text-[#4A4A4A]'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#4A4A4A]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Results */}
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
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                      viewMode === 'list' ? 'flex items-center p-4' : 'p-4'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        {/* Grid View */}
                        <div className="relative">
                          <Link href={`/product/${product.id}`}>
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform cursor-pointer">
                              <span className="text-6xl">{product.image}</span>
                            </div>
                          </Link>
                          
                          {/* Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {product.isNew && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                New
                              </span>
                            )}
                            {product.isBestSeller && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Best Seller
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>

                          {/* Discount Badge */}
                          {product.originalPrice && (
                            <div className="absolute top-2 right-2 bg-[#C8102E] text-white px-2 py-1 rounded-full text-xs font-semibold">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </div>
                          )}

                          {/* Wishlist Button */}
                          <button
                            onClick={() => handleWishlistToggle(product)}
                            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                          >
                            <Heart className={`h-5 w-5 transition-colors ${
                              isInWishlist(product.id) 
                                ? 'fill-[#C8102E] text-[#C8102E]' 
                                : 'text-[#4A4A4A] hover:text-[#C8102E]'
                            }`} />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <Link href={`/product/${product.id}`}>
                            <h3 className="font-semibold text-[#000000] hover:text-[#C8102E] transition-colors cursor-pointer line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <p className="text-sm text-[#4A4A4A]">{product.brand}</p>
                          
                          <div className="flex items-center space-x-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-[#4A4A4A]">({product.reviews})</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-[#C8102E]">
                              R{product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-[#4A4A4A] line-through">
                                R{product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className="flex-shrink-0 mr-4">
                          <Link href={`/product/${product.id}`}>
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer">
                              <span className="text-3xl">{product.image}</span>
                            </div>
                          </Link>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link href={`/product/${product.id}`}>
                                <h3 className="font-semibold text-[#000000] hover:text-[#C8102E] transition-colors cursor-pointer">
                                  {product.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-[#4A4A4A]">{product.brand}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {product.isNew && (
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  New
                                </span>
                              )}
                              {product.isBestSeller && (
                                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Best Seller
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-[#4A4A4A]">({product.reviews})</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-[#C8102E]">
                                R{product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-[#4A4A4A] line-through">
                                  R{product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleWishlistToggle(product)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                              >
                                <Heart className={`h-5 w-5 transition-colors ${
                                  isInWishlist(product.id) 
                                    ? 'fill-[#C8102E] text-[#C8102E]' 
                                    : 'text-[#4A4A4A] hover:text-[#C8102E]'
                                }`} />
                              </button>
                              
                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                                className="bg-[#C8102E] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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
            
            <div className="p-4 space-y-6">
              {/* Same filter content as desktop, but mobile optimised */}
              {/* Categories */}
              <div>
                <h3 className="font-medium text-[#000000] mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                      />
                      <span className="ml-3 text-sm text-[#4A4A4A]">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-medium text-[#000000] mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                      />
                      <span className="ml-3 text-sm text-[#4A4A4A]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional mobile filter options... */}
              <div>
                <h3 className="font-medium text-[#000000] mb-3">Additional Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showInStockOnly}
                      onChange={(e) => setShowInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                    />
                    <span className="ml-3 text-sm text-[#4A4A4A]">In Stock Only</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showNewOnly}
                      onChange={(e) => setShowNewOnly(e.target.checked)}
                      className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                    />
                    <span className="ml-3 text-sm text-[#4A4A4A]">New Products</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBestSellersOnly}
                      onChange={(e) => setShowBestSellersOnly(e.target.checked)}
                      className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                    />
                    <span className="ml-3 text-sm text-[#4A4A4A]">Best Sellers</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
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
