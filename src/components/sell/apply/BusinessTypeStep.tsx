"use client";

import React from 'react';
import { Building } from 'lucide-react';
import { RadioButton } from '../../../components';
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

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            I am applying as: <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'individual', label: 'An individual (Sole Proprietor)' },
              { value: 'registered', label: 'A South African Registered Business' },
              { value: 'international', label: 'An International Seller (Non-SA Business)' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`applicantType-${option.value}`}
                name="applicantType"
                value={option.value}
                checked={formData.applicantType === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, applicantType: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
          {errors.applicantType && <p className="text-red-500 text-sm mt-2">{errors.applicantType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Business Type: <span className="text-red-500">*</span>
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
          >
            <option value="">Select Business Type</option>
            <option value="sole-proprietor">Sole Proprietor</option>
            <option value="partnership">Partnership</option>
            <option value="company">Company (Pty Ltd)</option>
            <option value="cc">Close Corporation (CC)</option>
            <option value="trust">Trust</option>
            <option value="other">Other</option>
          </select>
          {errors.businessType && <p className="text-red-500 text-sm mt-2">{errors.businessType}</p>}
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeStep;
