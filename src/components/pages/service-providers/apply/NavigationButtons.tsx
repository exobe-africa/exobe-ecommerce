"use client";

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

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1 || isSubmitting}
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
          className={`flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-colors text-lg shadow-lg ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#C8102E] hover:bg-[#A00E26] text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              Submit Application
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className={`flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-colors text-lg shadow-lg ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#C8102E] hover:bg-[#A00E26] text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
