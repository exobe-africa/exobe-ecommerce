import { Order } from './types';

// Mock order data - in real app this would come from API
export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'delivered',
    total: 2499.00,
    items: [
      { id: 1, name: 'iPhone 15 Pro', imageUrl: '/images/iphone15pro.jpg', price: 12999.00, quantity: 1, variant: '128GB, Natural Titanium' },
      { id: 2, name: 'AirPods Pro', imageUrl: '/images/airpodspro.jpg', price: 3999.00, quantity: 1 },
    ],
    trackingNumber: 'EX123456789ZA',
    shippingAddress: { name: 'John Doe', street: '123 Main Street', city: 'Johannesburg', province: 'Gauteng', postalCode: '2001' },
    paymentMethod: 'Credit Card ending in 4567',
    subtotal: 2299.00,
    shipping: 150.00,
    tax: 50.00,
    estimatedDelivery: '2024-03-18'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-10',
    status: 'shipped',
    total: 1299.00,
    items: [
      { id: 4, name: 'Nike Air Max 270', imageUrl: '/images/nikeairmax.jpg', price: 1299.00, quantity: 1, variant: 'Size 9, Black/White' }
    ],
    trackingNumber: 'EX987654321ZA',
    shippingAddress: { name: 'Jane Smith', street: '456 Business Ave', city: 'Sandton', province: 'Gauteng', postalCode: '2146' },
    paymentMethod: 'Credit Card ending in 1234',
    subtotal: 1199.00,
    shipping: 100.00,
    tax: 0.00,
    estimatedDelivery: '2024-03-13'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-05',
    status: 'processing',
    total: 899.00,
    items: [
      { id: 5, name: 'Cotton T-Shirt', imageUrl: '/images/tshirt.jpg', price: 299.00, quantity: 2, variant: 'Large, Navy Blue' },
    ],
    trackingNumber: null,
    shippingAddress: { name: 'Mike Johnson', street: '789 Oak Street', city: 'Cape Town', province: 'Western Cape', postalCode: '8001' },
    paymentMethod: 'Credit Card ending in 9876',
    subtotal: 799.00,
    shipping: 100.00,
    tax: 0.00,
    estimatedDelivery: '2024-03-08'
  }
];
