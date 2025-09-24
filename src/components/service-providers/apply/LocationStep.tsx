"use client";

import { MapPin } from 'lucide-react';
import { RadioButton } from '../../../components';
import { ServiceProviderFormData } from './types';

interface LocationStepProps {
  formData: ServiceProviderFormData;
  errors: {[key: string]: string};
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ServiceProviderFormData>>;
  provinces: string[];
}

const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData,
  provinces
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <MapPin className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Location & Coverage</h2>
        <p className="text-[#4A4A4A] text-lg">Where do you operate</p>
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
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Enter your address"
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
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="City"
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
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
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
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="Postal Code"
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Service Radius <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: '5km', label: 'Within 5km of my location' },
              { value: '15km', label: 'Within 15km of my location' },
              { value: '30km', label: 'Within 30km of my location' },
              { value: 'province', label: 'Anywhere in my province' },
              { value: 'national', label: 'Nationwide (travel services)' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`serviceRadius-${option.value}`}
                name="serviceRadius"
                value={option.value}
                checked={formData.serviceRadius === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, serviceRadius: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
          {errors.serviceRadius && <p className="text-red-500 text-sm mt-2">{errors.serviceRadius}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Transportation Method
          </label>
          <div className="space-y-2">
            {[
              { value: 'own-vehicle', label: 'Own vehicle' },
              { value: 'public-transport', label: 'Public transport' },
              { value: 'bicycle', label: 'Bicycle' },
              { value: 'walking', label: 'Walking (local services only)' },
              { value: 'client-location', label: 'Work at client location only' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`transportMode-${option.value}`}
                name="transportMode"
                value={option.value}
                checked={formData.transportMode === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, transportMode: value }))}
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

export default LocationStep;
