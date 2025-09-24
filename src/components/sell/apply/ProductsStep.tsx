"use client";

import React from 'react';
import { Package, Globe } from 'lucide-react';
import { RadioButton } from '../../../components';
import { FormData } from './types';

interface ProductsStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ProductsStep: React.FC<ProductsStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
}) => {
  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Books",
    "Automotive", "Health", "Toys", "Jewelry", "Food & Beverages", "Other"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Package className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Product Information</h2>
        <p className="text-[#4A4A4A] text-lg">Tell us about what you want to sell</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Number of Unique Products
          </label>
          <input
            type="number"
            name="uniqueProducts"
            value={formData.uniqueProducts}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="How many different products do you offer?"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Primary Product Category <span className="text-red-500">*</span>
          </label>
          <select
            name="primaryCategory"
            value={formData.primaryCategory}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
          >
            <option value="">Select Primary Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.primaryCategory && <p className="text-red-500 text-sm mt-1">{errors.primaryCategory}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Do you carry or hold stock? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'whole-range', label: 'Yes, on my whole product range' },
              { value: 'some-range', label: 'Yes, on some of my product range' },
              { value: 'on-demand', label: 'No, I order or manufacture on demand' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`stockType-${option.value}`}
                name="stockType"
                value={option.value}
                checked={formData.stockType === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, stockType: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
          {errors.stockType && <p className="text-red-500 text-sm mt-2">{errors.stockType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Our finished products are best described as: <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'imported', label: 'Imported' },
              { value: 'manufactured-locally', label: 'Manufactured locally' },
              { value: 'mixture', label: 'A mixture of import and local manufacturers' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`productDescription-${option.value}`}
                name="productDescription"
                value={option.value}
                checked={formData.productDescription === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, productDescription: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
          {errors.productDescription && <p className="text-red-500 text-sm mt-2">{errors.productDescription}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Brand Names You Own
            </label>
            <textarea
              name="ownedBrands"
              value={formData.ownedBrands}
              onChange={onInputChange}
              rows={3}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="List brand names you own or hold trademarks for"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Brand Names You Resell
            </label>
            <textarea
              name="resellerBrands"
              value={formData.resellerBrands}
              onChange={onInputChange}
              rows={3}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="List brand names you resell or are licenced to use"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Website (Optional)
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={onInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Social Media Page (Optional)
            </label>
            <input
              type="url"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={onInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="Link to your social media page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsStep;
