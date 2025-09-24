"use client";

import { Shield, Lock, CheckCircle } from 'lucide-react';

const defaultSecurityFeatures = [
  'SSL Encryption',
  'PCI DSS Compliant',
  '3D Secure Authentication',
  'Fraud Protection'
];

interface PaymentSecurityProps {
  title?: string;
  securityTitle?: string;
  securityDescription?: string;
  storageTitle?: string;
  storageDescription?: string;
  securityFeatures?: string[];
}

const PaymentSecurity: React.FC<PaymentSecurityProps> = ({
  title = "Payment Security",
  securityTitle = "Your Payments Are Secure",
  securityDescription = "We use industry-leading security measures to protect your payment information.",
  storageTitle = "We Never Store Your Card Details",
  storageDescription = "Your payment information is processed securely through our certified payment partners. eXobe never stores your full credit card details on our servers.",
  securityFeatures = defaultSecurityFeatures
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-green-500" />
          <h3 className="text-xl font-semibold text-green-800">{securityTitle}</h3>
        </div>
        <p className="text-green-700 mb-4">
          {securityDescription}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <Lock className="h-6 w-6 text-[#4A4A4A]" />
          <h3 className="text-xl font-semibold text-[#000000]">{storageTitle}</h3>
        </div>
        <p className="text-[#4A4A4A]">
          {storageDescription}
        </p>
      </div>
    </div>
  );
};

export default PaymentSecurity;
