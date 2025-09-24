"use client";

import { SlidersHorizontal } from 'lucide-react';
import { SortDropdown, ViewModeToggle } from '../../common/index';

interface SortOption {
  value: string;
  label: string;
}

interface SearchToolbarProps {
  onShowMobileFilters: () => void;
  activeFiltersCount: number;
  
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
  
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  
  isMobile?: boolean;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  onShowMobileFilters,
  activeFiltersCount,
  sortBy,
  onSortChange,
  sortOptions,
  viewMode,
  onViewModeChange,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <button
          onClick={onShowMobileFilters}
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
            onChange={onSortChange}
            options={sortOptions}
            variant="compact"
            showLabel={false}
            showIcon={false}
          />
          
          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            variant="search"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center justify-between mb-6">
      <SortDropdown
        value={sortBy}
        onChange={onSortChange}
        options={sortOptions}
        variant="default"
        showLabel={true}
        showIcon={false}
      />
    </div>
  );
};

export default SearchToolbar;
