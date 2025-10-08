"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../shared/types';
import { PhoneInput } from '../../../../common';
import { useToast } from '../../../../../context/ToastContext';
import { useAuthStore } from '../../../../../store/auth';
import { useUserSettingsStore } from '../../../../../store/userSettings';
import DeleteAccountModal from '../../shared/DeleteAccountModal';

interface SettingsTabProps {
  user: User;
  onPhoneChange: (value: string) => void;
  onDeleteAccount: () => void;
}

export default function SettingsTab({ user, onPhoneChange, onDeleteAccount }: SettingsTabProps) {
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const { logout } = useAuthStore();

  const { firstName, lastName } = useMemo(() => {
    const nameParts = user.name.trim().split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || ''
    };
  }, [user.name]);

  // Zustand store
  const {
    profileData,
    passwordData,
    isUpdatingProfile,
    isUpdatingPassword,
    isDeletingAccount,
    validationErrors,
    setProfileData,
    setPasswordData,
    setValidationErrors,
    clearValidationErrors,
    clearPasswordData,
    updateProfile,
    updatePassword,
    checkEmailExists,
    deleteAccount,
    validateProfile,
    validatePassword
  } = useUserSettingsStore();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Initialize profile data from user prop
  useEffect(() => {
    setProfileData({
      firstName,
      lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: ''
    });
  }, [firstName, lastName, user.email, user.phone, setProfileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ [name]: value } as any);
    if (validationErrors[name]) {
      setValidationErrors({ [name]: '' });
    }
  };

  const handlePhoneChange = (value: string) => {
    setProfileData({ phone: value });
    onPhoneChange(value);
    if (validationErrors.phone) {
      setValidationErrors({ phone: '' });
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ [name]: value } as any);
    if (validationErrors[name]) {
      setValidationErrors({ [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateProfile(profileData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Check if email already exists (if email was changed)
    if (profileData.email !== user.email) {
      const emailExists = await checkEmailExists(profileData.email);
      if (emailExists) {
        setValidationErrors({ email: 'This email address is already in use' });
        return;
      }
    }

    const result = await updateProfile(profileData);
    if (result.success) {
      showSuccess('Profile updated successfully');
      clearValidationErrors();
    } else {
      showError(result.error || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validatePassword(passwordData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const result = await updatePassword(passwordData);
    if (result.success) {
      showSuccess('Password updated successfully');
      clearPasswordData();
      clearValidationErrors();
    } else {
      showError(result.error || 'Failed to update password');
    }
  };

  const handleAccountDelete = async () => {
    const result = await deleteAccount();
    if (result.success) {
      showSuccess('Account deleted successfully');
      
      // Log the user out
      logout();
      
      // Close the modal
      setShowDeleteModal(false);
      
      // Redirect to home page
      router.push('/');
    } else {
      showError(result.error || 'Failed to delete account');
      setShowDeleteModal(false);
    }
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
            {Object.keys(validationErrors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium">Please fix the following errors:</p>
                <ul className="text-red-600 text-sm mt-1 list-disc list-inside">
                  {Object.entries(validationErrors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
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
                  value={profileData.lastName}
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
                value={profileData.email}
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
              value={profileData.phone}
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
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
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
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            {Object.keys(validationErrors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium">Please fix the following errors:</p>
                <ul className="text-red-600 text-sm mt-1 list-disc list-inside">
                  {Object.entries(validationErrors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${
                  validationErrors.currentPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
              />
              {validationErrors.currentPassword && <p className="mt-1 text-sm text-red-600">{validationErrors.currentPassword}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${
                  validationErrors.newPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
              />
              {validationErrors.newPassword && <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-[#000000] placeholder-gray-500 ${
                  validationErrors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
              />
              {validationErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
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
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-red-700 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleAccountDelete}
      />
    </div>
  );
}
