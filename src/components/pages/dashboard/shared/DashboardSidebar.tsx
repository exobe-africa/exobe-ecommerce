"use client";

import { User, Package, MapPin, Star, Bell, Settings, LogOut } from 'lucide-react';
import { User as UserType } from './types';

interface DashboardSidebarProps {
  user: UserType;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Account Overview', icon: User },
  { id: 'orders', label: 'Order History', icon: Package },
  { id: 'addresses', label: 'My Addresses', icon: MapPin },
  { id: 'reviews', label: 'My Reviews', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Account Settings', icon: Settings }
];

export default function DashboardSidebar({ user, activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-[#000000]">{user.name}</h3>
              <p className="text-sm text-[#4A4A4A]">{user.email}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-[#F6E2E0] text-[#C8102E] font-medium'
                    : 'text-[#4A4A4A] hover:bg-gray-50 hover:text-[#000000]'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="border-t border-gray-100 mt-4 pt-4">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-200">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
