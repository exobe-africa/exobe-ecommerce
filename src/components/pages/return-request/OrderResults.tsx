"use client";

import { Order, SelectedItem } from './types';
import OrderHeader from './OrderHeader';
import ReturnEligibility from './ReturnEligibility';
import OrderItemsList from './OrderItemsList';
import ReturnForm from './ReturnForm';

interface OrderResultsProps {
  order: Order;
  showReturnForm: boolean;
  selectedItems: { [key: number]: SelectedItem };
  onStartReturn: () => void;
  onItemSelection: (itemId: number, selected: boolean, reason?: string, description?: string) => void;
  onCancelReturn: () => void;
  onSubmitReturn: () => void;
  canSubmitReturn: boolean;
}

export default function OrderResults({
  order,
  showReturnForm,
  selectedItems,
  onStartReturn,
  onItemSelection,
  onCancelReturn,
  onSubmitReturn,
  canSubmitReturn
}: OrderResultsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
      <OrderHeader order={order} />
      <ReturnEligibility order={order} />
      <OrderItemsList
        order={order}
        showReturnForm={showReturnForm}
        selectedItems={selectedItems}
        onStartReturn={onStartReturn}
        onItemSelection={(itemId, selected) => onItemSelection(itemId, selected)}
      />
      
      {showReturnForm && order.returnEligible && (
        <ReturnForm
          order={order}
          selectedItems={selectedItems}
          onItemSelection={onItemSelection}
          onCancel={onCancelReturn}
          onSubmit={onSubmitReturn}
          canSubmit={canSubmitReturn}
        />
      )}
    </div>
  );
}
