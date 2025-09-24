"use client";

import React from 'react';
import { FileText } from 'lucide-react';
import { RadioButton } from '../../../common';
import { FormData } from './types';

interface BusinessDetailsStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <FileText className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Business Details</h2>
        <p className="text-[#4A4A4A] text-lg">Tell us about your business</p>
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
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
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
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                placeholder="e.g. 8001015009087 (13 digits)"
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
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="Enter your VAT number"
            />
            {errors.vatNumber && <p className="text-red-500 text-sm mt-1">{errors.vatNumber}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Monthly Revenue (Optional)
          </label>
          <div className="space-y-2">
            {[
              { value: 'under-20k', label: 'Less than R20k' },
              { value: '20k-50k', label: 'R20k - R50k' },
              { value: '50k-100k', label: 'R50k - R100k' },
              { value: '100k-500k', label: 'R100k - R500k' },
              { value: '500k-1m', label: 'R500k - R1 Million' },
              { value: '1m-2.5m', label: 'R1 Million - R2.5 Million' },
              { value: '2.5m-plus', label: 'R2.5 Million +' }
            ].map((option) => (
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
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
