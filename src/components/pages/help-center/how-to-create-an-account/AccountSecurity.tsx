"use client";

import { Shield } from 'lucide-react';

const defaultSecurityFeatures = [
  'SSL encrypted data transmission',
  'Secure password storage',
  'Login attempt monitoring',
  'Account activity alerts'
];

const defaultPrivacyFeatures = [
  'POPIA compliant data handling',
  'No sharing with third parties',
  'Control your communication preferences',
  'Right to data deletion'
];

interface AccountSecurityProps {
  title?: string;
  subtitle?: string;
  securityFeatures?: string[];
  privacyFeatures?: string[];
  securityTitle?: string;
  privacyTitle?: string;
}

const AccountSecurity: React.FC<AccountSecurityProps> = ({
  title = "Account Security",
  subtitle = "Your Account is Protected",
  securityFeatures = defaultSecurityFeatures,
  privacyFeatures = defaultPrivacyFeatures,
  securityTitle = "Security Features:",
  privacyTitle = "Privacy Protection:"
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-green-500" />
          <h3 className="text-xl font-semibold text-green-800">{subtitle}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
          <div>
            <h4 className="font-semibold mb-2">{securityTitle}</h4>
            <ul className="space-y-1 text-sm">
              {securityFeatures.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{privacyTitle}</h4>
            <ul className="space-y-1 text-sm">
              {privacyFeatures.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
