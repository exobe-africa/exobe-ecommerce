"use client";

import { useEffect } from 'react';
import { SortDropdown } from '../../common/index';
import { useUI } from '../../../context/UIContext';

interface FilterOption {
  value: string;
  label: string;
}

interface SortOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

interface MobileFiltersModalProps {
  isOpen: boolean;
  filterBy: string;
  sortBy: string;
  filterOptions: FilterOption[];
  sortOptions: SortOption[];
  onClose: () => void;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  isOpen,
  filterBy,
  sortBy,
  filterOptions,
  sortOptions,
  onClose,
  onFilterChange,
  onSortChange
}) => {
  const { setWishlistFiltersOpen } = useUI();

  useEffect(() => {
    if (setWishlistFiltersOpen) {
      setWishlistFiltersOpen(isOpen);
    }
  }, [isOpen, setWishlistFiltersOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#000000]">Filters & Sort</h3>
          <button
            onClick={onClose}
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
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-3">Sort by</label>
            <SortDropdown
              value={sortBy}
              onChange={onSortChange}
              options={sortOptions}
              variant="compact"
              showLabel={false}
              showIcon={false}
              selectClassName="w-full px-4 py-3 text-[#000000]"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#C8102E] text-white py-4 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors mt-6"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MobileFiltersModal;
