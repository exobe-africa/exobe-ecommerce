"use client";

import { ArrowLeft, ChevronRight, Lock } from 'lucide-react';

interface CheckoutNavigationProps {
  currentStep: number;
  totalSteps: number;
  isProcessing?: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onPlaceOrder: () => void;
}

const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({
  currentStep,
  totalSteps,
  isProcessing = false,
  onPrevStep,
  onNextStep,
  onPlaceOrder,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className="px-6 py-3 border border-gray-300 text-[#4A4A4A] rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>
      
      {currentStep < totalSteps ? (
        <button
          onClick={onNextStep}
          className="px-6 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center"
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      ) : (
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="px-8 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Place Order
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CheckoutNavigation;
