"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, AlertTriangle, CreditCard } from 'lucide-react';
import { Navbar, Footer } from '../../../components';
import {
  FailedOrderHeader,
  ErrorDetailsCard,
  SecurityNoticeCard,
  ContactSupportSidebar,
  QuickActionsSidebar,
  CartStatusCard,
  AlternativePaymentMethods
} from '../../../components/order/failed';

export default function OrderFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorType, setErrorType] = useState('payment');
  const [orderAttempt, setOrderAttempt] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const error = searchParams.get('error') || 'payment';
    const attempt = searchParams.get('attempt') || `FA${Date.now().toString().slice(-6)}`;
    const retry = parseInt(searchParams.get('retry') || '0');
    
    setErrorType(error);
    setOrderAttempt(attempt);
    setRetryCount(retry);
  }, [searchParams]);

  const getErrorDetails = () => {
    switch (errorType) {
      case 'payment':
        return {
          title: 'Payment Failed',
          subtitle: 'Your payment could not be processed',
          icon: CreditCard,
          color: 'red',
          description: 'There was an issue processing your payment. This could be due to insufficient funds, an expired card, or a temporary issue with your payment provider.'
        };
      case 'network':
        return {
          title: 'Connection Error',
          subtitle: 'Network connection was interrupted',
          icon: AlertTriangle,
          color: 'orange',
          description: 'We lost connection during the checkout process. Your payment was not charged. Please check your internet connection and try again.'
        };
      case 'system':
        return {
          title: 'System Error',
          subtitle: 'A technical error occurred',
          icon: XCircle,
          color: 'red',
          description: 'We encountered a technical issue while processing your order. Our team has been notified and is working to resolve this.'
        };
      default:
        return {
          title: 'Order Failed',
          subtitle: 'Something went wrong',
          icon: XCircle,
          color: 'red',
          description: 'We were unable to complete your order. Please try again or contact our support team for assistance.'
        };
    }
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FailedOrderHeader errorDetails={errorDetails} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ErrorDetailsCard 
              errorDetails={errorDetails}
              errorType={errorType}
              orderAttempt={orderAttempt}
            />
            
            <SecurityNoticeCard />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <ContactSupportSidebar />
            <QuickActionsSidebar />
            <CartStatusCard />
          </div>
        </div>

        <div className="mt-12">
          <AlternativePaymentMethods />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
