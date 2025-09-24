"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ApplicationHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] text-white py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/service-providers" className="flex items-center text-white hover:text-red-100 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Providers
          </Link>
          <div className="text-sm font-medium">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Apply to Become a Service Provider</h1>
          <p className="text-red-100 text-lg">Join thousands of professionals earning on eXobe!</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationHeader;
