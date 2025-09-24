"use client";

import { Truck, User, Mail, MapPin } from 'lucide-react';
import { Checkbox, PhoneInput } from '../../common/index';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  specialInstructions: string;
  saveInfo: boolean;
  newsletter: boolean;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  errors: Record<string, string>;
  provinces?: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onPhoneChange: (value: string) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  formData,
  errors,
  provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ],
  onInputChange,
  onPhoneChange,
  onCheckboxChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
        <Truck className="h-6 w-6 mr-2 text-[#C8102E]" />
        Shipping Information
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">Last Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <PhoneInput
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onPhoneChange}
          label="Phone"
          error={errors.phone}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-2">Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Main Street"
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-2">Apartment, suite, etc. (optional)</label>
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500"
          placeholder="Apartment 4B"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Johannesburg"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">Province</label>
          <select
            name="province"
            value={formData.province}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] ${
              errors.province ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Province</option>
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
              errors.postalCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="2000"
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-2">Special Instructions (optional)</label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={onInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500"
          placeholder="Any special delivery instructions..."
        />
      </div>

      <div className="space-y-3">
        <Checkbox
          id="saveInfo"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={(checked) => onCheckboxChange('saveInfo', checked)}
          label="Save this information for next time"
          size="sm"
        />
        
        <Checkbox
          id="newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onChange={(checked) => onCheckboxChange('newsletter', checked)}
          label="Email me with news and offers"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ShippingForm;
