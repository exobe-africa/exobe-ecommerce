"use client";

import React from 'react';
import { StepData } from './types';

interface ProgressStepsProps {
  steps: StepData[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
          <div className="flex justify-center mt-3">
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                'bg-[#C8102E] border-[#C8102E] text-white'
              }`}>
                {React.createElement(steps[currentStep - 1].icon, { className: "h-4 w-4" })}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-[#C8102E]">
                  {steps[currentStep - 1].name}
                </div>
                <div className="text-xs text-[#4A4A4A]">
                  {steps[currentStep - 1].description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block overflow-hidden">
          <div className="flex items-center justify-between w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="flex items-center min-w-0 max-w-full">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors flex-shrink-0 ${
                    currentStep >= step.id 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                      : currentStep === step.id 
                        ? 'border-[#C8102E] text-[#C8102E] bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {React.createElement(step.icon, { className: "h-5 w-5" })}
                  </div>
                  <div className="ml-2 min-w-0 flex-1">
                    <div className={`text-xs font-semibold truncate ${
                      currentStep >= step.id ? 'text-[#C8102E]' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate hidden xl:block">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 min-w-[20px] max-w-[60px]">
                    <div className={`h-0.5 w-full transition-colors ${
                      currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:block lg:hidden">
          <div className="flex items-center justify-center space-x-8">
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
                  <div className={`ml-4 h-0.5 w-8 ${
                    currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <div className={`text-lg font-semibold ${
              'text-[#C8102E]'
            }`}>
              {steps[currentStep - 1].name}
            </div>
            <div className="text-sm text-gray-500">{steps[currentStep - 1].description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
