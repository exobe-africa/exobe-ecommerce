"use client";

import { FileText } from 'lucide-react';
import { RadioButton } from '../../../common';
import { ServiceProviderFormData } from './types';

interface BusinessInfoStepProps {
  formData: ServiceProviderFormData;
  errors: {[key: string]: string};
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ServiceProviderFormData>>;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <FileText className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Professional Information</h2>
        <p className="text-[#4A4A4A] text-lg">Business and legal details</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Business/Trading Name (Optional)
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Enter your business name if applicable"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Business Registration Number (Optional)
          </label>
          <input
            type="text"
            name="businessRegistration"
            value={formData.businessRegistration}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Registration number if you have a registered business"
          />
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
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Bank Account Details
          </label>
          <textarea
            name="bankDetails"
            value={formData.bankDetails}
            onChange={onInputChange}
            rows={3}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Bank name, account holder name, account number (for payment processing)"
          />
          <div className="text-xs text-[#4A4A4A] mt-1">
            This information is secure and used only for payment processing
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Emergency Contact
          </label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Name and phone number of emergency contact"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
