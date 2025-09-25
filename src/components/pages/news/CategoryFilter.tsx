"use client";

import { useState } from 'react';
import { Filter, ArrowRight } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mb-8">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#4A4A4A] hover:border-[#C8102E] transition-colors"
        >
          <span className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Category: {selectedCategory}
          </span>
          <ArrowRight className={`h-5 w-5 transform transition-transform ${showMobileFilters ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="hidden lg:flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-[#C8102E] text-white shadow-lg'
                : 'bg-white text-[#4A4A4A] border border-gray-300 hover:border-[#C8102E] hover:text-[#C8102E]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {showMobileFilters && (
        <div className="lg:hidden bg-white border border-gray-300 rounded-lg mt-2 p-4">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setShowMobileFilters(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#C8102E] text-white'
                    : 'bg-gray-100 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
