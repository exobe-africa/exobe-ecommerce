"use client";

import { useState } from 'react';
import { X, User, Package, Star, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

interface GuestCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueAsGuest: () => void;
}

const accountBenefits = [
  {
    icon: Package,
    title: 'Easy Order Tracking',
    description: 'Track all your orders in one place with real-time updates'
  },
  {
    icon: Clock,
    title: 'Faster Checkout',
    description: 'Save your information for lightning-fast future purchases'
  },
  {
    icon: Star,
    title: 'Loyalty Rewards',
    description: 'Earn points on every purchase and unlock exclusive deals'
  },
  {
    icon: Shield,
    title: 'Secure Account',
    description: 'Keep your payment methods and addresses safely stored'
  },
  {
    icon: Truck,
    title: 'Address Book',
    description: 'Save multiple addresses for home, work, and gifts'
  },
  {
    icon: User,
    title: 'Personal Dashboard',
    description: 'Manage orders, reviews, and preferences in your account'
  }
];

export default function GuestCheckoutModal({ isOpen, onClose, onContinueAsGuest }: GuestCheckoutModalProps) {
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  if (!isOpen) return null;

  const visibleBenefits = showAllBenefits ? accountBenefits : accountBenefits.slice(0, 3);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#000000]">Get a Better Shopping Experience</h2>
              <p className="text-[#4A4A4A] mt-1">Create an account or sign in for exclusive benefits</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {visibleBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#000000] mb-1">{benefit.title}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {!showAllBenefits && (
            <button
              onClick={() => setShowAllBenefits(true)}
              className="w-full text-[#C8102E] hover:text-[#A00E26] font-medium text-sm mb-6 py-2"
            >
              Show {accountBenefits.length - 3} more benefits →
            </button>
          )}

          {/* Stats */}
          <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-xl p-6 text-white mb-6">
            <h3 className="text-lg font-bold mb-4">Join 50,000+ Happy Customers</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">99.8%</div>
                <div className="text-red-100 text-sm">Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-red-100 text-sm">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Free</div>
                <div className="text-red-100 text-sm">Shipping*</div>
              </div>
            </div>
          </div>

          {/* Quick Sign Up Form */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-[#000000] mb-2">Quick Account Creation</h4>
            <p className="text-sm text-[#4A4A4A] mb-3">
              It only takes 30 seconds to create an account and start enjoying these benefits!
            </p>
            <div className="text-xs text-blue-600">
              ✓ No spam emails ✓ Secure data protection ✓ Easy unsubscribe
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/auth/register" className="flex-1">
              <button className="w-full bg-[#C8102E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#A00E26] transition-colors">
                Create Account (30 seconds)
              </button>
            </Link>
            <Link href="/auth/login" className="flex-1">
              <button className="w-full border border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-xl font-semibold hover:bg-[#F6E2E0] transition-colors">
                Sign In
              </button>
            </Link>
          </div>
          
          <button
            onClick={onContinueAsGuest}
            className="w-full mt-3 text-[#4A4A4A] hover:text-[#000000] font-medium text-sm py-2 transition-colors underline hover:no-underline"
          >
            Continue as Guest (you'll miss out on benefits above)
          </button>
        </div>
      </div>
    </div>
  );
}
