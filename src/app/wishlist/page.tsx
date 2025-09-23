"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Trash2, 
  ShoppingBag,
  ArrowRight,
  Filter,
  Grid,
  List,
  SortAsc,
  Calendar,
  DollarSign,
  Package,
  Share2,
  Eye,
  AlertCircle
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const sortOptions = [
  { value: 'newest', label: 'Recently Added', icon: Calendar },
  { value: 'oldest', label: 'Oldest First', icon: Calendar },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
  { value: 'name', label: 'Name A-Z', icon: SortAsc },
];

const filterOptions = [
  { value: 'all', label: 'All Items' },
  { value: 'in-stock', label: 'In Stock Only' },
  { value: 'on-sale', label: 'On Sale' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'sports', label: 'Sports' },
  { value: 'home-garden', label: 'Home & Garden' },
];

export default function WishlistPage() {
  const { state: wishlistState, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sort and filter items
  const sortedAndFilteredItems = [...wishlistState.items]
    .filter(item => {
      if (filterBy === 'all') return true;
      if (filterBy === 'in-stock') return item.inStock !== false;
      if (filterBy === 'on-sale') return item.originalPrice && item.originalPrice > item.price;
      return item.category === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'oldest':
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (item: typeof wishlistState.items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
    });
    
    setToast({
      message: `${item.name} added to cart!`,
      type: 'success'
    });

    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemoveFromWishlist = (item: typeof wishlistState.items[0]) => {
    removeItem(item.id);
    setToast({
      message: `${item.name} removed from wishlist`,
      type: 'info'
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddAllToCart = () => {
    const inStockItems = sortedAndFilteredItems.filter(item => item.inStock !== false);
    inStockItems.forEach(item => handleAddToCart(item));
    
    setToast({
      message: `${inStockItems.length} items added to cart!`,
      type: 'success'
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleClearWishlist = () => {
    setShowClearConfirm(true);
  };

  const confirmClearWishlist = () => {
    clearWishlist();
    setShowClearConfirm(false);
    setToast({
      message: 'Wishlist cleared successfully',
      type: 'info'
    });
    setTimeout(() => setToast(null), 3000);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Recently added';
    }
  };

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4 h-96">
                  <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#4A4A4A] mb-6">
            <Link href="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#000000] font-medium">My Wishlist</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#F6E2E0] rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-[#C8102E]" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#000000]">My Wishlist</h1>
                <p className="text-[#4A4A4A]">
                  {wishlistState.totalItems} {wishlistState.totalItems === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
            </div>

            {wishlistState.totalItems > 0 && (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={handleAddAllToCart}
                  className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add All to Cart
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="border-2 border-[#4A4A4A] text-[#4A4A4A] px-6 py-3 rounded-full font-semibold hover:bg-[#4A4A4A] hover:text-white transition-colors flex items-center"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {wishlistState.totalItems === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#F6E2E0] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-[#C8102E]" />
            </div>
            <h2 className="text-3xl font-bold text-[#000000] mb-4">Your Wishlist is Empty</h2>
            <p className="text-lg text-[#4A4A4A] mb-8 max-w-md mx-auto">
              Start adding items you love to your wishlist. They'll appear here so you can easily find them later.
            </p>
            
            <div className="space-y-4">
              <Link href="/categories">
                <button className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </Link>
              
              <div className="flex justify-center space-x-6 text-sm text-[#4A4A4A]">
                <Link href="/categories/electronics" className="hover:text-[#C8102E] transition-colors">Electronics</Link>
                <Link href="/categories/fashion" className="hover:text-[#C8102E] transition-colors">Fashion</Link>
                <Link href="/categories/sports" className="hover:text-[#C8102E] transition-colors">Sports</Link>
                <Link href="/categories/home-garden" className="hover:text-[#C8102E] transition-colors">Home & Garden</Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-[#4A4A4A] font-medium">
                    Showing {sortedAndFilteredItems.length} of {wishlistState.totalItems} items
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="md:hidden bg-[#4A4A4A] text-white px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </button>

                  {/* Desktop Filters */}
                  <div className="hidden md:flex items-center space-x-4">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
                    >
                      {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-[#C8102E] shadow-sm' 
                          : 'text-[#4A4A4A] hover:text-[#C8102E]'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-[#C8102E] shadow-sm' 
                          : 'text-[#4A4A4A] hover:text-[#C8102E]'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="md:hidden mt-4 flex space-x-3">
                <button
                  onClick={handleAddAllToCart}
                  className="flex-1 bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="px-4 py-3 border border-[#4A4A4A] text-[#4A4A4A] rounded-lg hover:bg-[#4A4A4A] hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Wishlist Items */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {sortedAndFilteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200">
                    <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 h-48 flex items-center justify-center cursor-pointer" onClick={() => window.location.href = `/product/${item.id}`}>
                      <span className="text-4xl">{item.image}</span>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-semibold">
                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </span>
                        )}
                        {item.inStock === false && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Share functionality
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                          title="Share"
                        >
                          <Share2 className="h-4 w-4 text-[#4A4A4A]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `/product/${item.id}`;
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                          title="View Product"
                        >
                          <Eye className="h-4 w-4 text-[#4A4A4A]" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-semibold text-[#000000] mb-2 hover:text-[#C8102E] transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center mb-2 sm:mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs sm:text-sm text-[#4A4A4A] ml-1 sm:ml-2">
                          ({item.reviews || 0})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                          <span className="text-base sm:text-lg font-bold text-[#C8102E]">
                            R{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs sm:text-sm text-[#4A4A4A] line-through ml-1 sm:ml-2">
                              R{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-[#4A4A4A] mb-3 sm:mb-4">
                        Added {formatDate(item.addedAt)}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={item.inStock === false}
                          className={`flex-1 py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm ${
                            item.inStock === false
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item)}
                          className="sm:w-auto w-full py-2.5 sm:py-2 px-3 sm:px-2 border border-gray-300 rounded-lg text-[#4A4A4A] hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center sm:justify-center text-sm"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4 sm:mr-0 mr-2" />
                          <span className="sm:hidden">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3 sm:space-y-4">
                {sortedAndFilteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="relative w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => window.location.href = `/product/${item.id}`}>
                        <span className="text-2xl">{item.image}</span>
                        {item.inStock === false && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-[#000000] mb-2 hover:text-[#C8102E] transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-[#4A4A4A] ml-2">
                            ({item.reviews || 0} reviews)
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-2">
                          <div>
                            <span className="text-xl font-bold text-[#C8102E]">
                              R{item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-[#4A4A4A] line-through ml-2">
                                R{item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-semibold">
                              Save R{(item.originalPrice - item.price).toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-[#4A4A4A]">
                          Added to wishlist on {formatDate(item.addedAt)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-col space-y-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={item.inStock === false}
                          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center text-sm ${
                            item.inStock === false
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item)}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-[#4A4A4A] hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center text-sm"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedAndFilteredItems.length === 0 && wishlistState.totalItems > 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-[#4A4A4A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#000000] mb-2">No items match your filters</h3>
                <p className="text-[#4A4A4A] mb-4">Try adjusting your filter or sort options.</p>
                <button
                  onClick={() => {
                    setFilterBy('all');
                    setSortBy('newest');
                  }}
                  className="bg-[#C8102E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#000000]">Filters & Sort</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-3">Filter by</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-3">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-[#C8102E] text-white py-4 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Clear Wishlist Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearWishlist}
        title="Clear Wishlist?"
        message="Are you sure you want to remove all items from your wishlist? This action cannot be undone."
        confirmText="Clear Wishlist"
        cancelText="Cancel"
        icon={Trash2}
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
        confirmButtonColor="bg-red-500"
        confirmButtonHoverColor="hover:bg-red-600"
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${
          toast.type === 'success' ? 'bg-green-500' : 
          toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {toast.message}
        </div>
      )}

      <Footer />
    </div>
  );
}
