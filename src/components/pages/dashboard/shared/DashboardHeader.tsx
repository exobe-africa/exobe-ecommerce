"use client";

import { User as UserType } from './types';

interface DashboardHeaderProps {
  user: UserType;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
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
                {new Date(user.joinDate).toLocaleDateString('en-ZA', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
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
