"use client";

import { User as UserType } from './types';

interface DashboardHeaderProps {
  user: UserType;
  isLoading?: boolean;
}

export default function DashboardHeader({ user, isLoading = false }: DashboardHeaderProps) {
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#000000]">My Account</h1>
              <div className="mt-1 h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#000000]">My Account</h1>
            <p className="text-[#4A4A4A] mt-1">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-[#4A4A4A]">
              <span>Member since</span>
              <span className="font-medium text-[#C8102E]">
                {(() => {
                  const t = Date.parse(user.joinDate);
                  if (Number.isNaN(t)) return '—';
                  return new Date(t).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' });
                })()}
              </span>
            </div>
            <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
