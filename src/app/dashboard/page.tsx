"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '../../context/UserContext';
import { 
  AddressModal, 
  OrderDetailsModal, 
  ReviewModal, 
  DeleteConfirmationModal, 
  LeaveReviewModal, 
  TrackPackageModal, 
  ReturnItemModal,
  DashboardHeader,
  DashboardSidebar,
  DeleteAccountModal,
  OverviewTab,
  OrdersTab,
  AddressesTab,
  ReviewsTab,
  NotificationsTab,
  SettingsTab,
  ReturnsTab,
  Address,
  Review,
  Order,
  User,
  DeleteTarget
} from '../../components/pages/dashboard';

export default function CustomerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
  const [showTrackPackageModal, setShowTrackPackageModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  
  // Selected items
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [returnOrder, setReturnOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // Data states
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

  // Mock user data
  const user: User = {
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
  const orders: Order[] = [
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
      setAddresses(addresses.map(addr => 
        addr.id === selectedAddress.id ? { ...addressData, id: selectedAddress.id } : addr
      ));
    } else {
      const newAddress = { ...addressData, id: Date.now() };
      setAddresses([...addresses, newAddress]);
    }
    setSelectedAddress(null);
  };

  const handleOrderView = (order: Order) => {
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

  const handleLeaveReview = (order: Order) => {
    setSelectedOrder(order);
    setShowLeaveReviewModal(true);
  };

  const handleSubmitReviews = (newReviews: { itemId: number; rating: number; comment: string }[]) => {
    const orderItemsMap = selectedOrder?.items.reduce((acc: any, item: any) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const reviewsToAdd = newReviews.map(review => ({
      id: Date.now() + Math.random(),
      productName: orderItemsMap[review.itemId]?.name || 'Unknown Product',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    }));

    setReviews(prev => [...prev, ...reviewsToAdd]);
    setSelectedOrder(null);
  };

  const handleTrackPackage = (order: Order) => {
    setSelectedOrder(order);
    setShowTrackPackageModal(true);
  };

  const handleReturnRequest = (order: Order) => {
    setReturnOrder(order);
    setShowReturnModal(true);
  };

  const handlePhoneChange = (value: string) => {
    console.log('Phone changed:', value);
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'orders', 'returns', 'addresses', 'reviews', 'notifications', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            user={user}
            orders={orders}
            onOrderView={handleOrderView}
            onTabChange={handleTabChange}
          />
        );
      case 'orders':
        return (
          <OrdersTab
            orders={orders}
            onOrderView={handleOrderView}
            onLeaveReview={handleLeaveReview}
            onTrackPackage={handleTrackPackage}
            onReturnRequest={handleReturnRequest}
          />
        );
      case 'addresses':
        return (
          <AddressesTab
            addresses={addresses}
            onAddressEdit={handleAddressEdit}
            onAddressDelete={handleAddressDelete}
            onAddNewAddress={() => {
              setSelectedAddress(null);
              setShowAddressModal(true);
            }}
          />
        );
      case 'reviews':
        return (
          <ReviewsTab
            reviews={reviews}
            onReviewEdit={handleReviewEdit}
            onReviewDelete={handleReviewDelete}
          />
        );
      case 'returns':
        return <ReturnsTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'settings':
        return (
          <SettingsTab
            user={user}
            onPhoneChange={handlePhoneChange}
            onDeleteAccount={() => setShowDeleteModal(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar
            user={user}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <div className="lg:w-3/4">
            {renderActiveTab()}
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          console.log('Account deleted');
          setShowDeleteModal(false);
        }}
      />

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setSelectedAddress(null);
        }}
        address={selectedAddress || undefined}
        onSave={handleAddressSave}
      />

      <OrderDetailsModal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onLeaveReview={handleLeaveReview}
        onTrackPackage={handleTrackPackage}
      />

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedReview(null);
        }}
        review={selectedReview}
        onSave={handleReviewSave}
      />

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

      <TrackPackageModal
        isOpen={showTrackPackageModal}
        onClose={() => {
          setShowTrackPackageModal(false);
          setSelectedOrder(null);
        }}
        trackingNumber={selectedOrder?.trackingNumber || ''}
        orderId={selectedOrder?.id || ''}
        orderDate={selectedOrder?.date || ''}
      />

      <ReturnItemModal
        isOpen={showReturnModal}
        onClose={() => {
          setShowReturnModal(false);
          setReturnOrder(null);
        }}
        order={returnOrder}
        onSubmit={(returnData) => {
          console.log('Return request submitted:', returnData);
          setShowReturnModal(false);
          setReturnOrder(null);
        }}
      />
    </div>
  );
}
