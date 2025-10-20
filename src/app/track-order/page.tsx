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
  
} from '@/components/pages/track-order';

export default function TrackOrderPage() {
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [showAccountBenefits, setShowAccountBenefits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          onLoadingChange={setIsLoading}
        />

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        )}

        {foundOrder && !isLoading && <OrderResults order={foundOrder} />}

        {showAccountBenefits && <AccountBenefits />}

        <TrackingInstructions />

        <SupportSection 
          whatsappMessage="Hi! I need help tracking my order. Can you please assist me?"
        />
      </div>
    </div>
  );
}
