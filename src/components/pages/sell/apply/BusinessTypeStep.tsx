"use client";

import React from 'react';
import { Building, Store, Warehouse } from 'lucide-react';
import { RadioButton } from '../../../common';
import { FormData } from './types';

interface BusinessTypeStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BusinessTypeStep: React.FC<BusinessTypeStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Building className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Business Type</h2>
        <p className="text-[#4A4A4A] text-lg">Tell us about your business structure</p>
      </div>

      <div className="space-y-8">
        {/* Seller Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Are you applying as a Retailer or Wholesaler? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setFormData(prev => ({ ...prev, sellerType: 'retailer' }))}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.sellerType === 'retailer' 
                  ? 'border-[#C8102E] bg-[#F6E2E0]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  formData.sellerType === 'retailer' 
                    ? 'bg-[#C8102E] text-white' 
                    : 'bg-gray-100 text-[#4A4A4A]'
                }`}>
                  <Store className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    formData.sellerType === 'retailer' ? 'text-[#C8102E]' : 'text-[#000000]'
                  }`}>
                    Retailer
                  </h3>
                  <p className="text-[#4A4A4A] text-sm mt-1">
                    Sell directly to consumers on our marketplace. Perfect for brands, manufacturers, and resellers looking to reach end customers.
                  </p>
                  <ul className="text-xs text-[#4A4A4A] mt-3 space-y-1">
                    <li>• Direct-to-consumer sales</li>
                    <li>• Product listings on marketplace</li>
                    <li>• Customer service support</li>
                    <li>• Marketing and promotional tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              onClick={() => setFormData(prev => ({ ...prev, sellerType: 'wholesaler' }))}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.sellerType === 'wholesaler' 
                  ? 'border-[#C8102E] bg-[#F6E2E0]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  formData.sellerType === 'wholesaler' 
                    ? 'bg-[#C8102E] text-white' 
                    : 'bg-gray-100 text-[#4A4A4A]'
                }`}>
                  <Warehouse className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    formData.sellerType === 'wholesaler' ? 'text-[#C8102E]' : 'text-[#000000]'
                  }`}>
                    Wholesaler
                  </h3>
                  <p className="text-[#4A4A4A] text-sm mt-1">
                    Supply products in bulk to retailers on our platform. Ideal for manufacturers, distributors, and suppliers.
                  </p>
                  <ul className="text-xs text-[#4A4A4A] mt-3 space-y-1">
                    <li>• Bulk sales to retailers</li>
                    <li>• B2B marketplace access</li>
                    <li>• Volume pricing tools</li>
                    <li>• Retailer network access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {errors.sellerType && <p className="text-red-500 text-sm mt-2">{errors.sellerType}</p>}
        </div>

        {/* Show tailored questions based on selection */}
        {formData.sellerType && (
          <>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-4">
                {formData.sellerType === 'retailer' ? 'How are you applying as a retailer?' : 'How are you applying as a wholesaler?'} <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {(formData.sellerType === 'retailer' ? [
                  { value: 'individual', label: 'Individual Seller (Sole Proprietor)', description: 'Selling as an individual with personal products or small inventory' },
                  { value: 'registered', label: 'Registered Business', description: 'Established business with formal registration and business operations' },
                  { value: 'brand', label: 'Brand/Manufacturer', description: 'Own brand or manufacturing company selling directly to consumers' },
                  { value: 'international', label: 'International Retailer', description: 'Non-South African business wanting to sell to SA consumers' }
                ] : [
                  { value: 'manufacturer', label: 'Manufacturer', description: 'Produce goods and want to supply retailers in bulk' },
                  { value: 'distributor', label: 'Distributor/Supplier', description: 'Import or distribute products to retailers' },
                  { value: 'registered', label: 'Registered Wholesale Business', description: 'Established wholesale business with formal operations' },
                  { value: 'international', label: 'International Wholesaler', description: 'Non-South African supplier wanting to serve SA retailers' }
                ]).map((option) => (
                  <div key={option.value} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <RadioButton
                      id={`applicantType-${option.value}`}
                      name="applicantType"
                      value={option.value}
                      checked={formData.applicantType === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, applicantType: value }))}
                      label={option.label}
                      variant="default"
                      size="md"
                    />
                    <p className="text-[#4A4A4A] text-sm mt-2 ml-6">{option.description}</p>
                  </div>
                ))}
              </div>
              {errors.applicantType && <p className="text-red-500 text-sm mt-2">{errors.applicantType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-4">
                Business Structure: <span className="text-red-500">*</span>
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={onInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              >
                <option value="">Select Business Structure</option>
                {formData.sellerType === 'retailer' ? (
                  <>
                    <option value="sole-proprietor">Sole Proprietor</option>
                    <option value="partnership">Partnership</option>
                    <option value="company">Private Company (Pty Ltd)</option>
                    <option value="cc">Close Corporation (CC)</option>
                    <option value="trust">Trust</option>
                    <option value="franchise">Franchise</option>
                    <option value="other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="manufacturer">Manufacturing Company</option>
                    <option value="distributor">Distribution Company</option>
                    <option value="importer">Import/Export Company</option>
                    <option value="company">Private Company (Pty Ltd)</option>
                    <option value="partnership">Partnership</option>
                    <option value="cooperative">Cooperative</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>
              {errors.businessType && <p className="text-red-500 text-sm mt-2">{errors.businessType}</p>}
            </div>

            {/* Additional context based on seller type */}
            <div className={`p-4 rounded-lg ${
              formData.sellerType === 'retailer' 
                ? 'bg-blue-50 border border-blue-200' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                formData.sellerType === 'retailer' ? 'text-blue-800' : 'text-green-800'
              }`}>
                {formData.sellerType === 'retailer' ? 'What to Expect as a Retailer:' : 'What to Expect as a Wholesaler:'}
              </h4>
              <ul className={`text-sm space-y-1 ${
                formData.sellerType === 'retailer' ? 'text-blue-700' : 'text-green-700'
              }`}>
                {formData.sellerType === 'retailer' ? (
                  <>
                    <li>• Access to 2M+ customers across South Africa</li>
                    <li>• Integrated payment processing and order management</li>
                    <li>• Marketing tools and promotional opportunities</li>
                    <li>• Customer service and returns support</li>
                    <li>• Performance analytics and sales insights</li>
                  </>
                ) : (
                  <>
                    <li>• Access to verified retailers across our network</li>
                    <li>• Bulk order management and volume pricing tools</li>
                    <li>• B2B payment terms and credit facilities</li>
                    <li>• Inventory management and forecasting</li>
                    <li>• Dedicated account management support</li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessTypeStep;
