"use client";

import { FileText, MessageCircle, Wrench, CheckCircle } from 'lucide-react';

const defaultProcessSteps = [
  {
    step: 1,
    title: 'Gather Required Information',
    description: 'Collect your order number, proof of purchase, and product details.',
    icon: FileText
  },
  {
    step: 2,
    title: 'Contact eXobe Support',
    description: 'Reach out via live chat, email, or phone to initiate your warranty claim.',
    icon: MessageCircle
  },
  {
    step: 3,
    title: 'Assessment & Diagnosis',
    description: 'Our team will assess the issue and determine the best solution.',
    icon: Wrench
  },
  {
    step: 4,
    title: 'Resolution',
    description: 'Receive repair, replacement, or refund based on warranty terms.',
    icon: CheckCircle
  }
];

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface WarrantyClaimProcessProps {
  title?: string;
  steps?: ProcessStep[];
}

const WarrantyClaimProcess: React.FC<WarrantyClaimProcessProps> = ({
  title = "How to Make a Warranty Claim",
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

export default WarrantyClaimProcess;
