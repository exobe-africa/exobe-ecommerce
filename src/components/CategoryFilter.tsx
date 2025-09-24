"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface CategoryItem {
  id: string;
  title: string;
  icon?: LucideIcon;
}

export interface CategoryFilterProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variant?: 'default' | 'dark' | 'light';
  size?: 'small' | 'medium' | 'large';
  showAllOption?: boolean;
  allOptionLabel?: string;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  showIcons?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  variant = 'default',
  size = 'medium',
  showAllOption = true,
  allOptionLabel = 'All Categories',
  className = '',
  layout = 'horizontal',
  showIcons = true,
}) => {
  const getButtonStyles = (isSelected: boolean) => {
    const baseStyles = "font-medium transition-all duration-300";
    
    // Size styles
    const sizeStyles = {
      small: "px-4 py-2 text-sm rounded-lg",
      medium: "px-6 py-3 text-base rounded-full",
      large: "px-8 py-4 text-lg rounded-full"
    };

    // Variant styles
    const variantStyles = {
      default: isSelected
        ? "bg-[#C8102E] text-white"
        : "bg-gray-100 text-[#4A4A4A] hover:bg-gray-200",
      dark: isSelected
        ? "bg-[#C8102E] text-white"
        : "bg-white/10 text-white hover:bg-white/20",
      light: isSelected
        ? "bg-[#C8102E] text-white"
        : "bg-white text-[#4A4A4A] hover:bg-gray-50 border border-gray-200"
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
  };

  const getContainerStyles = () => {
    const baseStyles = layout === 'horizontal' 
      ? "flex flex-wrap gap-3" 
      : "flex flex-col gap-2";
    
    const alignmentStyles = layout === 'horizontal' ? "justify-center" : "items-start";
    
    return `${baseStyles} ${alignmentStyles} ${className}`;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return "h-3 w-3";
      case 'large': return "h-5 w-5";
      default: return "h-4 w-4";
    }
  };

  return (
    <div className={getContainerStyles()}>
      {showAllOption && (
        <button
          onClick={() => onCategoryChange('')}
          className={getButtonStyles(selectedCategory === '')}
        >
          {allOptionLabel}
        </button>
      )}
      
      {categories.map((category) => {
        const IconComponent = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`${getButtonStyles(isSelected)} ${
              showIcons && IconComponent ? 'flex items-center space-x-2' : ''
            }`}
          >
            {showIcons && IconComponent && (
              <IconComponent className={getIconSize()} />
            )}
            <span>{category.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
