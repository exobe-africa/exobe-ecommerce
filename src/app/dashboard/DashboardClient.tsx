"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  DASHBOARD_ME,
  DASHBOARD_ADDRESSES,
  DASHBOARD_CREATE_ADDRESS,
  DASHBOARD_UPDATE_ADDRESS,
  DASHBOARD_DELETE_ADDRESS,
  DASHBOARD_MY_ORDERS,
} from '../../lib/api/dashboard';
import { useAuthStore } from '../../store/auth';
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
  const { isAuthenticated } = useAuthStore();
  const { showError, showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isDeletingAddress, setIsDeletingAddress] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
  const [showTrackPackageModal, setShowTrackPackageModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [returnOrder, setReturnOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);

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

  const { data: meData } = useQuery(DASHBOARD_ME, { skip: !isAuthenticated });
  const me = (meData as any)?.me;
  const user: User = useMemo(() => {
    const fullName = me?.name || `${me?.firstName ?? ''} ${me?.lastName ?? ''}`.trim() || (me?.email ?? '');
    return {
      name: fullName,
      email: me?.email ?? '',
      phone: me?.phone ?? '',
      joinDate: new Date().toISOString().slice(0, 10),
      avatar: null,
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
    };
  }, [me]);

  const { data: ordersData } = useQuery(DASHBOARD_MY_ORDERS, { skip: !isAuthenticated });
  const orders: Order[] = useMemo(() => {
    const raw = (ordersData as any)?.myOrders ?? [];
    return raw.map((o: any, idx: number) => ({
      id: o.id,
      date: new Date(o.created_at).toISOString().slice(0, 10),
      status: o.status,
      total: (o.total_cents ?? 0) / 100,
      items: (o.items ?? []).map((it: any, i: number) => ({
        id: i + 1,
        name: it.title,
        image: '🧾',
        price: (it.price_cents ?? 0) / 100,
        quantity: it.quantity,
        variant: undefined,
      })),
      trackingNumber: null,
      shippingAddress: {
        name: user.name,
        street: '',
        city: '',
        province: '',
        postalCode: '',
      },
      paymentMethod: '',
      subtotal: (o.subtotal_cents ?? 0) / 100,
      shipping: (o.shipping_cents ?? 0) / 100,
      tax: (o.vat_cents ?? 0) / 100,
    }));
  }, [ordersData, user.name]);

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

  const [createAddressMutation] = useMutation(DASHBOARD_CREATE_ADDRESS);
  const [updateAddressMutation] = useMutation(DASHBOARD_UPDATE_ADDRESS);
  const [deleteAddressMutation] = useMutation(DASHBOARD_DELETE_ADDRESS);

  const { data: addressesData, refetch: refetchAddresses } = useQuery(
    DASHBOARD_ADDRESSES,
    { variables: { userId: me?.id ?? '' }, skip: !isAuthenticated || !me?.id }
  );

  useEffect(() => {
    const raw = (addressesData as any)?.getUserAddresses ?? [];
    const mapped: Address[] = raw.map((a: any, idx: number) => ({
      id: a.id,
      type: a.type,
      name: a.addressLine2 || a.type,
      street: a.addressLine1,
      city: a.city,
      province: a.province ?? '',
      postalCode: a.postalCode,
      isDefault: idx === 0,
    }));
    setAddresses(mapped);
  }, [addressesData]);

  const handleAddressSave = async (addressData: Omit<Address, 'id'>) => {
    setIsSavingAddress(true);
    try {
      if (selectedAddress) {
        await updateAddressMutation({
          variables: {
            id: String(selectedAddress.id),
            input: {
              type: addressData.type,
              addressLine1: addressData.street,
              addressLine2: addressData.name || undefined,
              city: addressData.city,
              province: addressData.province,
              postalCode: addressData.postalCode,
            },
          },
        });
        showSuccess('Address updated successfully');
      } else {
        await createAddressMutation({
          variables: {
            input: {
              type: addressData.type,
              addressLine1: addressData.street,
              addressLine2: addressData.name || undefined,
              city: addressData.city,
              province: addressData.province,
              country: 'South Africa',
              postalCode: addressData.postalCode,
            },
          },
        });
        showSuccess('Address added successfully');
      }
      await refetchAddresses();
      setShowAddressModal(false);
    } catch (err: any) {
      const firstGql = (err?.graphQLErrors && err.graphQLErrors[0]) || undefined;
      const serverMsg = (firstGql?.extensions?.response?.message as any) || firstGql?.message;
      const messageText = Array.isArray(serverMsg) ? serverMsg.join(', ') : (serverMsg || err?.message);
      const friendlyMessage = getUserFriendlyErrorMessage(messageText || 'Failed to save address');
      console.error('Address save failed:', { err, messageText });
      showError(friendlyMessage);
    } finally {
      setIsSavingAddress(false);
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

  const handleDeleteConfirm = async () => {
    if (deleteTarget?.type === 'review') {
      setReviews(reviews.filter(review => review.id !== deleteTarget.item.id));
      showSuccess('Review deleted successfully');
    } else if (deleteTarget?.type === 'address') {
      setIsDeletingAddress(true);
      try {
        await deleteAddressMutation({ variables: { id: String(deleteTarget.item.id) } });
        await refetchAddresses();
        showSuccess('Address deleted successfully');
      } catch (err: any) {
        const friendlyMessage = getUserFriendlyErrorMessage(err?.message || 'Failed to delete address');
        showError(friendlyMessage);
      } finally {
        setIsDeletingAddress(false);
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

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login?returnUrl=/dashboard');
    }
  }, [isAuthenticated, router]);

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


