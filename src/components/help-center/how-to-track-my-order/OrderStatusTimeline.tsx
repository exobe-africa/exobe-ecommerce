"use client";

import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';

const defaultStatuses = [
  {
    id: 'confirmed',
    status: 'Order Confirmed',
    description: 'Your order has been received and is being processed',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 'processing',
    status: 'Processing',
    description: 'We\'re preparing your items for shipment',
    icon: Package,
    color: 'text-blue-500'
  },
  {
    id: 'shipped',
    status: 'Shipped',
    description: 'Your order has been dispatched and is on its way',
    icon: Truck,
    color: 'text-orange-500'
  },
  {
    id: 'out-for-delivery',
    status: 'Out for Delivery',
    description: 'Your package is out for delivery and will arrive today',
    icon: MapPin,
    color: 'text-purple-500'
  },
  {
    id: 'delivered',
    status: 'Delivered',
    description: 'Your order has been successfully delivered',
    icon: CheckCircle,
    color: 'text-green-500'
  }
];

interface OrderStatus {
  id: string;
  status: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface OrderStatusTimelineProps {
  title?: string;
  statuses?: OrderStatus[];
}

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  title = "Order Status Timeline",
  statuses = defaultStatuses
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      <div className="space-y-6">
        {statuses.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={step.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${step.color}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#000000] mb-1">{step.status}</h3>
                <p className="text-[#4A4A4A]">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
