"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderSuccessSection from '../../components/pages/checkout/OrderSuccessSection';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const orderNum = searchParams.get('orderNumber');
    
    if (!orderNum) {
      // If no order number, redirect to home
      router.push('/');
      return;
    }
    
    setOrderNumber(orderNum);
  }, [searchParams, router]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8102E]"></div>
      </div>
    );
  }

  return <OrderSuccessSection orderNumber={orderNumber} />;
}

