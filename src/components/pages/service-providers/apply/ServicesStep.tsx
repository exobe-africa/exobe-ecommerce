"use client";

import { Briefcase, DollarSign } from 'lucide-react';
import { RadioButton } from '../../../common';
import { ServiceProviderFormData } from './types';

interface ServicesStepProps {
  formData: ServiceProviderFormData;
  errors: {[key: string]: string};
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  serviceCategories: string[];
  onCategoryChange: (category: string) => void;
}

const ServicesStep: React.FC<ServicesStepProps> = ({
  formData,
  errors,
  onInputChange,
  serviceCategories,
  onCategoryChange
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Briefcase className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Service Details</h2>
        <p className="text-[#4A4A4A] text-lg">What services do you offer</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Service Categories <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {serviceCategories.map(category => (
              <label key={category} className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors">
                <input
                  type="checkbox"
                  checked={formData.serviceCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                />
                <span className="ml-2 text-sm text-[#000000]">{category}</span>
              </label>
            ))}
          </div>
          {errors.serviceCategories && <p className="text-red-500 text-sm mt-2">{errors.serviceCategories}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Primary Service <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="primaryService"
            value={formData.primaryService}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="e.g. Residential Plumbing, Wedding Photography, etc."
          />
          {errors.primaryService && <p className="text-red-500 text-sm mt-1">{errors.primaryService}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Experience Level <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              { value: 'beginner', label: 'Beginner (0-1 years)' },
              { value: 'intermediate', label: 'Intermediate (2-5 years)' },
              { value: 'experienced', label: 'Experienced (5-10 years)' },
              { value: 'expert', label: 'Expert (10+ years)' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`experience-${option.value}`}
                name="experience"
                value={option.value}
                checked={formData.experience === option.value}
                onChange={(value) => {
                  // Also trigger the main onInputChange to clear validation errors
                  const syntheticEvent = {
                    target: { name: 'experience', value }
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onInputChange(syntheticEvent);
                }}
                label={option.label}
                variant="default"
                size="sm"
                className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
              />
            ))}
          </div>
          {errors.experience && <p className="text-red-500 text-sm mt-2">{errors.experience}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Hourly Rate (ZAR) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={onInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                placeholder="150"
                min="50"
                max="2000"
              />
            </div>
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={onInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            >
              <option value="">Select availability</option>
              <option value="weekdays">Weekdays only</option>
              <option value="weekends">Weekends only</option>
              <option value="flexible">Flexible schedule</option>
              <option value="24-7">24/7 availability</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Qualifications & Certifications
          </label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={onInputChange}
            rows={4}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="List your relevant qualifications, certifications, training, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesStep;
