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
import { useWishlistStore } from '../../store/wishlist';
import { useAuthStore } from '../../store/auth';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import WishlistAuthModal from '../../components/common/WishlistAuthModal';

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
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const {
    wishlist,
    isLoading,
    error,
    fetchWishlist,
    removeFromWishlist,
  } = useWishlistStore();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hasTriedFetch, setHasTriedFetch] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;
    
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    const loadWishlist = async () => {
      setHasTriedFetch(true);
      await fetchWishlist();
    };
    loadWishlist();
  }, [hasHydrated, isAuthenticated, router, fetchWishlist]);

  const [isClient, setIsClient] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const items = wishlist?.items || [];
  const totalItems = (typeof wishlist?.count === 'number') ? (wishlist?.count as number) : items.length;
  const isEmpty = totalItems === 0;

  const sortedAndFilteredItems = items
    .filter(item => {
      if (filterBy === 'all') return true;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'price-low':
          return a.product_id.localeCompare(b.product_id); // TODO: Fix when product details are available
        case 'price-high':
          return b.product_id.localeCompare(a.product_id); // TODO: Fix when product details are available
        case 'name':
          return a.product_id.localeCompare(b.product_id); // TODO: Fix when product details are available
        default:
          return 0;
      }
    });

  const handleAddToCart = (item: NonNullable<typeof items>[0]) => {
    const p: any = (item as any).product || {};
    const price = typeof p?.priceInCents === 'number'
      ? p.priceInCents / 100
      : (Array.isArray(p?.variants) && p.variants[0]?.priceCents)
      ? p.variants[0].priceCents / 100
      : 0;

    const stock = typeof p?.stockQuantity === 'number'
      ? p.stockQuantity
      : (Array.isArray(p?.variants) && typeof p.variants[0]?.stockQuantity === 'number')
      ? p.variants[0].stockQuantity
      : undefined;

    const image = p?.media?.[0]?.url || '';
    const name = p?.title || `Product ${item.product_id}`;
    const category = p?.category?.name || '';

    addItem({
      id: item.product_id,
      name,
      price,
      originalPrice: (typeof p?.compareAtPriceInCents === 'number')
        ? p.compareAtPriceInCents / 100
        : (Array.isArray(p?.variants) && p.variants[0]?.compareAtPriceCents)
        ? p.variants[0].compareAtPriceCents / 100
        : undefined,
      image,
      category,
      stock,
      // If wishlist item is tied to a variant, capture its attributes as the cart variant descriptor
      variant: (item as any).product_variant_id && p?.variants
        ? (p.variants.find((v: any) => v.id === (item as any).product_variant_id)?.attributes || {})
        : undefined,
      availableLocations: p?.availableLocations || [],
    });
  };

  const handleRemoveFromWishlist = async (item: NonNullable<typeof items>[0]) => {
    setRemovingItemId(item.id);
    try {
      await removeFromWishlist(item.product_id, item.product_variant_id || undefined);
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleAddAllToCart = () => {
    // For now, add all items since we don't have stock info in the new structure
    sortedAndFilteredItems.forEach(item => handleAddToCart(item));
  };

  const handleClearWishlist = () => {
    setShowClearConfirm(true);
  };

  const confirmClearWishlist = () => {
    sortedAndFilteredItems.forEach(item => {
      removeFromWishlist(item.product_id, item.product_variant_id || undefined);
    });
    setShowClearConfirm(false);
  };

  if (!isClient || !hasHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse" />
                <div>
                  <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="hidden md:flex gap-3">
                <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-12 w-32 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <div className="bg-gray-200 h-48 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'My Wishlist', isCurrentPage: true }
            ]}
            className="mb-6"
          />

          <PageHeader
            title="My Wishlist"
            description={`${totalItems} ${totalItems === 1 ? 'item' : 'items'} saved for later`}
            iconComponent={Heart}
            variant="wishlist"
            size="large"
            actions={
              totalItems > 0 ? (
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isEmpty ? (
          <EmptyWishlistState />
        ) : (
          <>
            <WishlistToolbar
              totalItems={totalItems}
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
              totalItems={totalItems}
              onAddToCart={handleAddToCart}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              removingItemId={removingItemId}
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

      {/* Loading Overlay for Removing Item */}
      {removingItemId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4 min-w-[300px]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-lg font-medium text-gray-900">Removing from wishlist...</p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        </div>
      )}
    </div>
  );
}
