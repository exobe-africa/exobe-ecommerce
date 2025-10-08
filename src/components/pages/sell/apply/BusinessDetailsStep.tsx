"use client";

import React from 'react';
import { FileText } from 'lucide-react';
import { RadioButton } from '../../../common';
import { FormData } from './types';

interface BusinessDetailsStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onInputBlur: (fieldName: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({
  formData,
  errors,
  onInputChange,
  onInputBlur,
  setFormData
}) => {
  const isRetailer = formData.sellerType === 'retailer';
  const isWholesaler = formData.sellerType === 'wholesaler';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <FileText className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">
          {isWholesaler ? 'Wholesale Business Details' : 'Business Details'}
        </h2>
        <p className="text-[#4A4A4A] text-lg">
          {isWholesaler 
            ? 'Tell us about your wholesale business operations' 
            : 'Tell us about your business'
          }
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            {formData.applicantType === 'individual' ? 'Trading Name / Business Name' : 'Company/Business Legal Name'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={onInputChange}
            onBlur={() => onInputBlur('businessName')}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
              errors.businessName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
            }`}
            placeholder={formData.applicantType === 'individual' ? 'Enter your trading name' : 'Enter your registered business name'}
          />
          {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.applicantType !== 'individual' && (
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Business Registration Number
              </label>
              <input
                type="text"
                name="businessRegistration"
                value={formData.businessRegistration}
                onChange={onInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                placeholder="Registration number"
              />
            </div>
          )}

          {formData.applicantType === 'individual' && (
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                SA ID Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="saIdNumber"
                value={formData.saIdNumber}
                onChange={onInputChange}
                onBlur={() => onInputBlur('saIdNumber')}
                className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
                  errors.saIdNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
                }`}
                placeholder="e.g. 8001015009087 (exactly 13 digits)"
                maxLength={13}
                pattern="\d{13}"
              />
              <div className="text-xs text-[#4A4A4A] mt-1">
                Enter your 13-digit South African ID number
              </div>
              {errors.saIdNumber && <p className="text-red-500 text-sm mt-1">{errors.saIdNumber}</p>}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Are you VAT registered? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`vatRegistered-${option.value}`}
                name="vatRegistered"
                value={option.value}
                checked={formData.vatRegistered === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, vatRegistered: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
          {errors.vatRegistered && <p className="text-red-500 text-sm mt-2">{errors.vatRegistered}</p>}
        </div>

        {formData.vatRegistered === 'yes' && (
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              VAT Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={onInputChange}
              onBlur={() => onInputBlur('vatNumber')}
              className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 bg-white text-[#000000] text-lg ${
                errors.vatNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E]'
              }`}
              placeholder="Enter your VAT number"
            />
            {errors.vatNumber && <p className="text-red-500 text-sm mt-1">{errors.vatNumber}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            {isWholesaler ? 'Monthly Wholesale Revenue (Optional)' : 'Monthly Revenue (Optional)'}
          </label>
          <div className="space-y-2">
            {(isWholesaler ? [
              { value: 'under-50k', label: 'Less than R50k' },
              { value: '50k-200k', label: 'R50k - R200k' },
              { value: '200k-500k', label: 'R200k - R500k' },
              { value: '500k-1m', label: 'R500k - R1 Million' },
              { value: '1m-5m', label: 'R1 Million - R5 Million' },
              { value: '5m-10m', label: 'R5 Million - R10 Million' },
              { value: '10m-plus', label: 'R10 Million +' }
            ] : [
              { value: 'under-20k', label: 'Less than R20k' },
              { value: '20k-50k', label: 'R20k - R50k' },
              { value: '50k-100k', label: 'R50k - R100k' },
              { value: '100k-500k', label: 'R100k - R500k' },
              { value: '500k-1m', label: 'R500k - R1 Million' },
              { value: '1m-2.5m', label: 'R1 Million - R2.5 Million' },
              { value: '2.5m-plus', label: 'R2.5 Million +' }
            ]).map((option) => (
              <RadioButton
                key={option.value}
                id={`monthlyRevenue-${option.value}`}
                name="monthlyRevenue"
                value={option.value}
                checked={formData.monthlyRevenue === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, monthlyRevenue: value }))}
                label={option.label}
                variant="default"
                size="sm"
                className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Additional questions for retailers */}
        {isRetailer && (
          <>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-4">
                Do you have physical stores?
              </label>
              <div className="space-y-3">
                {[
                  { value: 'yes', label: 'Yes, I have physical store(s)' },
                  { value: 'no', label: 'No, I operate online only' },
                  { value: 'planning', label: 'Planning to open physical stores' }
                ].map((option) => (
                  <RadioButton
                    key={option.value}
                    id={`physicalStores-${option.value}`}
                    name="physicalStores"
                    value={option.value}
                    checked={formData.physicalStores === option.value}
                    onChange={(value) => setFormData(prev => ({ ...prev, physicalStores: value }))}
                    label={option.label}
                    variant="card"
                    size="md"
                  />
                ))}
              </div>
            </div>

            {formData.physicalStores === 'yes' && (
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Number of Physical Stores
                </label>
                <select
                  name="numberOfStores"
                  value={formData.numberOfStores}
                  onChange={onInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                >
                  <option value="">Select number of stores</option>
                  <option value="1">1 store</option>
                  <option value="2-5">2-5 stores</option>
                  <option value="6-10">6-10 stores</option>
                  <option value="11-plus">11+ stores</option>
                </select>
              </div>
            )}
          </>
        )}

        {/* Additional questions for wholesalers */}
        {isWholesaler && (
          <>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-4">
                Do you currently supply to retailers?
              </label>
              <div className="space-y-3">
                {[
                  { value: 'yes-many', label: 'Yes, I supply to many retailers' },
                  { value: 'yes-few', label: 'Yes, I supply to a few retailers' },
                  { value: 'no-ready', label: 'No, but I am ready to start' },
                  { value: 'no-new', label: 'No, this would be my first wholesale venture' }
                ].map((option) => (
                  <RadioButton
                    key={option.value}
                    id={`supplierToRetailers-${option.value}`}
                    name="supplierToRetailers"
                    value={option.value}
                    checked={formData.supplierToRetailers === option.value}
                    onChange={(value) => setFormData(prev => ({ ...prev, supplierToRetailers: value }))}
                    label={option.label}
                    variant="card"
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-4">
                Do you operate on other B2B marketplaces?
              </label>
              <div className="space-y-3">
                {[
                  { value: 'yes-multiple', label: 'Yes, on multiple B2B platforms' },
                  { value: 'yes-one', label: 'Yes, on one other platform' },
                  { value: 'no-first', label: 'No, eXobe would be my first B2B marketplace' }
                ].map((option) => (
                  <RadioButton
                    key={option.value}
                    id={`otherMarketplaces-${option.value}`}
                    name="otherMarketplaces"
                    value={option.value}
                    checked={formData.otherMarketplaces === option.value}
                    onChange={(value) => setFormData(prev => ({ ...prev, otherMarketplaces: value }))}
                    label={option.label}
                    variant="card"
                    size="md"
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Business experience context */}
        <div className={`p-4 rounded-lg ${
          isWholesaler 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            isWholesaler ? 'text-green-800' : 'text-blue-800'
          }`}>
            {isWholesaler ? 'Wholesale Business Verification:' : 'Retail Business Verification:'}
          </h4>
          <ul className={`text-sm space-y-1 ${
            isWholesaler ? 'text-green-700' : 'text-blue-700'
          }`}>
            {isWholesaler ? (
              <>
                <li>• We may request business registration documents</li>
                <li>• Product samples or catalogs may be required</li>
                <li>• Trade references may be contacted</li>
                <li>• Minimum order capabilities will be verified</li>
                <li>• Quality standards compliance will be assessed</li>
              </>
            ) : (
              <>
                <li>• We may request business registration documents</li>
                <li>• Product authenticity may be verified</li>
                <li>• Customer service capabilities will be assessed</li>
                <li>• Return/refund policies will be reviewed</li>
                <li>• Marketing and branding compliance will be checked</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
