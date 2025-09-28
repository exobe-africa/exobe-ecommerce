"use client";

import { useState } from 'react';
import {
  ReturnRequestHero,
  OrderSearchForm,
  OrderResults,
  ReturnPolicyInfo,
  Order,
  SelectedItem,
  mockOrders
} from '@/components/pages/return-request';
import { AccountBenefits, SupportSection } from '@/components/common';

export default function ReturnRequestPage() {
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [showAccountBenefits, setShowAccountBenefits] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{[key: number]: SelectedItem}>({});
  const [showReturnForm, setShowReturnForm] = useState(false);

  const handleOrderFound = (order: Order) => {
    setFoundOrder(order);
    setShowAccountBenefits(true);
    setShowReturnForm(false);
    setSelectedItems({});
  };

  const handleError = (error: string) => {
    setFoundOrder(null);
    setShowAccountBenefits(false);
    setShowReturnForm(false);
    setSelectedItems({});
  };

  const handleStartReturn = () => {
    setShowReturnForm(true);
  };

  const handleItemSelection = (itemId: number, selected: boolean, reason: string = '', description: string = '') => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: { selected, reason, description }
    }));
  };

  const handleCancelReturn = () => {
    setShowReturnForm(false);
    setSelectedItems({});
  };

  const handleSubmitReturn = () => {
    const selectedItemsCount = Object.values(selectedItems).filter(item => item.selected).length;
    if (selectedItemsCount === 0) {
      alert('Please select at least one item to return.');
      return;
    }
    
    // In real app, this would submit to API
    alert('Return request submitted successfully! You will receive a confirmation email shortly.');
    setShowReturnForm(false);
    setSelectedItems({});
  };

  const selectedItemsCount = Object.values(selectedItems).filter(item => item.selected).length;
  const canSubmitReturn = selectedItemsCount > 0 && Object.entries(selectedItems).every(([id, item]) => 
    !item.selected || (item.reason && item.reason !== '')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ReturnRequestHero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OrderSearchForm 
          onOrderFound={handleOrderFound}
          onError={handleError}
          mockOrders={mockOrders}
        />

        {foundOrder && (
          <OrderResults
            order={foundOrder}
            showReturnForm={showReturnForm}
            selectedItems={selectedItems}
            onStartReturn={handleStartReturn}
            onItemSelection={handleItemSelection}
            onCancelReturn={handleCancelReturn}
            onSubmitReturn={handleSubmitReturn}
            canSubmitReturn={canSubmitReturn}
          />
        )}

        {showAccountBenefits && (
          <AccountBenefits variant="returns" />
        )}

        <ReturnPolicyInfo />

        <SupportSection 
          title="Need Help with Your Return?"
          description="Our support team is here to assist you with any questions about returns or refunds."
          whatsappMessage="Hi! I need help with a return request. Can you please assist me?"
          helpCenterLink="/help-center/return-policy-and-conditions"
          helpCenterTitle="Return Policy"
          helpCenterDescription="Full terms & conditions"
        />
      </div>
    </div>
  );
}
