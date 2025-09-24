"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar, Footer } from '../../../components';
import {
  SuccessOrderHeader,
  OrderDetailsCard,
  DeliveryInformation,
  NextStepsCard,
  HelpSupportSidebar,
  QuickActionsSidebar,
  RatingExperienceCard,
  EmailConfirmationNotice
} from '../../../components/order/success';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    // Generate order number or get from URL params
    const orderNum = searchParams.get('order') || `EXO${Date.now().toString().slice(-6)}`;
    const email = searchParams.get('email') || 'customer@example.com';
    const total = parseFloat(searchParams.get('total') || '0');
    
    setOrderNumber(orderNum);
    setCustomerEmail(email);
    setOrderTotal(total);
  }, [searchParams]);

  const handleShare = async () => {
    const shareData = {
      title: 'Order Confirmed - eXobe',
      text: `My order ${orderNumber} has been confirmed on eXobe!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Could show a toast here
      }
    } catch (err) {
      console.log('Sharing failed');
    }
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SuccessOrderHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <OrderDetailsCard 
              orderNumber={orderNumber}
              orderTotal={orderTotal}
              onShare={handleShare}
            />
            
            <DeliveryInformation estimatedDelivery={estimatedDelivery} />
            
            <NextStepsCard />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <HelpSupportSidebar />
            <QuickActionsSidebar />
            <RatingExperienceCard />
          </div>
        </div>

        <div className="mt-12">
          <EmailConfirmationNotice customerEmail={customerEmail} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
