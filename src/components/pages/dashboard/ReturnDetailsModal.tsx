"use client";

import { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Truck,
  CreditCard,
  MessageSquare,
  Phone,
  Mail,
  Copy,
  Download
} from 'lucide-react';

interface ReturnRequest {
  id: string;
  orderId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'pickup_scheduled' | 'completed' | 'cancelled';
  amount: number;
  reason: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  trackingNumber?: string;
  estimatedRefund?: string;
  notes?: string;
}

interface ReturnDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnRequest: ReturnRequest | null;
  onCancelReturn?: (returnRequest: ReturnRequest) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'approved': return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'rejected': return 'text-red-700 bg-red-50 border-red-200';
    case 'pickup_scheduled': return 'text-purple-700 bg-purple-50 border-purple-200';
    case 'completed': return 'text-green-700 bg-green-50 border-green-200';
    case 'cancelled': return 'text-gray-700 bg-gray-50 border-gray-200';
    default: return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock className="h-5 w-5" />;
    case 'approved': return <CheckCircle className="h-5 w-5" />;
    case 'rejected': return <AlertTriangle className="h-5 w-5" />;
    case 'pickup_scheduled': return <Package className="h-5 w-5" />;
    case 'completed': return <CheckCircle className="h-5 w-5" />;
    case 'cancelled': return <AlertTriangle className="h-5 w-5" />;
    default: return <Clock className="h-5 w-5" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'Under Review';
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'pickup_scheduled': return 'Pickup Scheduled';
    case 'completed': return 'Completed';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

const getStatusDescription = (status: string) => {
  switch (status) {
    case 'pending': return 'Your return request is being reviewed by our team. We\'ll update you within 24-48 hours.';
    case 'approved': return 'Your return has been approved! We\'ll arrange pickup or provide return instructions soon.';
    case 'rejected': return 'Unfortunately, your return request cannot be processed. See details below.';
    case 'pickup_scheduled': return 'A pickup has been scheduled for your return. Please have the items ready.';
    case 'completed': return 'Your return has been processed and refund has been issued.';
    case 'cancelled': return 'This return request has been cancelled.';
    default: return '';
  }
};

export default function ReturnDetailsModal({ isOpen, onClose, returnRequest, onCancelReturn }: ReturnDetailsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  if (!isOpen || !returnRequest) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(returnRequest.status)}`}>
                {getStatusIcon(returnRequest.status)}
                <span>{getStatusLabel(returnRequest.status)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#000000]">Return Details</h2>
                <p className="text-[#4A4A4A] mt-1">{returnRequest.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Status Information */}
            <div className={`p-4 rounded-xl border ${getStatusColor(returnRequest.status).replace('text-', 'border-').replace('bg-', 'bg-')}`}>
              <h3 className="font-semibold text-[#000000] mb-2">Current Status</h3>
              <p className="text-sm text-[#4A4A4A]">{getStatusDescription(returnRequest.status)}</p>
            </div>

            {/* Return Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4A4A4A]">Order ID</p>
                    <p className="font-semibold text-[#000000]">{returnRequest.orderId}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4A4A4A]">Request Date</p>
                    <p className="font-semibold text-[#000000]">
                      {new Date(returnRequest.requestDate).toLocaleDateString('en-ZA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#F6E2E0] rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-[#C8102E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4A4A4A]">Return Amount</p>
                    <p className="font-semibold text-[#000000]">R{returnRequest.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items to Return */}
            <div>
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Items to Return</h3>
              <div className="space-y-3">
                {returnRequest.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#000000]">{item.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-[#4A4A4A] mt-1">
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: R{item.price.toFixed(2)}</span>
                        <span>Total: R{(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Reason and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#000000] mb-3">Return Reason</h3>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[#4A4A4A]">{returnRequest.reason}</p>
                </div>
              </div>

              {returnRequest.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-3">Additional Notes</h3>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-[#4A4A4A]">{returnRequest.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tracking Information */}
            {returnRequest.trackingNumber && (
              <div>
                <h3 className="text-lg font-semibold text-[#000000] mb-3">Tracking Information</h3>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Tracking Number</p>
                      <p className="font-mono text-lg text-blue-900">{returnRequest.trackingNumber}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(returnRequest.trackingNumber!, 'tracking')}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">{copiedField === 'tracking' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Refund Information */}
            {returnRequest.estimatedRefund && (
              <div>
                <h3 className="text-lg font-semibold text-[#000000] mb-3">Refund Information</h3>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Estimated Refund Timeline</p>
                      <p className="font-medium text-green-900">{returnRequest.estimatedRefund}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Support */}
            <div>
              <h3 className="text-lg font-semibold text-[#000000] mb-3">Need Help?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => {
                    const message = `Hi! I need help with my return request ${returnRequest.id} for order ${returnRequest.orderId}. Current status: ${getStatusLabel(returnRequest.status)}. Can you please assist me?`;
                    const whatsappUrl = `https://wa.me/27821234567?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-[#000000]">WhatsApp Support</p>
                    <p className="text-sm text-[#4A4A4A]">Get instant help</p>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <Phone className="h-5 w-5 text-[#C8102E]" />
                  <div className="text-left">
                    <p className="font-medium text-[#000000]">Call Us</p>
                    <p className="text-sm text-[#4A4A4A]">+27 11 123 4567</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    const subject = `Return Request Help - ${returnRequest.id}`;
                    const body = `Hi eXobe Support Team,

I need assistance with my return request:

Return ID: ${returnRequest.id}
Order ID: ${returnRequest.orderId}
Current Status: ${getStatusLabel(returnRequest.status)}
Return Amount: R${returnRequest.amount.toFixed(2)}

Please help me with my query.

Thank you,`;
                    const mailtoUrl = `mailto:returns@exobe.africa?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = mailtoUrl;
                  }}
                  className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Mail className="h-5 w-5 text-[#C8102E]" />
                  <div className="text-left">
                    <p className="font-medium text-[#000000]">Email Support</p>
                    <p className="text-sm text-[#4A4A4A]">returns@exobe.africa</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {returnRequest.status === 'pending' && (
              <button 
                onClick={() => {
                  onCancelReturn?.(returnRequest);
                  onClose();
                }}
                className="flex-1 border border-red-500 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
              >
                Cancel Return Request
              </button>
            )}
            
            {returnRequest.status === 'pickup_scheduled' && (
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Track Pickup Status
              </button>
            )}

            <button className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
