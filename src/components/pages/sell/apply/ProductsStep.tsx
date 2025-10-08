"use client";

import React from 'react';
import { Package, Globe } from 'lucide-react';
import { RadioButton } from '../../../common';
import { FormData } from './types';

interface ProductsStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onInputBlur: (fieldName: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ProductsStep: React.FC<ProductsStepProps> = ({
  formData,
  errors,
  onInputChange,
  onInputBlur,
  setFormData
}) => {
  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Books",
    "Automotive", "Health", "Toys", "Jewelry", "Food & Beverages", "Other"
  ];

  const isRetailer = formData.sellerType === 'retailer';
  const isWholesaler = formData.sellerType === 'wholesaler';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Package className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">
          {isRetailer ? 'Product Information' : 'Wholesale Product Information'}
        </h2>
        <p className="text-[#4A4A4A] text-lg">
          {isRetailer 
            ? 'Tell us about what you want to sell to consumers' 
            : 'Tell us about what you want to supply to retailers'
          }
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            {isWholesaler ? 'Number of Product Lines/SKUs' : 'Number of Unique Products'}
          </label>
          <input
            type="number"
            name="uniqueProducts"
            value={formData.uniqueProducts}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder={isWholesaler 
              ? "How many different product lines do you supply?" 
              : "How many different products do you offer?"
            }
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
            onBlur={() => onInputBlur('primaryCategory')}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
              errors.primaryCategory ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
            }`}
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
            {isWholesaler 
              ? 'Do you maintain inventory for bulk orders?' 
              : 'Do you carry or hold stock?'
            } <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {(isWholesaler ? [
              { value: 'large-inventory', label: 'Yes, I maintain large inventory for immediate fulfillment' },
              { value: 'moderate-inventory', label: 'Yes, I maintain moderate inventory with 7-14 day lead times' },
              { value: 'on-demand-bulk', label: 'No, I manufacture/source to order for bulk quantities' },
              { value: 'dropship-wholesale', label: 'I offer dropshipping services to retailers' }
            ] : [
              { value: 'whole-range', label: 'Yes, on my whole product range' },
              { value: 'some-range', label: 'Yes, on some of my product range' },
              { value: 'on-demand', label: 'No, I order or manufacture on demand' }
            ]).map((option) => (
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
            {isWholesaler 
              ? 'Your products are best described as:' 
              : 'Our finished products are best described as:'
            } <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {(isWholesaler ? [
              { value: 'manufactured-own', label: 'Manufactured by us (OEM/Private Label)' },
              { value: 'imported-exclusive', label: 'Imported with exclusive distribution rights' },
              { value: 'imported-non-exclusive', label: 'Imported products (non-exclusive)' },
              { value: 'local-sourced', label: 'Sourced from local manufacturers' },
              { value: 'mixture-wholesale', label: 'A mixture of the above' }
            ] : [
              { value: 'imported', label: 'Imported' },
              { value: 'manufactured-locally', label: 'Manufactured locally' },
              { value: 'mixture', label: 'A mixture of import and local manufacturers' }
            ]).map((option) => (
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

        {/* Minimum Order Quantities for Wholesalers */}
        {isWholesaler && (
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-4">
              What are your typical minimum order quantities?
            </label>
            <div className="space-y-3">
              {[
                { value: 'low-moq', label: 'Low MOQ (1-50 units per SKU)' },
                { value: 'medium-moq', label: 'Medium MOQ (51-200 units per SKU)' },
                { value: 'high-moq', label: 'High MOQ (200+ units per SKU)' },
                { value: 'flexible-moq', label: 'Flexible MOQ based on product and relationship' }
              ].map((option) => (
                <RadioButton
                  key={option.value}
                  id={`moq-${option.value}`}
                  name="minimumOrderQty"
                  value={option.value}
                  checked={formData.minimumOrderQty === option.value}
                  onChange={(value) => setFormData(prev => ({ ...prev, minimumOrderQty: value }))}
                  label={option.label}
                  variant="card"
                  size="md"
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              {isWholesaler ? 'Brand Names You Manufacture/Distribute' : 'Brand Names You Own'}
            </label>
            <textarea
              name="ownedBrands"
              value={formData.ownedBrands}
              onChange={onInputChange}
              rows={3}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder={isWholesaler 
                ? "List brand names you manufacture or have distribution rights for"
                : "List brand names you own or hold trademarks for"
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              {isWholesaler ? 'Brand Names You Supply (Licensed)' : 'Brand Names You Resell'}
            </label>
            <textarea
              name="resellerBrands"
              value={formData.resellerBrands}
              onChange={onInputChange}
              rows={3}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder={isWholesaler
                ? "List brand names you supply under license or agreement"
                : "List brand names you resell or are licenced to use"
              }
            />
          </div>
        </div>

        {/* Lead Times for Wholesalers */}
        {isWholesaler && (
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Typical Lead Times for Order Fulfillment
            </label>
            <select
              name="leadTimes"
              value={formData.leadTimes || ''}
              onChange={onInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            >
              <option value="">Select Typical Lead Time</option>
              <option value="1-3-days">1-3 business days</option>
              <option value="4-7-days">4-7 business days</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="3-4-weeks">3-4 weeks</option>
              <option value="4-weeks-plus">4+ weeks</option>
              <option value="varies">Varies by product</option>
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              {isWholesaler ? 'Company Website' : 'Website (Optional)'}
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={onInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              {isWholesaler ? 'Business LinkedIn/Social Media' : 'Social Media Page (Optional)'}
            </label>
            <input
              type="url"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={onInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder={isWholesaler 
                ? "LinkedIn company page or business social media"
                : "Link to your social media page"
              }
            />
          </div>
        </div>

        {/* Additional context for wholesalers */}
        {isWholesaler && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Wholesaler Requirements:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Ability to fulfill bulk orders consistently</li>
              <li>• Competitive wholesale pricing structure</li>
              <li>• Quality control and product standards compliance</li>
              <li>• Reliable supply chain and inventory management</li>
              <li>• Professional business operations and documentation</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsStep;
