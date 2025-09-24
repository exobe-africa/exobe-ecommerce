"use client";

import { Filter, ShoppingCart, Trash2 } from 'lucide-react';
import { SortDropdown, ViewModeToggle } from '../../common/index';

interface FilterOption {
  value: string;
  label: string;
}

interface SortOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

interface WishlistToolbarProps {
  totalItems: number;
  filteredItemsCount: number;
  filterBy: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
  filterOptions: FilterOption[];
  sortOptions: SortOption[];
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onShowMobileFilters: () => void;
  onAddAllToCart: () => void;
  onClearWishlist: () => void;
}

const WishlistToolbar: React.FC<WishlistToolbarProps> = ({
  totalItems,
  filteredItemsCount,
  filterBy,
  sortBy,
  viewMode,
  filterOptions,
  sortOptions,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  onShowMobileFilters,
  onAddAllToCart,
  onClearWishlist
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-[#4A4A4A] font-medium">
            Showing {filteredItemsCount} of {totalItems} items
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onShowMobileFilters}
            className="md:hidden bg-[#4A4A4A] text-white px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <select
              value={filterBy}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <SortDropdown
              value={sortBy}
              onChange={onSortChange}
              options={sortOptions}
              variant="compact"
              showLabel={false}
              showIcon={false}
              selectClassName="px-4 py-2 text-[#000000]"
            />
          </div>

          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            variant="wishlist"
            gridIcon="grid"
          />
        </div>
      </div>

      <div className="md:hidden mt-4 flex space-x-3">
        <button
          onClick={onAddAllToCart}
          className="flex-1 bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add All to Cart
        </button>
        <button
          onClick={onClearWishlist}
          className="px-4 py-3 border border-[#4A4A4A] text-[#4A4A4A] rounded-lg hover:bg-[#4A4A4A] hover:text-white transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WishlistToolbar;
