"use client";

import { useMemo, useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { Checkbox } from '../../common';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { Spinner } from '../../common/Spinner';

interface Address {
  id?: number;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address;
  onSave: (address: Address) => void;
  isLoading?: boolean;
}

export default function AddressModal({ isOpen, onClose, address, onSave, isLoading = false }: AddressModalProps) {
  const [formData, setFormData] = useState<Address>(
    address || {
      type: 'home',
      name: '',
      street: '',
      city: '',
      province: 'Gauteng',
      postalCode: '',
      isDefault: false
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useMemo(() => {
    return (data: Address) => {
      const next: Record<string, string> = {};
      if (!data.type) next.type = 'Please select an address type';
      if (!data.name || data.name.trim().length < 2) next.name = 'Please enter a valid address name';
      if (!data.street || data.street.trim().length < 3) next.street = 'Please enter a valid street address';
      if (!data.city || data.city.trim().length < 2) next.city = 'Please enter a valid city';
      if (!data.province) next.province = 'Please select a province';
      if (!data.postalCode) next.postalCode = 'Please enter a postal code';
      else if (!/^\d{4}$/.test(String(data.postalCode))) next.postalCode = 'Postal code must be 4 digits';
      return next;
    };
  }, []);

  useScrollLock(isOpen);

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSave(formData);
    // Don't close here - let parent close on success
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F6E2E0] rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[#C8102E]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">
                  {address ? 'Edit Address' : 'Add New Address'}
                </h3>
                <p className="text-sm text-[#4A4A4A]">
                  {address ? 'Update your address details' : 'Add a new delivery address'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Address Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              aria-invalid={!!errors.type}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] ${errors.type ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'}`}
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Address Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Home Address, Office"
              aria-invalid={!!errors.name}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'}`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              aria-invalid={!!errors.street}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${errors.street ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'}`}
              required
            />
            {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Johannesburg"
                aria-invalid={!!errors.city}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'}`}
                required
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="2001"
                aria-invalid={!!errors.postalCode}
                inputMode="numeric"
                pattern="\\d{4}"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'}`}
                required
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Province
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              aria-invalid={!!errors.province}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] ${errors.province ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'}`}
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
          </div>

          <Checkbox
            id="isDefault"
            name="isDefault"
            checked={formData.isDefault}
            onChange={(checked) => handleInputChange({ target: { name: 'isDefault', type: 'checkbox', checked } } as React.ChangeEvent<HTMLInputElement>)}
            label="Set as default address"
            size="sm"
          />
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#C8102E] text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    {address ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  address ? 'Update Address' : 'Add Address'
                )}
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
