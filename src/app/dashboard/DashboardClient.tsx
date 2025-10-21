"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '../../store/auth';
import { useAddressesStore } from '../../store/addresses';
import { useUserProfileStore } from '../../store/userProfile';
import { useOrdersStore } from '../../store/orders';
import { useToast } from '../../context/ToastContext';
import { getUserFriendlyErrorMessage } from '../../lib/utils/errorMessages';
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

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const { showError, showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    addresses,
    selectedAddress,
    isCreating: isSavingAddress,
    isLoading: isAddressesLoading,
    isDeleting: isDeletingAddress,
    setSelectedAddress,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress
  } = useAddressesStore();

  const {
    profile: userProfile,
    isLoading: isProfileLoading,
    fetchProfile
  } = useUserProfileStore();

  const {
    orders,
    isLoading: isOrdersLoading,
    fetchOrders,
    // @ts-ignore expose cooldown to drive retry logic
    cooldownUntil,
  } = useOrdersStore();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
  const [showTrackPackageModal, setShowTrackPackageModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  
  const [returnOrder, setReturnOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

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

  const user: User = useMemo(() => {
    if (!userProfile) {
      return {
        name: '',
        email: '',
        phone: '',
        joinDate: 'Unknown',
        avatar: null,
        totalOrders: 0,
        totalSpent: 0,
        loyaltyPoints: 0,
      };
    }
    
    return {
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone || '',
      joinDate: userProfile.joinDate,
      avatar: userProfile.avatar || null,
      totalOrders: userProfile.totalOrders,
      totalSpent: userProfile.totalSpent,
      loyaltyPoints: userProfile.loyaltyPoints,
    };
  }, [userProfile]);

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

  // Ensure we trigger an orders fetch once after auth hydration
  const hasFetchedOrdersOnce = useRef(false);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      fetchProfile();
      if (!hasFetchedOrdersOnce.current) {
        fetchOrders();
        hasFetchedOrdersOnce.current = true;
      }
    }
  }, [hasHydrated, isAuthenticated, fetchProfile, fetchOrders]);

  useEffect(() => {
    if (userProfile?.id) {
      fetchAddresses(userProfile.id);
    }
  }, [userProfile?.id, fetchAddresses]);

  const handleAddressSave = async (addressData: Omit<Address, 'id'>) => {
    try {
      let result;
      if (selectedAddress) {
        result = await updateAddress(selectedAddress.id, addressData as any);
        if (result.success) {
          showSuccess('Address updated successfully');
        } else {
          showError(result.error || 'Failed to update address');
          return;
        }
      } else {
        result = await createAddress(addressData as any);
        if (result.success) {
          if (userProfile?.id) await fetchAddresses(userProfile.id);
          showSuccess('Address added successfully');
        } else {
          showError(result.error || 'Failed to create address');
          return;
        }
      }
      setShowAddressModal(false);
      setSelectedAddress(null);
    } catch (err: any) {
      const firstGql = (err?.graphQLErrors && err.graphQLErrors[0]) || undefined;
      const serverMsg = (firstGql?.extensions?.response?.message as any) || firstGql?.message;
      const messageText = Array.isArray(serverMsg) ? serverMsg.join(', ') : (serverMsg || err?.message);
      const friendlyMessage = getUserFriendlyErrorMessage(messageText || 'Failed to save address');
      console.error('Address save failed:', { err, messageText });
      showError(friendlyMessage);
    }
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

  const handleDeleteConfirm = async () => {
    if (deleteTarget?.type === 'review') {
      setReviews(reviews.filter(review => review.id !== deleteTarget.item.id));
      showSuccess('Review deleted successfully');
    } else if (deleteTarget?.type === 'address') {
      const result = await deleteAddress(deleteTarget.item.id);
      if (result.success) {
        showSuccess('Address deleted successfully');
      } else {
        showError(result.error || 'Failed to delete address');
        return;
      }
    }
    setDeleteTarget(null);
    setShowDeleteConfirmModal(false);
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

  // Automatically retry after store cooldown expires (e.g., after a 429 rate limit)
  useEffect(() => {
    if (activeTab !== 'orders') return;
    if (!cooldownUntil) return;
    const now = Date.now();
    if (now >= cooldownUntil) {
      fetchOrders(true);
      return;
    }
    const timeoutMs = Math.max(0, cooldownUntil - now) + 100;
    const t = setTimeout(() => fetchOrders(true), timeoutMs);
    return () => clearTimeout(t);
  }, [activeTab, cooldownUntil, fetchOrders]);

  // When Orders tab becomes active, ensure data is fetched if empty/not loading
  useEffect(() => {
    if (activeTab === 'orders' && hasHydrated && isAuthenticated && !isOrdersLoading && orders.length === 0) {
      fetchOrders();
    }
  }, [activeTab, hasHydrated, isAuthenticated, isOrdersLoading, orders.length, fetchOrders]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.replace('/auth/login?returnUrl=/dashboard');
    }
  }, [hasHydrated, isAuthenticated, router]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`/dashboard?${params.toString()}`, { scroll: false });

    // If user navigates to Orders tab and we have no orders yet, ensure a fetch kicks off
    if (tabId === 'orders' && !isOrdersLoading && orders.length === 0) {
      fetchOrders();
    }
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
            isLoading={isOrdersLoading}
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
            isLoading={isAddressesLoading}
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
      <DashboardHeader user={user} isLoading={isProfileLoading} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar
            user={user}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isLoading={isProfileLoading}
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
        isLoading={isSavingAddress}
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
        isLoading={isDeletingAddress}
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


