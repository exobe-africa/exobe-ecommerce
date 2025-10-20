"use client";

import { useEffect, useState } from 'react';
import { Truck, User, Mail, MapPin, ChevronDown, Star, Clock } from 'lucide-react';
import Link from 'next/link';
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

interface Address {
  id: number;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  errors: Record<string, string>;
  provinces?: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onPhoneChange: (value: string) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  isLoggedIn?: boolean;
  userAddresses?: Address[];
  onSelectAddress?: () => void;
  onAddressDropdownChange?: (addressId: number) => void;
  showGuestPrompt?: boolean;
  isLoadingData?: boolean;
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
  isLoggedIn = false,
  userAddresses = [],
  onSelectAddress,
  onAddressDropdownChange,
  showGuestPrompt = false,
  isLoadingData = false,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Show skeleton loader if logged in and loading data
  if (isLoggedIn && isLoadingData) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        <div className="mb-6">
          <div className="h-4 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <div className="h-4 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mr-3" />
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#000000] flex items-center">
          <Truck className="h-6 w-6 mr-2 text-[#C8102E]" />
          Shipping Information
        </h2>
      </div>

      {mounted && userAddresses.length > 0 && onAddressDropdownChange && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#000000] mb-2">
            Saved Addresses
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-[#4A4A4A]" />
            <select
              onChange={(e) => onAddressDropdownChange(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] appearance-none cursor-pointer"
              defaultValue={userAddresses.find(addr => addr.isDefault)?.id || userAddresses[0]?.id}
            >
              {userAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.name} - {address.street}, {address.city}
                  {address.isDefault && ' (Default)'}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-[#4A4A4A] pointer-events-none" />
          </div>
          <p className="text-xs text-[#4A4A4A] mt-1">
            Select a saved address or modify the details below
          </p>
        </div>
      )}

      {!isLoggedIn && showGuestPrompt && (
        <div className="mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl"></div>
          <div className="absolute inset-0 bg-white/40 rounded-2xl"></div>
          
          <div className="relative p-5 sm:p-6 border border-blue-100 rounded-2xl backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-3 shadow-lg">
                <Star className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Save Time on Future Orders
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
                Create an account to save your information and enjoy faster checkout, order tracking, and exclusive benefits.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-xs font-medium text-gray-700">Faster Checkout</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-xs font-medium text-gray-700">Order Tracking</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-xs font-medium text-gray-700">Exclusive Deals</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/auth/register" className="block">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                  ✨ Create Account (30 seconds)
                </button>
              </Link>
              <Link href="/auth/login" className="block">
                <button className="w-full border-2 border-blue-200 text-blue-700 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                  Already have an account? Sign In
                </button>
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-100">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Secure & Private
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  No Spam
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                  Free Forever
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
