"use client";

import { Search, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const defaultMethods = [
  {
    id: 'online-tracking',
    title: 'Online Tracking',
    icon: Search,
    bgColor: 'bg-[#C8102E]',
    steps: [
      'Visit our dedicated order tracking page',
      'Enter your order number or tracking number',
      'Enter the email address used for your order',
      'Click "Track Order" to view your order status'
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

      {/* Track Order CTA */}
      <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-xl p-6 mb-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-3">Ready to Track Your Order?</h3>
        <p className="text-white/90 mb-4">
          Use our dedicated tracking page to get real-time updates on your order status.
        </p>
        <Link
          href="/track-order"
          className="inline-flex items-center bg-white text-[#C8102E] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          <Search className="h-5 w-5 mr-2" />
          Track Your Order Now
          <ExternalLink className="h-4 w-4 ml-2" />
        </Link>
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
