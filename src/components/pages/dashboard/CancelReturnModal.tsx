"use client";

import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface CancelReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  returnId: string;
  returnAmount: number;
}

export default function CancelReturnModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  returnId, 
  returnAmount 
}: CancelReturnModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">Cancel Return Request</h3>
                <p className="text-sm text-[#4A4A4A]">{returnId}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <p className="text-[#4A4A4A] mb-4">
              Are you sure you want to cancel this return request? This action cannot be undone.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-medium text-red-900 mb-2">What happens when you cancel:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Your return request will be permanently cancelled</li>
                <li>• You won't be able to return these items through this request</li>
                <li>• The R{returnAmount.toFixed(2)} refund will not be processed</li>
                <li>• You can create a new return request if needed (subject to return policy)</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">Need help instead?</h4>
            <p className="text-sm text-blue-700 mb-3">
              If you're having issues with your return, our support team can help you resolve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => {
                  const message = `Hi! I need help with my return request ${returnId}. I'm considering cancelling it but would like to discuss my options first. Can you please assist me?`;
                  const whatsappUrl = `https://wa.me/27821234567?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                WhatsApp Support
              </button>
              <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-colors">
                Call Support
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 sm:py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Keep Return Request
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-red-600 text-white px-6 py-3 sm:py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              Yes, Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
