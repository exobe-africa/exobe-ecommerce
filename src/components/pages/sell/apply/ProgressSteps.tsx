"use client";

import React from 'react';

interface Step {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile View */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm font-medium text-[#C8102E]">Step {currentStep} of {steps.length}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-1 mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                <div className={`h-2 rounded-full transition-colors ${
                  currentStep >= step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                }`} />
              </div>
            ))}
          </div>
          
          {/* Current Step Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C8102E] text-white">
                {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-[#C8102E]">
                  {steps[currentStep - 1].name}
                </div>
              </div>
            </div>
            <div className="text-sm text-[#4A4A4A] leading-relaxed px-4">
              {steps[currentStep - 1].description}
            </div>
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden sm:block lg:hidden">
          {/* Progress Indicators */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                    : currentStep === step.id 
                      ? 'border-[#C8102E] text-[#C8102E] bg-white'
                      : 'border-gray-300 text-gray-400 bg-white'
                }`}>
                  {React.createElement(step.icon, { className: "h-5 w-5" })}
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-4 h-0.5 w-12 transition-colors ${
                    currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Current Step Details */}
          <div className="text-center">
            <div className="text-xl font-semibold text-[#C8102E] mb-2">
              {steps[currentStep - 1].name}
            </div>
            <div className="text-sm text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
              {steps[currentStep - 1].description}
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                      : currentStep === step.id 
                        ? 'border-[#C8102E] text-[#C8102E] bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {React.createElement(step.icon, { className: "h-6 w-6" })}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-semibold ${
                      currentStep >= step.id ? 'text-[#C8102E]' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-6">
                    <div className={`h-0.5 w-full transition-colors ${
                      currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Current Step Description */}
          <div className="text-center">
            <div className="text-lg text-[#4A4A4A] leading-relaxed max-w-3xl mx-auto">
              {steps[currentStep - 1].description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
