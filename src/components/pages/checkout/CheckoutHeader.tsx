"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Truck, CreditCard, Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CheckoutHeaderProps {
  currentStep: number;
  steps?: Step[];
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ 
  currentStep, 
  steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Review', icon: Check },
    { id: 3, name: 'Payment', icon: CreditCard }
  ]
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/cart">
              <button className="flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors touch-manipulation">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Back to Cart</span>
              </button>
            </Link>
            <div className="h-5 w-px bg-gray-300 hidden sm:block" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000]">Checkout</h1>
          </div>
          
          <div className="flex items-center text-xs sm:text-sm text-[#4A4A4A] self-start sm:self-center">
            <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span>Secure Checkout</span>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6">
          <div className="block sm:hidden">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="text-sm font-medium text-[#C8102E]">Step {currentStep} of {steps.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1">
                  <div className={`h-2 rounded-full transition-colors ${
                    currentStep >= step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                  }`} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  'bg-[#C8102E] border-[#C8102E] text-white'
                }`}>
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-4 w-4" })}
                </div>
                <span className="text-sm font-medium text-[#C8102E]">
                  {steps[currentStep - 1].name}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                    : 'border-gray-300 text-[#4A4A4A]'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-[#C8102E]' : 'text-[#4A4A4A]'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`mx-4 flex-1 h-px ${
                    currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
