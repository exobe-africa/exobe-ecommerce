"use client";

import { useState } from 'react';
import {
  TrackOrderHero,
  OrderSearchForm,
  OrderResults,
  AccountBenefits,
  TrackingInstructions,
  SupportSection,
  Order,
  mockOrders
} from '@/components/pages/track-order';

export default function TrackOrderPage() {
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [showAccountBenefits, setShowAccountBenefits] = useState(false);

  const handleOrderFound = (order: Order) => {
    setFoundOrder(order);
    setShowAccountBenefits(true);
  };

  const handleError = (error: string) => {
    setFoundOrder(null);
    setShowAccountBenefits(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrackOrderHero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OrderSearchForm 
          onOrderFound={handleOrderFound}
          onError={handleError}
          mockOrders={mockOrders}
        />

        {foundOrder && <OrderResults order={foundOrder} />}

        {showAccountBenefits && <AccountBenefits />}

        <TrackingInstructions />

        <SupportSection 
          whatsappMessage="Hi! I need help tracking my order. Can you please assist me?"
        />
      </div>
    </div>
  );
}
