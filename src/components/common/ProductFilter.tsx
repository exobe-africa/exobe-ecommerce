"use client";

import { useState } from 'react';
import { Star, X, SlidersHorizontal } from 'lucide-react';

interface FilterProps {
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
  
  selectedCategories?: string[];
  setSelectedCategories?: (categories: string[]) => void;
  
  brands: string[];
  categories?: string[];
  
  clearFilters: () => void;
  activeFiltersCount: number;
  
  isMobile?: boolean;
  onCloseMobile?: () => void;
  
  resultsCount?: number;
}

export default function ProductFilter({
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
  isMobile = false,
  onCloseMobile,
  resultsCount = 0
}: FilterProps) {
  
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (!selectedCategories || !setSelectedCategories) return;
    
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <div className={`${isMobile ? 'fixed inset-0 bg-white z-50 overflow-y-auto' : 'sticky top-4'}`}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h3 className="text-lg font-semibold text-[#000000]">Filters</h3>
          <button
            onClick={onCloseMobile}
            className="p-3 hover:bg-gray-100 rounded-full touch-manipulation"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
      
      <div className={`space-y-6 ${isMobile ? 'p-4' : ''}`}>
        {activeFiltersCount > 0 && (
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[#000000]">Active Filters ({activeFiltersCount})</h4>
              <button
                onClick={clearFilters}
                className="text-sm text-[#C8102E] hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {categories && selectedCategories && setSelectedCategories && (
          <div>
            <h4 className="font-medium text-[#000000] mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                  />
                  <span className="ml-3 text-sm text-[#4A4A4A]">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium text-[#000000] mb-3">Brand</h4>
          {brands.length > 5 ? (
            <select
              value={selectedBrands[0] || 'All Brands'}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'All Brands') {
                  setSelectedBrands([]);
                } else {
                  setSelectedBrands([value]);
                }
              }}
              className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] touch-manipulation bg-white"
            >
              <option value="All Brands">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          ) : (
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => handleBrandChange(brand, e.target.checked)}
                    className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                  />
                  <span className="ml-3 text-sm text-[#4A4A4A]">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-medium text-[#000000] mb-3">Price Range</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="30000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-[#C8102E]"
            />
            <div className="flex justify-between text-sm text-[#4A4A4A]">
              <span>R{priceRange[0]}</span>
              <span>R{priceRange[1]}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
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

        <div>
          <h4 className="font-medium text-[#000000] mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map(rating => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="text-[#C8102E] focus:ring-[#C8102E]"
                />
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-[#4A4A4A]">
                    {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-[#000000] mb-3">Availability & Special</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="text-[#C8102E] focus:ring-[#C8102E] rounded"
              />
              <span className="text-sm text-[#4A4A4A]">In Stock Only</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showNewOnly}
                onChange={(e) => setShowNewOnly(e.target.checked)}
                className="text-[#C8102E] focus:ring-[#C8102E] rounded"
              />
              <span className="text-sm text-[#4A4A4A]">New Arrivals</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBestSellersOnly}
                onChange={(e) => setShowBestSellersOnly(e.target.checked)}
                className="text-[#C8102E] focus:ring-[#C8102E] rounded"
              />
              <span className="text-sm text-[#4A4A4A]">Best Sellers</span>
            </label>
          </div>
        </div>

        {isMobile && (
          <div className="pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <div className="space-y-3">
              <button
                onClick={onCloseMobile}
                className="w-full bg-[#C8102E] text-white py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg touch-manipulation"
              >
                Apply Filters ({resultsCount} products)
              </button>
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    clearFilters();
                    onCloseMobile?.();
                  }}
                  className="w-full border-2 border-[#4A4A4A] text-[#4A4A4A] py-3 rounded-full font-medium hover:bg-[#4A4A4A] hover:text-white transition-colors touch-manipulation"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
