import { Order } from './types';

// Mock order data - in real app this would come from API
export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'delivered',
    total: 2499.00,
    items: [
      { id: 1, name: 'iPhone 15 Pro', imageUrl: '/images/iphone15pro.jpg', price: 12999.00, quantity: 1, variant: '128GB, Natural Titanium', canReturn: true },
      { id: 2, name: 'AirPods Pro', imageUrl: '/images/airpodspro.jpg', price: 3999.00, quantity: 1, canReturn: true },
    ],
    trackingNumber: 'EX123456789ZA',
    shippingAddress: { name: 'John Doe', street: '123 Main Street', city: 'Johannesburg', province: 'Gauteng', postalCode: '2001' },
    paymentMethod: 'Credit Card ending in 4567',
    subtotal: 2299.00,
    shipping: 150.00,
    tax: 50.00,
    deliveredDate: '2024-03-18',
    returnEligible: true,
    returnDeadline: '2024-04-17'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-10',
    status: 'delivered',
    total: 1299.00,
    items: [
      { id: 4, name: 'Nike Air Max 270', imageUrl: '/images/nikeairmax.jpg', price: 1299.00, quantity: 1, variant: 'Size 9, Black/White', canReturn: false, returnReason: 'Return period expired' }
    ],
    trackingNumber: 'EX987654321ZA',
    shippingAddress: { name: 'Jane Smith', street: '456 Business Ave', city: 'Sandton', province: 'Gauteng', postalCode: '2146' },
    paymentMethod: 'Credit Card ending in 1234',
    subtotal: 1199.00,
    shipping: 100.00,
    tax: 0.00,
    deliveredDate: '2024-02-13',
    returnEligible: false,
    returnDeadline: '2024-03-15'
  }
];

export const returnReasons = [
  'Defective/Damaged item',
  'Wrong item received',
  'Item not as described',
  'Changed my mind',
  'Size/fit issues',
  'Quality concerns',
  'Other'
];
