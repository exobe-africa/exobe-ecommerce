"use client";

import { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Calendar,
  DollarSign,
  SortAsc
} from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { Breadcrumb, PageHeader } from '../../components/common';
import { 
  EmptyWishlistState, 
  WishlistToolbar, 
  WishlistGrid, 
  MobileFiltersModal 
} from '../../components/pages/wishlist';
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
  };

  const handleRemoveFromWishlist = (item: typeof wishlistState.items[0]) => {
    removeItem(item.id);
  };

  const handleAddAllToCart = () => {
    const inStockItems = sortedAndFilteredItems.filter(item => item.inStock !== false);
    inStockItems.forEach(item => handleAddToCart(item));
  };

  const handleClearWishlist = () => {
    setShowClearConfirm(true);
  };

  const confirmClearWishlist = () => {
    clearWishlist();
    setShowClearConfirm(false);
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

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'My Wishlist', isCurrentPage: true }
            ]}
            className="mb-6"
          />

          <PageHeader
            title="My Wishlist"
            description={`${wishlistState.totalItems} ${wishlistState.totalItems === 1 ? 'item' : 'items'} saved for later`}
            iconComponent={Heart}
            variant="wishlist"
            size="large"
            actions={
              wishlistState.totalItems > 0 ? (
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
              ) : undefined
            }
          />
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {wishlistState.totalItems === 0 ? (
          <EmptyWishlistState />
        ) : (
          <>
            <WishlistToolbar
              totalItems={wishlistState.totalItems}
              filteredItemsCount={sortedAndFilteredItems.length}
              filterBy={filterBy}
              sortBy={sortBy}
              viewMode={viewMode}
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              onFilterChange={setFilterBy}
              onSortChange={setSortBy}
              onViewModeChange={setViewMode}
              onShowMobileFilters={() => setShowMobileFilters(true)}
              onAddAllToCart={handleAddAllToCart}
              onClearWishlist={handleClearWishlist}
            />

            <WishlistGrid
              items={sortedAndFilteredItems}
              viewMode={viewMode}
              totalItems={wishlistState.totalItems}
              onAddToCart={handleAddToCart}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onClearFilters={() => {
                setFilterBy('all');
                setSortBy('newest');
              }}
            />
          </>
        )}
      </div>

      <MobileFiltersModal
        isOpen={showMobileFilters}
        filterBy={filterBy}
        sortBy={sortBy}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        onClose={() => setShowMobileFilters(false)}
        onFilterChange={setFilterBy}
        onSortChange={setSortBy}
      />

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

    </div>
  );
}
