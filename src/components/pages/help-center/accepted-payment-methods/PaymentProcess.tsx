"use client";

import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

const defaultProcessSteps = [
  {
    step: 1,
    title: 'Select Payment Method',
    description: 'Choose your preferred payment method during checkout.',
    icon: CreditCard
  },
  {
    step: 2,
    title: 'Enter Payment Details',
    description: 'Securely enter your payment information on our encrypted checkout page.',
    icon: Lock
  },
  {
    step: 3,
    title: 'Verify Transaction',
    description: 'Complete any required authentication (like OTP or 3D Secure).',
    icon: Shield
  },
  {
    step: 4,
    title: 'Confirmation',
    description: 'Receive instant confirmation of your successful payment.',
    icon: CheckCircle
  }
];

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PaymentProcessProps {
  title?: string;
  steps?: ProcessStep[];
}

const PaymentProcess: React.FC<PaymentProcessProps> = ({
  title = "How Payment Processing Works",
  steps = defaultProcessSteps
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-6">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div key={step.step} className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#000000] mb-2">{step.title}</h3>
                <p className="text-[#4A4A4A]">{step.description}</p>
              </div>
              <div className="flex-shrink-0">
                <IconComponent className="h-6 w-6 text-[#4A4A4A]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentProcess;
