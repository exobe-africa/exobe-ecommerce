"use client";

import { Shield } from 'lucide-react';

const SecurityNoticeCard = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <Shield className="h-6 w-6 text-green-600 mr-3" />
        <h3 className="text-lg font-semibold text-green-800">Your Information is Safe</h3>
      </div>
      <div className="space-y-2 text-sm text-green-700">
        <p>• No payment has been processed or charged</p>
        <p>• Your payment information remains secure</p>
        <p>• All transactions use 256-bit SSL encryption</p>
        <p>• Your cart items have been saved for 24 hours</p>
      </div>
    </div>
  );
};

export default SecurityNoticeCard;
