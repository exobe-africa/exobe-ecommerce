"use client";

import { ViewModeToggle } from '../../common/index';

interface SearchHeaderProps {
  query: string;
  resultsCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  resultsCount,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#000000]">
              {query ? `Search results for "${query}"` : 'All Products'}
            </h1>
            <p className="text-[#4A4A4A] mt-1">
              {resultsCount} product{resultsCount !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            variant="search"
            hideOnMobile={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
