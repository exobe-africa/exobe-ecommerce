"use client";

import { User, Mail } from 'lucide-react';
import { PhoneInput, RadioButton } from '../../../components';
import { ServiceProviderFormData } from './types';

interface PersonalInfoStepProps {
  formData: ServiceProviderFormData;
  errors: {[key: string]: string};
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ServiceProviderFormData>>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <User className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Personal Information</h2>
        <p className="text-[#4A4A4A] text-lg">Tell us about yourself</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <PhoneInput
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            label="Mobile Phone *"
            required
            showIcon={false}
            error={errors.phone}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            SA ID Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={onInputChange}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="e.g. 8001015009087 (13 digits)"
            maxLength={13}
            pattern="\d{13}"
          />
          <div className="text-xs text-[#4A4A4A] mt-1">
            Enter your 13-digit South African ID number
          </div>
          {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Identification Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'sa-id', label: 'South African ID document' },
              { value: 'passport', label: 'Passport' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`identificationType-${option.value}`}
                name="identificationType"
                value={option.value}
                checked={formData.identificationType === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, identificationType: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
          {errors.identificationType && <p className="text-red-500 text-sm mt-2">{errors.identificationType}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
