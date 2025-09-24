"use client";

import { ArrowUpDown } from 'lucide-react';

export interface SortOption {
  value: string;
  label: string;
  icon?: any;
}

export interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  label?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'full-width';
  className?: string;
  selectClassName?: string;
  placeholder?: string;
}

const SortDropdown = ({
  value,
  onChange,
  options,
  label = 'Sort by:',
  showIcon = true,
  showLabel = true,
  variant = 'default',
  className = '',
  selectClassName = '',
  placeholder = 'Select sort option'
}: SortDropdownProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'flex items-center space-x-2',
          select: 'text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white touch-manipulation'
        };
      case 'full-width':
        return {
          container: 'flex items-center space-x-2 flex-1 sm:flex-none',
          select: 'text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white flex-1 sm:flex-none touch-manipulation'
        };
      default:
        return {
          container: 'flex items-center space-x-4',
          select: 'px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {showLabel && (
        <span className="text-sm text-[#4A4A4A] whitespace-nowrap">
          {label}
        </span>
      )}
      
      {showIcon && variant !== 'default' && (
        <ArrowUpDown className="h-4 w-4 text-[#4A4A4A] hidden sm:block" />
      )}
      
      <select
        value={value}
        onChange={handleChange}
        className={`${styles.select} ${selectClassName}`}
        aria-label={label}
      >
        {placeholder && !value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
