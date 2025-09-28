export interface OrderItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  variant?: string;
  canReturn: boolean;
  returnReason?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
  trackingNumber: string | null;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  deliveredDate?: string;
  returnEligible: boolean;
  returnDeadline?: string;
}

export interface SelectedItem {
  selected: boolean;
  reason: string;
  description: string;
}
