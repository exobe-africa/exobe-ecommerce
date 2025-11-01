"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SuccessOrderHeader,
  OrderDetailsCard,
  DeliveryInformation,
  NextStepsCard,
  HelpSupportSidebar,
  QuickActionsSidebar,
  RatingExperienceCard,
  EmailConfirmationNotice
} from '../../../components/pages/order/success';

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const orderNum =
          searchParams.get('orderNumber') ||
          searchParams.get('order') ||
          '';
        const emailParam = searchParams.get('email') || '';
        setOrderNumber(orderNum);

        if (orderNum) {
          const apiUrlRaw = process.env.NEXT_PUBLIC_API_URL || '';
          const graphqlUrl = /\/graphql\/?$/i.test(apiUrlRaw)
            ? apiUrlRaw.replace(/\/$/, '')
            : `${apiUrlRaw.replace(/\/$/, '')}/graphql`;

          const query = `query TrackOrder($orderNumber: String!, $email: String) {\n            trackOrder(orderNumber: $orderNumber, email: $email) {\n              order_number\n              email\n              total_cents\n              payment_status\n            }\n          }`;

          const res = await fetch(graphqlUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              query,
              variables: { orderNumber: orderNum, email: emailParam || null },
            }),
          });

          if (res.ok) {
            const body = await res.json();
            const data = body?.data?.trackOrder;
            if (data) {
              setOrderNumber(data.order_number || orderNum);
              setCustomerEmail(data.email || emailParam);
              setOrderTotal((data.total_cents || 0) / 100);
              setPaymentStatus(data.payment_status);
              setIsLoading(false);
              return;
            }
          }

          // fallback to query params if fetch fails
          const totalFromParams = parseFloat(searchParams.get('total') || '0');
          setCustomerEmail(emailParam || '');
          setOrderTotal(totalFromParams);
        }
      } catch (_) {
        const totalFromParams = parseFloat(searchParams.get('total') || '0');
        setCustomerEmail(searchParams.get('email') || '');
        setOrderTotal(totalFromParams);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [searchParams]);

  // Poll until payment is marked PAID (to ensure DB updates completed)
  useEffect(() => {
    if (!orderNumber) return;
    if (paymentStatus === 'PAID') return;

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const apiUrlRaw = process.env.NEXT_PUBLIC_API_URL || '';
        const graphqlUrl = /\/graphql\/?$/i.test(apiUrlRaw)
          ? apiUrlRaw.replace(/\/$/, '')
          : `${apiUrlRaw.replace(/\/$/, '')}/graphql`;
        const query = `query TrackOrder($orderNumber: String!) {\n          trackOrder(orderNumber: $orderNumber, email: null) {\n            payment_status\n            total_cents\n            email\n          }\n        }`;
        const res = await fetch(graphqlUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ query, variables: { orderNumber } }),
        });
        if (!cancelled && res.ok) {
          const body = await res.json();
          const data = body?.data?.trackOrder;
          if (data) {
            setPaymentStatus(data.payment_status);
            if (typeof data.total_cents === 'number') {
              setOrderTotal(data.total_cents / 100);
            }
            if (typeof data.email === 'string') {
              setCustomerEmail(data.email);
            }
          }
        }
      } catch (_) {
        // ignore
      } finally {
        if (!cancelled && paymentStatus !== 'PAID' && attempts < 30) {
          setTimeout(poll, 1000);
        }
      }
    };

    const timer = setTimeout(poll, 1000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [orderNumber, paymentStatus]);

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
      }
    } catch (err) {
      // no-op
    }
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SuccessOrderHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <OrderDetailsCard 
              orderNumber={orderNumber}
              orderTotal={orderTotal}
              onShare={handleShare}
            />
            
            {!isLoading && <DeliveryInformation estimatedDelivery={estimatedDelivery} />}
            
            <NextStepsCard />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <HelpSupportSidebar />
            <QuickActionsSidebar />
            <RatingExperienceCard />
          </div>
        </div>

        <div className="mt-12">
          {!isLoading && <EmailConfirmationNotice customerEmail={customerEmail} />}
        </div>
      </div>
    </div>
  );
}


