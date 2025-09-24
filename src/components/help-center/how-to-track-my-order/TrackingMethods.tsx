"use client";

import { Search, Mail } from 'lucide-react';

const defaultMethods = [
  {
    id: 'online-tracking',
    title: 'Online Tracking',
    icon: Search,
    bgColor: 'bg-[#C8102E]',
    steps: [
      'Go to the eXobe website',
      'Click on "Track Order" in the top menu',
      'Enter your order number and email address',
      'Click "Track" to view your order status'
    ]
  },
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    icon: Mail,
    bgColor: 'bg-[#4A4A4A]',
    steps: [
      'Check your email for order confirmation',
      'Look for shipping notification with tracking number',
      'Click the tracking link in the email',
      'Monitor updates sent to your inbox'
    ]
  }
];

const defaultTrackingInfo = {
  title: 'Tracking Number Format',
  description: 'Your eXobe tracking number will look like this:',
  example: 'EX123456789ZA',
  note: 'Tracking numbers are typically 12 characters long and start with "EX"'
};

interface TrackingMethod {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  steps: string[];
}

interface TrackingNumberInfo {
  title: string;
  description: string;
  example: string;
  note: string;
}

interface TrackingMethodsProps {
  title?: string;
  methods?: TrackingMethod[];
  trackingInfo?: TrackingNumberInfo;
  showTrackingInfo?: boolean;
}

const TrackingMethods: React.FC<TrackingMethodsProps> = ({
  title = "How to Track Your Order",
  methods = defaultMethods,
  trackingInfo = defaultTrackingInfo,
  showTrackingInfo = true
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {methods.map((method) => {
          const IconComponent = method.icon;
          return (
            <div key={method.id} className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className={`w-12 h-12 ${method.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-3">{method.title}</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#4A4A4A]">
                {method.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      {showTrackingInfo && (
        <div className="bg-[#F6E2E0] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#000000] mb-3">{trackingInfo.title}</h3>
          <p className="text-[#4A4A4A] mb-4">
            {trackingInfo.description}
          </p>
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-[#C8102E]">
            <code className="text-[#C8102E] font-mono text-lg">{trackingInfo.example}</code>
          </div>
          <p className="text-sm text-[#4A4A4A] mt-3">
            {trackingInfo.note}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackingMethods;
