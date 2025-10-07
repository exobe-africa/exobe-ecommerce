"use client";

import { useState } from 'react';
import { X, Package, Truck, CheckCircle, Clock, AlertCircle, MapPin, CreditCard, Download, FileText, Receipt } from 'lucide-react';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { getInvoiceUrl, getReceiptUrl, downloadDocument } from '../../../lib/api/documents';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onLeaveReview?: (order: Order) => void;
  onTrackPackage?: (order: Order) => void;
}

export default function OrderDetailsModal({ isOpen, onClose, order, onLeaveReview, onTrackPackage }: OrderDetailsModalProps) {
  const [isDownloading, setIsDownloading] = useState<'invoice' | 'receipt' | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  
  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  if (!isOpen || !order) return null;

  const handleDownloadInvoice = async () => {
    try {
      setIsDownloading('invoice');
      setDownloadError(null);
      
      // Get invoice URL from API
      const url = await getInvoiceUrl(order.id);
      
      // Download the invoice
      await downloadDocument(url, `invoice-${order.id}.pdf`);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      setDownloadError('Failed to download invoice. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      setIsDownloading('receipt');
      setDownloadError(null);
      
      // Get receipt URL from API
      const url = await getReceiptUrl(order.id);
      
      // Download the receipt
      await downloadDocument(url, `receipt-${order.id}.pdf`);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      setDownloadError('Failed to download receipt. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  // Check if order is paid (can download receipt)
  const isPaidOrder = order.status === 'delivered' || order.status === 'shipped';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
      case 'processing': return <Clock className="h-5 w-5" />;
      case 'cancelled': return <AlertCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: 'processing', label: 'Order Confirmed', completed: true },
      { key: 'shipped', label: 'Shipped', completed: status === 'shipped' || status === 'delivered' },
      { key: 'delivered', label: 'Delivered', completed: status === 'delivered' }
    ];
    return steps;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#F6E2E0] rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-[#C8102E]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#000000]">Order Details</h3>
                <p className="text-[#4A4A4A]">{order.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex-1 p-6 space-y-8">
          {/* Order Status */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium ${getStatusColor(order.status)} self-start`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
                <span className="text-[#4A4A4A] text-sm sm:text-base">
                  Placed on {new Date(order.date).toLocaleDateString('en-ZA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-[#000000]">R{order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Progress Steps */}
            {order.status !== 'cancelled' && (
              <div className="mb-6">
                {/* Mobile: Vertical Layout */}
                <div className="block sm:hidden space-y-4">
                  {getStatusSteps(order.status).map((step, index) => (
                    <div key={step.key} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed ? 'bg-[#C8102E] text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${step.completed ? 'text-[#000000]' : 'text-gray-500'}`}>
                          {step.label}
                        </p>
                      </div>
                      {index < getStatusSteps(order.status).length - 1 && (
                        <div className={`absolute left-4 mt-8 w-0.5 h-6 ${
                          step.completed ? 'bg-[#C8102E]' : 'bg-gray-200'
                        }`} style={{marginLeft: '15px'}} />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Desktop: Horizontal Layout */}
                <div className="hidden sm:flex items-center justify-between">
                  {getStatusSteps(order.status).map((step, index) => (
                    <div key={step.key} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-[#C8102E] text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      <div className="ml-3">
                        <p className={`font-medium ${step.completed ? 'text-[#000000]' : 'text-gray-500'}`}>
                          {step.label}
                        </p>
                      </div>
                      {index < getStatusSteps(order.status).length - 1 && (
                        <div className={`flex-1 h-1 mx-4 min-w-[60px] ${
                          step.completed ? 'bg-[#C8102E]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Truck className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Tracking Number</p>
                    <p className="font-mono text-blue-700 text-lg">{order.trackingNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h4 className="text-lg font-semibold text-[#000000] mb-4">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{item.image}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-[#000000]">{item.name}</h5>
                    {item.variant && (
                      <p className="text-sm text-[#4A4A4A]">{item.variant}</p>
                    )}
                    <p className="text-sm text-[#4A4A4A]">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#000000]">R{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-[#4A4A4A]">R{item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Address */}
            <div>
              <h4 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#C8102E]" />
                Shipping Address
              </h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-[#000000]">{order.shippingAddress.name}</p>
                <p className="text-[#4A4A4A]">{order.shippingAddress.street}</p>
                <p className="text-[#4A4A4A]">
                  {order.shippingAddress.city}, {order.shippingAddress.province}
                </p>
                <p className="text-[#4A4A4A]">{order.shippingAddress.postalCode}</p>
              </div>
            </div>

            {/* Payment & Summary */}
            <div>
              <h4 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-[#C8102E]" />
                Payment & Summary
              </h4>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Payment Method:</span>
                  <span className="font-medium text-[#000000]">{order.paymentMethod}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Subtotal:</span>
                    <span className="text-[#000000]">R{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Shipping:</span>
                    <span className="text-[#000000]">R{order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Tax:</span>
                    <span className="text-[#000000]">R{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#000000]">Total:</span>
                      <span className="font-bold text-[#C8102E] text-lg">R{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
            {downloadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {downloadError}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              {order.status === 'delivered' && onLeaveReview && (
                <button 
                  onClick={() => {
                    onLeaveReview(order);
                    onClose();
                  }}
                  className="flex-1 bg-[#C8102E] text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                >
                  Leave Review
                </button>
              )}
              {order.status === 'shipped' && onTrackPackage && (
                <button 
                  onClick={() => {
                    onTrackPackage(order);
                    onClose();
                  }}
                  className="flex-1 border border-blue-500 text-blue-600 px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Truck className="h-4 w-4" />
                  <span>Track Package</span>
                </button>
              )}
              
              {/* Invoice Download Button */}
              <button 
                onClick={handleDownloadInvoice}
                disabled={isDownloading === 'invoice'}
                className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isDownloading === 'invoice' ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    <span>Download Invoice</span>
                  </>
                )}
              </button>

              {/* Receipt Download Button - Only for paid orders */}
              {isPaidOrder && (
                <button 
                  onClick={handleDownloadReceipt}
                  disabled={isDownloading === 'receipt'}
                  className="flex-1 border border-green-500 text-green-600 px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isDownloading === 'receipt' ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Receipt className="h-4 w-4" />
                      <span>Download Receipt</span>
                    </>
                  )}
                </button>
              )}
              
              {order.status === 'processing' && (
                <button className="flex-1 border border-red-500 text-red-600 px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-red-50 transition-colors">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
