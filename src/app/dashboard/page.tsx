"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Bell, 
  Star, 
  Settings, 
  LogOut,
  Edit3,
  Trash2,
  Eye,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { AddressModal, OrderDetailsModal, ReviewModal, DeleteConfirmationModal, LeaveReviewModal } from '../../components/pages/dashboard';

interface Address {
  id: number;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface DeleteTarget {
  type: string;
  item: any;
  title: string;
  message: string;
  itemName: string;
}

export default function CustomerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'home',
      name: 'Home Address',
      street: '123 Main Street',
      city: 'Johannesburg',
      province: 'Gauteng',
      postalCode: '2001',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Work Address',
      street: '456 Business Ave',
      city: 'Sandton',
      province: 'Gauteng',
      postalCode: '2146',
      isDefault: false
    }
  ]);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+27 11 123 4567',
    joinDate: '2024-01-15',
    avatar: null,
    totalOrders: 12,
    totalSpent: 15750.00,
    loyaltyPoints: 1575
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-03-15',
      status: 'delivered',
      total: 2499.00,
      items: [
        { id: 1, name: 'iPhone 15 Pro', image: '📱', price: 12999.00, quantity: 1, variant: '128GB, Natural Titanium' },
        { id: 2, name: 'AirPods Pro', image: '🎧', price: 3999.00, quantity: 1 },
        { id: 3, name: 'iPhone Case', image: '📱', price: 499.00, quantity: 1, variant: 'Clear' }
      ],
      trackingNumber: 'TRK123456789',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'Johannesburg',
        province: 'Gauteng',
        postalCode: '2001'
      },
      paymentMethod: 'Credit Card ending in 4567',
      subtotal: 2299.00,
      shipping: 150.00,
      tax: 50.00
    },
    {
      id: 'ORD-2024-002',
      date: '2024-03-10',
      status: 'shipped',
      total: 1299.00,
      items: [
        { id: 4, name: 'Nike Air Max 270', image: '👟', price: 1299.00, quantity: 1, variant: 'Size 9, Black/White' }
      ],
      trackingNumber: 'TRK987654321',
      shippingAddress: {
        name: 'John Doe',
        street: '456 Business Ave',
        city: 'Sandton',
        province: 'Gauteng',
        postalCode: '2146'
      },
      paymentMethod: 'Credit Card ending in 4567',
      subtotal: 1199.00,
      shipping: 100.00,
      tax: 0.00
    },
    {
      id: 'ORD-2024-003',
      date: '2024-03-05',
      status: 'processing',
      total: 899.00,
      items: [
        { id: 5, name: 'Cotton T-Shirt', image: '👕', price: 299.00, quantity: 2, variant: 'Large, Navy Blue' },
        { id: 6, name: 'Jeans', image: '👖', price: 599.00, quantity: 1, variant: '32W x 32L, Dark Blue' }
      ],
      trackingNumber: null,
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'Johannesburg',
        province: 'Gauteng',
        postalCode: '2001'
      },
      paymentMethod: 'Credit Card ending in 4567',
      subtotal: 799.00,
      shipping: 100.00,
      tax: 0.00
    }
  ];

  // Handler functions
  const handleAddressEdit = (address: Address) => {
    setSelectedAddress(address);
    setShowAddressModal(true);
  };

  const handleAddressDelete = (address: Address) => {
    setDeleteTarget({
      type: 'address',
      item: address,
      title: 'Delete Address',
      message: 'Are you sure you want to delete this address? This action cannot be undone.',
      itemName: address.name
    });
    setShowDeleteConfirmModal(true);
  };

  const handleAddressSave = (addressData: Omit<Address, 'id'>) => {
    if (selectedAddress) {
      // Edit existing address
      setAddresses(addresses.map(addr => 
        addr.id === selectedAddress.id ? { ...addressData, id: selectedAddress.id } : addr
      ));
    } else {
      // Add new address
      const newAddress = { ...addressData, id: Date.now() };
      setAddresses([...addresses, newAddress]);
    }
    setSelectedAddress(null);
  };

  const handleOrderView = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleReviewEdit = (review: Review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const handleReviewDelete = (review: Review) => {
    setDeleteTarget({
      type: 'review',
      item: review,
      title: 'Delete Review',
      message: 'Are you sure you want to delete this review? This action cannot be undone.',
      itemName: `Review for ${review.productName}`
    });
    setShowDeleteConfirmModal(true);
  };

  const handleReviewSave = (reviewData: { rating: number; comment: string }) => {
    if (selectedReview) {
      setReviews(reviews.map(review => 
        review.id === selectedReview.id 
          ? { ...review, ...reviewData, date: new Date().toISOString().split('T')[0] }
          : review
      ));
    }
    setSelectedReview(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget?.type === 'review') {
      setReviews(reviews.filter(review => review.id !== deleteTarget.item.id));
    } else if (deleteTarget?.type === 'address') {
      setAddresses(addresses.filter(addr => addr.id !== deleteTarget.item.id));
    }
    setDeleteTarget(null);
  };

  // Handle URL query parameters for tab navigation
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'orders', 'addresses', 'reviews', 'notifications', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  };

  const handleLeaveReview = (order: any) => {
    setSelectedOrder(order);
    setShowLeaveReviewModal(true);
  };

  const handleSubmitReviews = (newReviews: { itemId: number; rating: number; comment: string }[]) => {
    // Convert order items to product reviews and add to reviews list
    const orderItemsMap = selectedOrder?.items.reduce((acc: any, item: any) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const reviewsToAdd = newReviews.map(review => ({
      id: Date.now() + Math.random(), // Generate unique ID
      productName: orderItemsMap[review.itemId]?.name || 'Unknown Product',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    }));

    setReviews(prev => [...prev, ...reviewsToAdd]);
    setSelectedOrder(null);
  };

  // Mock reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      productName: 'iPhone 15 Pro',
      rating: 5,
      comment: 'Excellent product, fast delivery!',
      date: '2024-03-10',
      helpful: 12
    },
    {
      id: 2,
      productName: 'Nike Air Max 270',
      rating: 4,
      comment: 'Great shoes, very comfortable.',
      date: '2024-03-05',
      helpful: 8
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Account Overview', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#000000]">My Account</h1>
              <p className="text-[#4A4A4A] mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-[#4A4A4A]">
                <span>Member since</span>
                <span className="font-medium text-[#C8102E]">
                  {new Date(user.joinDate).toLocaleDateString('en-ZA', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
              <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000000]">{user.name}</h3>
                    <p className="text-sm text-[#4A4A4A]">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-[#F6E2E0] text-[#C8102E] font-medium'
                          : 'text-[#4A4A4A] hover:bg-gray-50 hover:text-[#000000]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-200">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#000000]">{user.totalOrders}</p>
                        <p className="text-sm text-[#4A4A4A]">Total Orders</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#000000]">R{user.totalSpent.toFixed(2)}</p>
                        <p className="text-sm text-[#4A4A4A]">Total Spent</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#F6E2E0] rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-[#C8102E]" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#000000]">{user.loyaltyPoints}</p>
                        <p className="text-sm text-[#4A4A4A]">Loyalty Points</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-[#000000]">Recent Orders</h2>
                      <button 
                        onClick={() => handleTabChange('orders')}
                        className="text-[#C8102E] hover:text-[#A00E26] font-medium flex items-center space-x-1"
                      >
                        <span>View All</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                            <div>
                              <p className="font-medium text-[#000000]">{order.id}</p>
                              <p className="text-sm text-[#4A4A4A]">{order.items.length} items • {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#000000]">R{order.total.toFixed(2)}</p>
                            <button 
                              onClick={() => handleOrderView(order)}
                              className="text-sm text-[#C8102E] hover:text-[#A00E26] flex items-center space-x-1"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-[#000000] mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button 
                      onClick={() => handleTabChange('orders')}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
                    >
                      <Package className="h-8 w-8 text-[#C8102E] mb-2" />
                      <span className="text-sm font-medium text-[#000000]">Track Orders</span>
                    </button>
                    <button 
                      onClick={() => handleTabChange('addresses')}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
                    >
                      <MapPin className="h-8 w-8 text-[#C8102E] mb-2" />
                      <span className="text-sm font-medium text-[#000000]">Manage Addresses</span>
                    </button>
                    <button 
                      onClick={() => handleTabChange('reviews')}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
                    >
                      <Star className="h-8 w-8 text-[#C8102E] mb-2" />
                      <span className="text-sm font-medium text-[#000000]">My Reviews</span>
                    </button>
                    <button 
                      onClick={() => handleTabChange('settings')}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
                    >
                      <Settings className="h-8 w-8 text-[#C8102E] mb-2" />
                      <span className="text-sm font-medium text-[#000000]">Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-[#000000]">Order History</h2>
                  <p className="text-[#4A4A4A] mt-1">Track and manage your orders</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-[#000000]">{order.id}</p>
                              <p className="text-sm text-[#4A4A4A]">Placed on {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#000000]">R{order.total.toFixed(2)}</p>
                            <p className="text-sm text-[#4A4A4A]">{order.items.length} items</p>
                          </div>
                        </div>
                        
                        {order.trackingNumber && (
                          <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Truck className="h-5 w-5 text-blue-600" />
                              <span className="font-medium text-blue-900">Tracking Number:</span>
                              <span className="font-mono text-blue-700">{order.trackingNumber}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => handleOrderView(order)}
                            className="flex-1 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                          >
                            View Details
                          </button>
                          {order.status === 'delivered' && (
                            <button 
                              onClick={() => handleLeaveReview(order)}
                              className="flex-1 border border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-xl font-medium hover:bg-[#F6E2E0] transition-colors"
                            >
                              Leave Review
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button className="flex-1 border border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                              Track Package
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-[#000000]">My Addresses</h2>
                      <p className="text-[#4A4A4A] mt-1">Manage your delivery addresses</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedAddress(null);
                        setShowAddressModal(true);
                      }}
                      className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                    >
                      Add New Address
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-xl p-6 relative">
                        {address.isDefault && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-medium">
                              Default
                            </span>
                          </div>
                        )}
                        <div className="mb-4">
                          <h3 className="font-semibold text-[#000000] mb-2">{address.name}</h3>
                          <div className="text-[#4A4A4A] space-y-1">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.province}</p>
                            <p>{address.postalCode}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleAddressEdit(address)}
                            className="flex items-center space-x-2 text-[#C8102E] hover:text-[#A00E26] font-medium"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handleAddressDelete(address)}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-[#000000]">My Reviews</h2>
                  <p className="text-[#4A4A4A] mt-1">Manage your product reviews and ratings</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-[#000000] mb-2">{review.productName}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-[#4A4A4A]">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-[#4A4A4A]">{review.comment}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleReviewEdit(review)}
                              className="text-[#C8102E] hover:text-[#A00E26] p-2 rounded-lg hover:bg-[#F6E2E0] transition-colors"
                              title="Edit review"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleReviewDelete(review)}
                              className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete review"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                          <span>{review.helpful} people found this helpful</span>
                          <button className="text-[#C8102E] hover:text-[#A00E26] font-medium">
                            View Product
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-[#000000]">Notification Preferences</h2>
                  <p className="text-[#4A4A4A] mt-1">Customize how we communicate with you to enhance your shopping experience</p>
                </div>
                <div className="p-6">
                  <div className="space-y-8">
                    {/* Order Updates */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000] mb-4">Order Updates</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Order confirmations</p>
                            <p className="text-sm text-[#4A4A4A]">Get notified when your order is confirmed</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Shipping updates</p>
                            <p className="text-sm text-[#4A4A4A]">Track your package from dispatch to delivery</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Delivery notifications</p>
                            <p className="text-sm text-[#4A4A4A]">Know exactly when your order arrives</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Communications */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000] mb-2">Personalized Shopping Experience</h3>
                      <p className="text-sm text-[#4A4A4A] mb-4">Help us improve your shopping experience with relevant updates and recommendations</p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Product recommendations</p>
                            <p className="text-sm text-[#4A4A4A]">Discover products tailored to your interests and purchase history</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Exclusive deals & early access</p>
                            <p className="text-sm text-[#4A4A4A]">Be the first to know about special offers and new arrivals</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Wishlist updates</p>
                            <p className="text-sm text-[#4A4A4A]">Get notified when wishlist items go on sale or are back in stock</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Shopping insights</p>
                            <p className="text-sm text-[#4A4A4A]">Monthly summaries of your shopping activity and savings</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Account Security */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000] mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Login alerts</p>
                            <p className="text-sm text-[#4A4A4A]">Get notified of new device logins for security</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#000000]">Password changes</p>
                            <p className="text-sm text-[#4A4A4A]">Confirmation when your password is updated</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8102E]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <button className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-[#000000]">Profile Settings</h2>
                    <p className="text-[#4A4A4A] mt-1">Update your personal information</p>
                  </div>
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#000000] mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#000000] mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                        >
                          Update Profile
                        </button>
                        <button
                          type="button"
                          className="border border-gray-300 text-[#4A4A4A] px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Password Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-[#000000]">Change Password</h2>
                    <p className="text-[#4A4A4A] mt-1">Update your account password</p>
                  </div>
                  <div className="p-6">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-200">
                  <div className="p-6 border-b border-red-200">
                    <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
                    <p className="text-red-500 mt-1">Irreversible and destructive actions</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-[#000000]">Delete Account</h3>
                        <p className="text-sm text-[#4A4A4A] mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#000000]">Delete Account</h3>
                  <p className="text-sm text-[#4A4A4A]">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-[#4A4A4A] mb-6">
                Are you sure you want to delete your account? All your data, including order history, 
                reviews, and saved addresses will be permanently removed.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setSelectedAddress(null);
        }}
        address={selectedAddress || undefined}
        onSave={handleAddressSave}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onLeaveReview={handleLeaveReview}
      />

      {/* Review Edit Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedReview(null);
        }}
        review={selectedReview}
        onSave={handleReviewSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmModal}
        onClose={() => {
          setShowDeleteConfirmModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={deleteTarget?.title || ''}
        message={deleteTarget?.message || ''}
        itemName={deleteTarget?.itemName}
      />

      {/* Leave Review Modal */}
      <LeaveReviewModal
        isOpen={showLeaveReviewModal}
        onClose={() => {
          setShowLeaveReviewModal(false);
          setSelectedOrder(null);
        }}
        orderItems={selectedOrder?.items || []}
        orderId={selectedOrder?.id || ''}
        onSubmit={handleSubmitReviews}
      />
    </div>
  );
}
