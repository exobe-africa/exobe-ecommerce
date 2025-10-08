"use client";

import React from 'react';
import { MapPin } from 'lucide-react';
import { FormData } from './types';

interface AddressStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onInputBlur: (fieldName: string) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({
  formData,
  errors,
  onInputChange,
  onInputBlur
}) => {
  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <MapPin className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Business Address</h2>
        <p className="text-[#4A4A4A] text-lg">Where is your business located</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            onBlur={() => onInputBlur('address')}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
              errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
            }`}
            placeholder="Enter your business address (street name and number)"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              onBlur={() => onInputBlur('city')}
              className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
                errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
              }`}
              placeholder="City (e.g. Johannesburg)"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Province <span className="text-red-500">*</span>
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={onInputChange}
              onBlur={() => onInputBlur('province')}
              className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
                errors.province ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
              }`}
            >
              <option value="">Select Province</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={onInputChange}
              onBlur={() => onInputBlur('postalCode')}
              className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
                errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
              }`}
              placeholder="Postal Code (4 digits)"
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
