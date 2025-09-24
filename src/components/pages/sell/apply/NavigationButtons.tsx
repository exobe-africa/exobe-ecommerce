"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false
}) => {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-[#4A4A4A] rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Previous
      </button>

      {isLastStep ? (
        <button
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center justify-center px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center justify-center px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg"
        >
          Next
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
