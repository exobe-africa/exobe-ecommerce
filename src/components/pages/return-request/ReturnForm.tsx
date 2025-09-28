"use client";

import { Package, RotateCcw } from 'lucide-react';
import { Order, SelectedItem } from './types';
import { returnReasons } from './mockData';

interface ReturnFormProps {
  order: Order;
  selectedItems: { [key: number]: SelectedItem };
  onItemSelection: (itemId: number, selected: boolean, reason?: string, description?: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

export default function ReturnForm({
  order,
  selectedItems,
  onItemSelection,
  onCancel,
  onSubmit,
  canSubmit
}: ReturnFormProps) {
  const selectedItemsCount = Object.values(selectedItems).filter(item => item.selected).length;

  return (
    <div className="mt-8 p-6 bg-[#F6E2E0] rounded-lg border border-[#C8102E]/20">
      <h4 className="text-lg font-semibold text-[#000000] mb-6">Return Details</h4>
      
      {Object.entries(selectedItems).map(([itemId, itemData]) => {
        if (!itemData.selected) return null;
        const item = order.items.find(i => i.id === parseInt(itemId));
        if (!item) return null;

        return (
          <div key={itemId} className="mb-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#F6E2E0] rounded-lg flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-[#C8102E]" />
              </div>
              <h5 className="font-semibold text-[#000000] text-lg">{item.name}</h5>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-3">
                  Reason for Return *
                </label>
                <select
                  value={itemData.reason}
                  onChange={(e) => onItemSelection(parseInt(itemId), true, e.target.value, itemData.description)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] bg-white"
                  required
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-3">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={itemData.description}
                  onChange={(e) => onItemSelection(parseInt(itemId), true, itemData.reason, e.target.value)}
                  placeholder="Please provide additional details about the issue or reason for return..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-600 resize-none"
                />
                <p className="text-xs text-[#4A4A4A] mt-2">
                  Providing additional details helps us process your return faster
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {selectedItemsCount > 0 && (
        <div className="bg-white p-6 rounded-xl border border-[#C8102E]/20 mb-6 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-[#F6E2E0] rounded-lg flex items-center justify-center mr-3">
              <RotateCcw className="h-4 w-4 text-[#C8102E]" />
            </div>
            <h5 className="font-semibold text-[#000000]">Return Summary</h5>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[#4A4A4A]">
              <span className="font-medium text-[#000000]">{selectedItemsCount}</span> item{selectedItemsCount > 1 ? 's' : ''} selected for return
            </p>
            <p className="text-sm text-[#4A4A4A]">
              <span className="font-medium text-[#000000]">Processing time:</span> 3-5 business days after we receive your items
            </p>
            <p className="text-sm text-[#4A4A4A]">
              <span className="font-medium text-[#000000]">Return method:</span> Free return shipping label will be provided
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="flex-1 bg-[#C8102E] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Return Request
        </button>
      </div>
    </div>
  );
}
