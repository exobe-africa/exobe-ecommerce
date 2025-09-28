"use client";

import { Package, CheckCircle, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const defaultProcessSteps = [
  {
    step: 1,
    title: 'Initiate Return Request',
    description: 'Log into your eXobe account and go to "My Orders". Find the item you want to return and click "Return Item".',
    icon: Package,
    type: 'account'
  },
  {
    step: 2,
    title: 'Select Return Reason',
    description: 'Choose the reason for your return from the dropdown menu and provide any additional details.',
    icon: CheckCircle,
    type: 'both'
  },
  {
    step: 3,
    title: 'Print Return Label',
    description: 'Download and print the prepaid return shipping label that will be emailed to you.',
    icon: Package,
    type: 'both'
  },
  {
    step: 4,
    title: 'Package and Ship',
    description: 'Securely package the item with all original accessories and attach the return label.',
    icon: Package,
    type: 'both'
  }
];

const guestProcessSteps = [
  {
    step: 1,
    title: 'Visit Guest Return Page',
    description: 'Go to our guest return page and enter your order number and email address.',
    icon: ExternalLink,
    type: 'guest'
  },
  {
    step: 2,
    title: 'Verify Order Details',
    description: 'Confirm your order details and select the items you want to return.',
    icon: CheckCircle,
    type: 'guest'
  },
  {
    step: 3,
    title: 'Select Return Reason',
    description: 'Choose the reason for your return and provide any additional details.',
    icon: CheckCircle,
    type: 'guest'
  },
  {
    step: 4,
    title: 'Submit Return Request',
    description: 'Submit your return request and wait for approval. You\'ll receive email updates.',
    icon: Package,
    type: 'guest'
  }
];

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'account' | 'guest' | 'both';
}

interface ReturnProcessProps {
  title?: string;
  steps?: ProcessStep[];
}

const ReturnProcess: React.FC<ReturnProcessProps> = ({
  title = "How to Return an Item",
  steps = defaultProcessSteps
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      {/* Account-based Returns */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#000000]">For Registered Customers</h3>
        </div>
        
        <div className="space-y-4">
          {defaultProcessSteps.map((step) => (
            <div key={`account-${step.step}`} className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.step}
              </div>
              <div>
                <h4 className="font-semibold text-[#000000] mb-2">{step.title}</h4>
                <p className="text-[#4A4A4A] text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Returns */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-[#4A4A4A] rounded-full flex items-center justify-center">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#000000]">For Guest Customers</h3>
        </div>
        
        <div className="space-y-4">
          {guestProcessSteps.map((step) => (
            <div key={`guest-${step.step}`} className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-[#4A4A4A] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.step}
              </div>
              <div>
                <h4 className="font-semibold text-[#000000] mb-2">{step.title}</h4>
                <p className="text-[#4A4A4A] text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-6 border border-[#C8102E]/20">
        <h3 className="text-lg font-semibold text-[#000000] mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/dashboard?tab=orders"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group"
          >
            <User className="h-5 w-5 text-[#C8102E] group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-[#000000]">My Account Returns</p>
              <p className="text-sm text-[#4A4A4A]">Access your order history</p>
            </div>
          </Link>
          <Link 
            href="/return-request"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group"
          >
            <ExternalLink className="h-5 w-5 text-[#C8102E] group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-[#000000]">Guest Return Request</p>
              <p className="text-sm text-[#4A4A4A]">Return without an account</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnProcess;
