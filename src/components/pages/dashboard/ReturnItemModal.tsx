"use client";

import { useState } from 'react';
import { X, RotateCcw, AlertCircle, CheckCircle, Package, Camera, FileText } from 'lucide-react';
import { useScrollLock } from '../../../hooks/useScrollLock';

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
  items: OrderItem[];
}

interface ReturnItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSubmit: (returnData: ReturnRequest) => void;
}

interface ReturnItem {
  itemId: number;
  quantity: number;
  reason: string;
  condition: string;
  description: string;
}

interface ReturnRequest {
  orderId: string;
  items: ReturnItem[];
  returnMethod: 'pickup' | 'dropoff';
  refundMethod: 'original' | 'store_credit';
}

const returnReasons = [
  { value: 'defective', label: 'Defective/Damaged Product', eligible: true, description: 'Product arrived damaged or has manufacturing defects' },
  { value: 'wrong_item', label: 'Wrong Item Received', eligible: true, description: 'Received different product than ordered' },
  { value: 'size_fit', label: 'Size/Fit Issues', eligible: true, description: 'Product doesn\'t fit as expected' },
  { value: 'not_as_described', label: 'Not as Described', eligible: true, description: 'Product doesn\'t match description or images' },
  { value: 'changed_mind', label: 'Changed Mind', eligible: true, description: 'No longer need the product (within return window)' },
  { value: 'quality_issues', label: 'Quality Issues', eligible: true, description: 'Product quality below expectations' },
  { value: 'late_delivery', label: 'Late Delivery', eligible: false, description: 'Delivery was significantly delayed' },
  { value: 'duplicate_order', label: 'Duplicate Order', eligible: true, description: 'Accidentally ordered multiple times' }
];

const itemConditions = [
  { value: 'unopened', label: 'Unopened/Unused', description: 'Original packaging, never used' },
  { value: 'opened_unused', label: 'Opened but Unused', description: 'Packaging opened but product not used' },
  { value: 'lightly_used', label: 'Lightly Used', description: 'Used briefly, excellent condition' },
  { value: 'used', label: 'Used', description: 'Used normally, good condition' },
  { value: 'damaged', label: 'Damaged', description: 'Product has visible damage or defects' }
];

export default function ReturnItemModal({ isOpen, onClose, order, onSubmit }: ReturnItemModalProps) {
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);
  const [returnMethod, setReturnMethod] = useState<'pickup' | 'dropoff'>('pickup');
  const [refundMethod, setRefundMethod] = useState<'original' | 'store_credit'>('original');
  const [currentStep, setCurrentStep] = useState(1);

  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  const initializeReturnItems = () => {
    if (order) {
      setReturnItems(order.items.map(item => ({
        itemId: item.id,
        quantity: 1,
        reason: '',
        condition: '',
        description: ''
      })));
    }
  };

  const updateReturnItem = (itemId: number, field: keyof ReturnItem, value: string | number) => {
    setReturnItems(prev => prev.map(item => 
      item.itemId === itemId ? { ...item, [field]: value } : item
    ));
  };

  const getReturnPolicy = (reason: string) => {
    const reasonData = returnReasons.find(r => r.value === reason);
    if (!reasonData?.eligible) {
      return { eligible: false, message: 'This reason is not eligible for returns' };
    }

    // Return policy logic
    const orderDate = new Date(order?.date || '');
    const daysSinceOrder = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    if (reason === 'defective' || reason === 'wrong_item') {
      return { eligible: true, message: '30-day return window for defective/wrong items' };
    } else if (daysSinceOrder <= 14) {
      return { eligible: true, message: '14-day return window applies' };
    } else if (daysSinceOrder <= 30 && reason !== 'changed_mind') {
      return { eligible: true, message: '30-day return window for quality issues' };
    } else {
      return { eligible: false, message: 'Return window has expired' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    const validItems = returnItems.filter(item => 
      item.reason && item.condition && item.quantity > 0
    );

    if (validItems.length === 0) return;

    onSubmit({
      orderId: order.id,
      items: validItems,
      returnMethod,
      refundMethod
    });

    onClose();
  };

  const canProceedToNext = () => {
    return returnItems.some(item => item.reason && item.condition);
  };

  if (!isOpen || !order) return null;

  if (returnItems.length === 0) {
    initializeReturnItems();
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <RotateCcw className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">Return Items</h3>
                <p className="text-sm text-[#4A4A4A]">Order {order.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-8">
              <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-[#C8102E]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#C8102E] text-white' : 'bg-gray-200'}`}>
                  <span className="text-sm font-medium">1</span>
                </div>
                <span className="text-sm font-medium">Select Items</span>
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-[#C8102E]' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-[#C8102E]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#C8102E] text-white' : 'bg-gray-200'}`}>
                  <span className="text-sm font-medium">2</span>
                </div>
                <span className="text-sm font-medium">Return Options</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 p-6 space-y-6">
              {currentStep === 1 && (
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-[#000000] mb-4">Select Items to Return</h4>
                    <div className="space-y-4">
                      {order.items.map((item) => {
                        const returnItem = returnItems.find(ri => ri.itemId === item.id);
                        if (!returnItem) return null;

                        const policy = returnItem.reason ? getReturnPolicy(returnItem.reason) : null;

                        return (
                          <div key={item.id} className="border border-gray-200 rounded-xl p-6">
                            {/* Product Info */}
                            <div className="flex items-start space-x-4 mb-6">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">{item.image}</span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-[#000000] mb-1">{item.name}</h5>
                                {item.variant && (
                                  <p className="text-sm text-[#4A4A4A] mb-1">{item.variant}</p>
                                )}
                                <p className="text-sm text-[#4A4A4A]">
                                  Ordered: {item.quantity} • R{item.price.toFixed(2)} each
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Return Quantity */}
                              <div>
                                <label className="block text-sm font-medium text-[#000000] mb-2">
                                  Return Quantity
                                </label>
                                <select
                                  value={returnItem.quantity}
                                  onChange={(e) => updateReturnItem(item.id, 'quantity', parseInt(e.target.value))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000]"
                                >
                                  {Array.from({ length: item.quantity }, (_, i) => i + 1).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Return Reason */}
                              <div>
                                <label className="block text-sm font-medium text-[#000000] mb-2">
                                  Return Reason
                                </label>
                                <select
                                  value={returnItem.reason}
                                  onChange={(e) => updateReturnItem(item.id, 'reason', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000]"
                                >
                                  <option value="">Select a reason</option>
                                  {returnReasons.map(reason => (
                                    <option key={reason.value} value={reason.value}>
                                      {reason.label}
                                    </option>
                                  ))}
                                </select>
                                {returnItem.reason && (
                                  <p className="text-xs text-[#4A4A4A] mt-1">
                                    {returnReasons.find(r => r.value === returnItem.reason)?.description}
                                  </p>
                                )}
                              </div>

                              {/* Item Condition */}
                              <div>
                                <label className="block text-sm font-medium text-[#000000] mb-2">
                                  Item Condition
                                </label>
                                <select
                                  value={returnItem.condition}
                                  onChange={(e) => updateReturnItem(item.id, 'condition', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000]"
                                >
                                  <option value="">Select condition</option>
                                  {itemConditions.map(condition => (
                                    <option key={condition.value} value={condition.value}>
                                      {condition.label}
                                    </option>
                                  ))}
                                </select>
                                {returnItem.condition && (
                                  <p className="text-xs text-[#4A4A4A] mt-1">
                                    {itemConditions.find(c => c.value === returnItem.condition)?.description}
                                  </p>
                                )}
                              </div>

                              {/* Additional Details */}
                              <div>
                                <label className="block text-sm font-medium text-[#000000] mb-2">
                                  Additional Details (optional)
                                </label>
                                <textarea
                                  value={returnItem.description}
                                  onChange={(e) => updateReturnItem(item.id, 'description', e.target.value)}
                                  placeholder="Provide more details about the issue..."
                                  rows={3}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none text-[#000000] placeholder-gray-500"
                                  maxLength={500}
                                />
                              </div>
                            </div>

                            {/* Return Policy Status */}
                            {policy && (
                              <div className={`mt-4 p-4 rounded-xl flex items-center space-x-3 ${
                                policy.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                              }`}>
                                {policy.eligible ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-600" />
                                )}
                                <div>
                                  <p className={`font-medium ${policy.eligible ? 'text-green-800' : 'text-red-800'}`}>
                                    {policy.eligible ? 'Return Eligible' : 'Return Not Eligible'}
                                  </p>
                                  <p className={`text-sm ${policy.eligible ? 'text-green-700' : 'text-red-700'}`}>
                                    {policy.message}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-[#000000] mb-4">Return Options</h4>
                    
                    {/* Return Method */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-[#000000] mb-3">
                        How would you like to return the items?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          onClick={() => setReturnMethod('pickup')}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            returnMethod === 'pickup' 
                              ? 'border-[#C8102E] bg-[#F6E2E0]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Package className="h-6 w-6 text-[#C8102E]" />
                            <div>
                              <p className="font-medium text-[#000000]">Free Pickup</p>
                              <p className="text-sm text-[#4A4A4A]">We'll collect from your address</p>
                            </div>
                          </div>
                        </div>
                        
                        <div
                          onClick={() => setReturnMethod('dropoff')}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            returnMethod === 'dropoff' 
                              ? 'border-[#C8102E] bg-[#F6E2E0]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Package className="h-6 w-6 text-[#C8102E]" />
                            <div>
                              <p className="font-medium text-[#000000]">Drop Off</p>
                              <p className="text-sm text-[#4A4A4A]">Drop at our collection point</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Refund Method */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-[#000000] mb-3">
                        How would you like to receive your refund?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          onClick={() => setRefundMethod('original')}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            refundMethod === 'original' 
                              ? 'border-[#C8102E] bg-[#F6E2E0]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-[#C8102E]" />
                            <div>
                              <p className="font-medium text-[#000000]">Original Payment Method</p>
                              <p className="text-sm text-[#4A4A4A]">3-5 business days</p>
                            </div>
                          </div>
                        </div>
                        
                        <div
                          onClick={() => setRefundMethod('store_credit')}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            refundMethod === 'store_credit' 
                              ? 'border-[#C8102E] bg-[#F6E2E0]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-[#C8102E]" />
                            <div>
                              <p className="font-medium text-[#000000]">Store Credit</p>
                              <p className="text-sm text-[#4A4A4A]">Instant credit + 5% bonus</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Return Summary */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h5 className="font-semibold text-[#000000] mb-3">Return Summary</h5>
                      {returnItems.filter(item => item.reason && item.condition).map(item => {
                        const orderItem = order.items.find(oi => oi.id === item.itemId);
                        if (!orderItem) return null;
                        
                        return (
                          <div key={item.itemId} className="flex justify-between items-center py-2">
                            <span className="text-[#4A4A4A]">
                              {orderItem.name} (x{item.quantity})
                            </span>
                            <span className="font-medium text-[#000000]">
                              R{(orderItem.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#000000]">Total Refund:</span>
                          <span className="font-bold text-[#C8102E] text-lg">
                            R{returnItems.filter(item => item.reason && item.condition)
                              .reduce((total, item) => {
                                const orderItem = order.items.find(oi => oi.id === item.itemId);
                                return total + (orderItem ? orderItem.price * item.quantity : 0);
                              }, 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-2xl">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {currentStep === 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!canProceedToNext()}
                      className="flex-1 bg-[#C8102E] text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#C8102E] text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                    >
                      Submit Return Request
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
