"use client";

import { AlertTriangle, RefreshCw, HelpCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorDetails {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'red' | 'orange';
  description: string;
}

interface ErrorDetailsCardProps {
  errorDetails: ErrorDetails;
  errorType: string;
  orderAttempt: string;
}

const ErrorDetailsCard: React.FC<ErrorDetailsCardProps> = ({
  errorDetails,
  errorType,
  orderAttempt,
}) => {
  const router = useRouter();

  const handleRetryPayment = () => {
    router.push('/checkout');
  };

  const handleContactSupport = () => {
    router.push('/help-center');
  };

  const renderSolutions = () => {
    if (errorType === 'payment') {
      return (
        <>
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="font-semibold text-blue-800">Check Your Card Details</p>
              <p className="text-sm text-blue-700">Verify your card number, expiry date, and CVV are correct</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="font-semibold text-blue-800">Verify Available Balance</p>
              <p className="text-sm text-blue-700">Ensure you have sufficient funds for this purchase</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="font-semibold text-blue-800">Try a Different Card</p>
              <p className="text-sm text-blue-700">Use an alternative payment method if available</p>
            </div>
          </div>
        </>
      );
    }

    if (errorType === 'network') {
      return (
        <>
          <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="font-semibold text-orange-800">Check Your Connection</p>
              <p className="text-sm text-orange-700">Ensure you have a stable internet connection</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="font-semibold text-orange-800">Refresh and Retry</p>
              <p className="text-sm text-orange-700">Reload the page and attempt the purchase again</p>
            </div>
          </div>
        </>
      );
    }

    if (errorType === 'system') {
      return (
        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
            !
          </div>
          <div>
            <p className="font-semibold text-red-800">System Issue Detected</p>
            <p className="text-sm text-red-700">Our technical team has been notified. Please try again in a few minutes or contact support.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${
          errorDetails.color === 'red' ? 'from-red-500 to-red-600' : 'from-orange-500 to-orange-600'
        } px-6 py-4`}>
          <h2 className="text-xl font-semibold text-white flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2" />
            What Happened?
          </h2>
        </div>
        
        <div className="p-6">
          <p className="text-[#4A4A4A] mb-6 leading-relaxed">
            {errorDetails.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-[#4A4A4A] mb-1">Attempt ID</p>
              <p className="text-lg font-semibold text-[#000000]">#{orderAttempt}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-[#4A4A4A] mb-1">Time</p>
              <p className="text-lg font-semibold text-[#000000]">
                {new Date().toLocaleTimeString('en-ZA', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleRetryPayment}
              className="flex-1 bg-[#C8102E] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
            <button 
              onClick={handleContactSupport}
              className="flex-1 border-2 border-[#C8102E] text-[#C8102E] py-3 px-4 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Get Help
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
          <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
          Common Solutions
        </h3>
        
        <div className="space-y-4">
          {renderSolutions()}
        </div>
      </div>
    </div>
  );
};

export default ErrorDetailsCard;
