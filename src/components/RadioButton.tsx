"use client";

import React from 'react';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string | React.ReactNode;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  className?: string;
  labelClassName?: string;
}

export default function RadioButton({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  variant = 'default',
  className = '',
  labelClassName = ''
}: RadioButtonProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const containerClasses = {
    default: 'flex items-center cursor-pointer',
    card: 'flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors'
  };

  return (
    <label 
      className={`${containerClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      htmlFor={id}
    >
      <div className="relative flex items-center">
        {/* Hidden native radio input */}
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />
        
        {/* Custom radio button */}
        <div className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-2 
          flex 
          items-center 
          justify-center 
          transition-all 
          duration-200
          ${checked 
            ? 'border-[#C8102E] bg-[#C8102E]' 
            : 'border-gray-300 bg-white hover:border-[#C8102E]'
          }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}>
          {/* Inner dot */}
          <div className={`
            rounded-full 
            bg-white 
            transition-all 
            duration-200
            ${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'}
            ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
          `} />
        </div>
      </div>

      {/* Label and description */}
      <div className={`ml-3 ${variant === 'card' ? 'flex-1' : ''}`}>
        <div className={`
          font-medium 
          text-[#000000] 
          ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
          ${labelClassName}
        `}>
          {label}
        </div>
        {description && (
          <div className={`
            text-[#4A4A4A] 
            mt-1
            ${size === 'sm' ? 'text-xs' : 'text-sm'}
          `}>
            {description}
          </div>
        )}
      </div>
    </label>
  );
}
