"use client";

import { Search } from 'lucide-react';

interface NoResultsFoundProps {
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({
  activeFiltersCount,
  onClearFilters,
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="h-12 w-12 text-[#4A4A4A]" />
      </div>
      <h3 className="text-xl font-semibold text-[#000000] mb-2">No products found</h3>
      <p className="text-[#4A4A4A] mb-6">Try adjusting your search or filters</p>
      {activeFiltersCount > 0 && (
        <button
          onClick={onClearFilters}
          className="bg-[#C8102E] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default NoResultsFound;
