export interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  trackingNumber?: string | null;
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
}

export interface User {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  avatar: string | null;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
}

export interface DeleteTarget {
  type: string;
  item: any;
  title: string;
  message: string;
  itemName: string;
}

export interface DashboardProps {
  user: User;
  orders: Order[];
  addresses: Address[];
  reviews: Review[];
  onAddressEdit: (address: Address) => void;
  onAddressDelete: (address: Address) => void;
  onAddressSave: (addressData: Omit<Address, 'id'>) => void;
  onOrderView: (order: Order) => void;
  onReviewEdit: (review: Review) => void;
  onReviewDelete: (review: Review) => void;
  onReviewSave: (reviewData: { rating: number; comment: string }) => void;
  onLeaveReview: (order: Order) => void;
  onTrackPackage: (order: Order) => void;
  onReturnRequest: (order: Order) => void;
  onSubmitReviews: (newReviews: { itemId: number; rating: number; comment: string }[]) => void;
  onPhoneChange: (value: string) => void;
  onTabChange: (tabId: string) => void;
}
