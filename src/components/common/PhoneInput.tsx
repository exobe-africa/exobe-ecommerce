"use client";

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface PhoneInputProps {
  id: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export default function PhoneInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "+27 11 123 4567",
  required = false,
  disabled = false,
  error,
  label,
  className = '',
  showIcon = true
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  const formatPhoneNumber = (input: string): string => {
    // Remove all non-digit characters
    const numbers = input.replace(/\D/g, '');
    
    let formattedNumbers = numbers;
    
    // Handle different input formats
    if (numbers.startsWith('27')) {
      formattedNumbers = numbers;
    } else if (numbers.startsWith('0')) {
      formattedNumbers = '27' + numbers.substring(1);
    } else if (numbers.length > 0 && !numbers.startsWith('27')) {
      formattedNumbers = '27' + numbers;
    }
    
    // Limit to 11 digits (27 + 9 digits)
    formattedNumbers = formattedNumbers.substring(0, 11);
    
    // Format as +27 XX XXX XXXX
    if (formattedNumbers.length >= 2) {
      let formatted = '+27';
      const remaining = formattedNumbers.substring(2);
      
      if (remaining.length > 0) {
        formatted += ' ' + remaining.substring(0, 2);
      }
      if (remaining.length > 2) {
        formatted += ' ' + remaining.substring(2, 5);
      }
      if (remaining.length > 5) {
        formatted += ' ' + remaining.substring(5, 9);
      }
      
      return formatted;
    }
    
    return formattedNumbers.length > 0 ? '+' + formattedNumbers : '';
  };

  const getCleanValue = (formatted: string): string => {
    const numbers = formatted.replace(/\D/g, '');
    if (numbers.startsWith('27')) {
      return '+' + numbers;
    }
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue);
    
    setDisplayValue(formatted);
    onChange(getCleanValue(formatted));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const handleInputBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  useEffect(() => {
    if (value !== getCleanValue(displayValue)) {
      const formatted = formatPhoneNumber(value);
      setDisplayValue(formatted);
    }
  }, [value]);

  const isValidSAPhoneNumber = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.startsWith('27') && numbers.length === 11;
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[#000000] mb-2">
          {label}
          {required && <span className="text-[#C8102E] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {showIcon && (
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
        )}
        
        <input
          type="tel"
          id={id}
          name={name}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-600 font-medium
            ${showIcon ? 'pl-12' : 'px-4'}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-600' : 'hover:border-gray-400'}
          `}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          <span className="text-lg">🇿🇦</span>
          <span className="text-xs text-[#4A4A4A] font-medium">ZA</span>
        </div>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      
      {displayValue && !error && (
        <div className="mt-1 flex items-center">
          {isValidSAPhoneNumber(displayValue) ? (
            <div className="flex items-center text-green-600 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Valid South African number
            </div>
          ) : displayValue.length > 4 ? (
            <div className="flex items-center text-orange-600 text-xs">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
              Please enter a valid SA number
            </div>
          ) : null}
        </div>
      )}
      
      {!displayValue && !error && (
        <p className="text-xs text-[#4A4A4A] mt-1">
          Format: +27 XX XXX XXXX (South African numbers only)
        </p>
      )}
    </div>
  );
}
