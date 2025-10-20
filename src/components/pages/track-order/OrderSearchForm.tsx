"use client";

import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Order } from './types';
import { getApolloClient } from '@/lib/apollo/client';
import { TRACK_ORDER } from '@/lib/api/orders';

interface OrderSearchFormProps {
  onOrderFound: (order: Order) => void;
  onError: (error: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function OrderSearchForm({ onOrderFound, onError, onLoadingChange }: OrderSearchFormProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    onLoadingChange?.(true);
    setError('');

    try {
      const client = getApolloClient();
      const { data } = await client.query({
        query: TRACK_ORDER,
        variables: { orderNumber, email },
        fetchPolicy: 'network-only'
      });
      const o = (data as any)?.trackOrder;
      if (!o) throw new Error('Order not found. Please check your order number and email address.');
      const order: Order = {
        id: o.order_number || o.id,
        date: o.created_at ? new Date(o.created_at).toISOString() : new Date().toISOString(),
        status: (o.status || 'processing').toLowerCase(),
        total: (o.total_cents ?? 0) / 100,
        items: (o.items || []).map((it: any, idx: number) => ({
          id: idx + 1,
          name: it.title,
          imageUrl: it.product?.media?.[0]?.url || '',
          price: (it.price_cents ?? 0) / 100,
          quantity: it.quantity ?? 1,
          variant: it.attributes ? Object.values(it.attributes).join(', ') : undefined,
        })),
        trackingNumber: o.tracking_number ?? null,
        shippingAddress: {
          name: `${o.shipping_address?.first_name ?? ''} ${o.shipping_address?.last_name ?? ''}`.trim() || 'N/A',
          street: o.shipping_address?.address ?? o.shipping_address?.address_line_1 ?? 'N/A',
          city: o.shipping_address?.city ?? 'N/A',
          province: o.shipping_address?.province ?? 'N/A',
          postalCode: o.shipping_address?.postal_code ?? 'N/A',
        },
        paymentMethod: '—',
        subtotal: (o.subtotal_cents ?? 0) / 100,
        shipping: (o.shipping_cents ?? 0) / 100,
        tax: (o.vat_cents ?? 0) / 100,
        estimatedDelivery: undefined,
      };
      onOrderFound(order);
    } catch (err: any) {
      const msg = err?.message || 'Failed to fetch order. Please try again.';
      setError(msg);
      onError(msg);
    } finally {
      setIsSearching(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-[#000000] mb-2">
              Order Number or Tracking Number
            </label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g., ORD-2024-001 or EX123456789ZA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#000000] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-700"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSearching}
          className="w-full bg-[#C8102E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Track Order
            </>
          )}
        </button>
      </form>
    </div>
  );
}
