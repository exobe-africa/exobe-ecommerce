"use client";

import { RotateCcw, Package } from 'lucide-react';
import { Order, SelectedItem } from './types';
import { formatCurrency } from '@/components/common/orderUtils';

interface OrderItemsListProps {
  order: Order;
  showReturnForm: boolean;
  selectedItems: { [key: number]: SelectedItem };
  onStartReturn: () => void;
  onItemSelection: (itemId: number, selected: boolean) => void;
}

export default function OrderItemsList({
  order,
  showReturnForm,
  selectedItems,
  onStartReturn,
  onItemSelection
}: OrderItemsListProps) {
  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#000000]">Order Items</h3>
        {order.returnEligible && !showReturnForm && (
          <button
            onClick={onStartReturn}
            className="bg-[#C8102E] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Return Request
          </button>
        )}
      </div>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            {showReturnForm && order.returnEligible && (
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={selectedItems[item.id]?.selected || false}
                  onChange={(e) => onItemSelection(item.id, e.target.checked)}
                  disabled={!item.canReturn}
                  className="w-4 h-4 text-[#C8102E] bg-gray-100 border-gray-300 rounded focus:ring-[#C8102E] focus:ring-2"
                />
              </div>
            )}
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#000000]">{item.name}</h4>
              {item.variant && (
                <p className="text-sm text-[#4A4A4A]">{item.variant}</p>
              )}
              <p className="text-sm text-[#4A4A4A]">Quantity: {item.quantity}</p>
              {!item.canReturn && item.returnReason && (
                <p className="text-sm text-red-600 mt-1">{item.returnReason}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#000000]">{formatCurrency(item.price)}</p>
              {item.canReturn ? (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Returnable</span>
              ) : (
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Not Returnable</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
