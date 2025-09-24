"use client";

import { X } from 'lucide-react';
import { ProductFilter } from '../index';

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  showInStockOnly: boolean;
  setShowInStockOnly: (show: boolean) => void;
  showNewOnly: boolean;
  setShowNewOnly: (show: boolean) => void;
  showBestSellersOnly: boolean;
  setShowBestSellersOnly: (show: boolean) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  
  brands: string[];
  categories: string[];
  
  clearFilters: () => void;
  activeFiltersCount: number;
  resultsCount: number;
}

const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  isOpen,
  onClose,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  showInStockOnly,
  setShowInStockOnly,
  showNewOnly,
  setShowNewOnly,
  showBestSellersOnly,
  setShowBestSellersOnly,
  selectedCategories,
  setSelectedCategories,
  brands,
  categories,
  clearFilters,
  activeFiltersCount,
  resultsCount,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#000000]">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-[#4A4A4A]" />
          </button>
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
          clearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
          isMobile={true}
          onCloseMobile={onClose}
          resultsCount={resultsCount}
        />
      </div>
    </>
  );
};

export default MobileFiltersModal;
