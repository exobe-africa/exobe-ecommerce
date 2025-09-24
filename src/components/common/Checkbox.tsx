"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | React.ReactNode;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success';
  className?: string;
  labelClassName?: string;
}

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  description,
  required = false,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
  labelClassName = ''
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSizeClasses = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  const variantClasses = {
    default: {
      unchecked: 'border-gray-300 bg-white',
      checked: 'border-gray-600 bg-gray-600',
      focus: 'focus:ring-gray-500',
      hover: 'hover:border-gray-400'
    },
    primary: {
      unchecked: 'border-gray-300 bg-white',
      checked: 'border-[#C8102E] bg-[#C8102E]',
      focus: 'focus:ring-[#C8102E]',
      hover: 'hover:border-[#C8102E]'
    },
    success: {
      unchecked: 'border-gray-300 bg-white',
      checked: 'border-green-600 bg-green-600',
      focus: 'focus:ring-green-500',
      hover: 'hover:border-green-400'
    }
  };

  const currentVariant = variantClasses[variant];

  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            className="sr-only"
          />
          <label
            htmlFor={id}
            className={`
              ${sizeClasses[size]}
              border-2 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-center
              ${checked ? currentVariant.checked : currentVariant.unchecked}
              ${currentVariant.focus} ${currentVariant.hover}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'shadow-sm hover:shadow-md'}
              focus-within:ring-2 focus-within:ring-offset-2
            `}
          >
            {checked && (
              <Check 
                className={`${iconSizeClasses[size]} text-white transition-all duration-200 transform scale-100`}
                strokeWidth={3}
              />
            )}
          </label>
        </div>
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={id}
              className={`
                block font-medium cursor-pointer transition-colors duration-200
                ${disabled ? 'text-gray-400' : 'text-[#000000] hover:text-[#C8102E]'}
                ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
                ${labelClassName}
              `}
            >
              {label}
              {required && <span className="text-[#C8102E] ml-1">*</span>}
            </label>
          )}
          
          {description && (
            <p className={`
              mt-1 text-sm text-[#4A4A4A] leading-relaxed
              ${disabled ? 'opacity-50' : ''}
            `}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
