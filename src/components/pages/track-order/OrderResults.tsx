"use client";

import { Order } from './types';
import OrderHeader from './OrderHeader';
import OrderProgress from './OrderProgress';
import TrackingInformation from './TrackingInformation';
import OrderItems from './OrderItems';
import OrderSummary from './OrderSummary';

interface OrderResultsProps {
  order: Order;
}

export default function OrderResults({ order }: OrderResultsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
      <OrderHeader order={order} />
      <OrderProgress order={order} />
      <TrackingInformation order={order} />
      <OrderItems order={order} />
      <OrderSummary order={order} />
    </div>
  );
}
