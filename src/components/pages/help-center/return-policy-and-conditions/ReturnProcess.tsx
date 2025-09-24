"use client";

import { Package, CheckCircle } from 'lucide-react';

const defaultProcessSteps = [
  {
    step: 1,
    title: 'Initiate Return Request',
    description: 'Log into your eXobe account and go to "My Orders". Find the item you want to return and click "Return Item".',
    icon: Package
  },
  {
    step: 2,
    title: 'Select Return Reason',
    description: 'Choose the reason for your return from the dropdown menu and provide any additional details.',
    icon: CheckCircle
  },
  {
    step: 3,
    title: 'Print Return Label',
    description: 'Download and print the prepaid return shipping label that will be emailed to you.',
    icon: Package
  },
  {
    step: 4,
    title: 'Package and Ship',
    description: 'Securely package the item with all original accessories and attach the return label.',
    icon: Package
  }
];

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
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
      
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.step} className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {step.step}
            </div>
            <div>
              <h3 className="font-semibold text-[#000000] mb-2">{step.title}</h3>
              <p className="text-[#4A4A4A]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnProcess;
