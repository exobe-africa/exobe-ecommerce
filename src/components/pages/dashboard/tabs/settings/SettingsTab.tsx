"use client";

import { AlertCircle } from 'lucide-react';
import { User } from '../../shared/types';
import { PhoneInput } from '../../../../common';

interface SettingsTabProps {
  user: User;
  onPhoneChange: (value: string) => void;
  onDeleteAccount: () => void;
}

export default function SettingsTab({ user, onPhoneChange, onDeleteAccount }: SettingsTabProps) {
  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#000000]">Profile Settings</h2>
          <p className="text-[#4A4A4A] mt-1">Update your personal information</p>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-500"
              />
            </div>
            
            <PhoneInput
              id="phone"
              name="phone"
              value={user.phone}
              onChange={onPhoneChange}
              label="Phone Number"
              className="w-full"
            />
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Date of Birth
              </label>
              <input
                type="date"
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

      {/* Password Settings */}
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

      {/* Danger Zone */}
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
