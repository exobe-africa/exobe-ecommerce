"use client";

import { useState, useMemo } from 'react';
import { User } from '../../shared/types';
import { PhoneInput } from '../../../../common';

interface SettingsTabProps {
  user: User;
  onPhoneChange: (value: string) => void;
  onDeleteAccount: () => void;
}

export default function SettingsTab({ user, onPhoneChange, onDeleteAccount }: SettingsTabProps) {
  // Parse first and last name from user.name
  const { firstName, lastName } = useMemo(() => {
    const nameParts = user.name.trim().split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || ''
    };
  }, [user.name]);

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email: user.email,
    phone: user.phone,
    dateOfBirth: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
    onPhoneChange(value);
    // Clear phone error on change
    if (validationErrors.phone) {
      setValidationErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (formData.phone && !/^\+27\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid South African phone number';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    // TODO: Implement profile update logic
    console.log('Profile update:', formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#000000]">Profile Settings</h2>
          <p className="text-[#4A4A4A] mt-1">Update your personal information</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  aria-invalid={!!validationErrors.firstName}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${
                    validationErrors.firstName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                  }`}
                />
                {validationErrors.firstName && <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  aria-invalid={!!validationErrors.lastName}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${
                    validationErrors.lastName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                  }`}
                />
                {validationErrors.lastName && <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                aria-invalid={!!validationErrors.email}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${
                  validationErrors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
              />
              {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
            </div>
            
            <PhoneInput
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              label="Phone Number"
              className="w-full"
              error={validationErrors.phone}
            />
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
              >
                Update Profile
              </button>
              <button
                type="button"
                className="border border-gray-300 text-[#4A4A4A] px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#000000]">Change Password</h2>
          <p className="text-[#4A4A4A] mt-1">Update your account password</p>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
              />
            </div>
            
            <button
              type="submit"
              className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-200">
        <div className="p-6 border-b border-red-200">
          <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
          <p className="text-red-500 mt-1">Irreversible and destructive actions</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#000000]">Delete Account</h3>
              <p className="text-sm text-[#4A4A4A] mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={onDeleteAccount}
              className="bg-red-600 text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-red-700 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
