"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckoutHeader, 
  ShippingForm, 
  PaymentForm, 
  OrderReview, 
  CheckoutSummary, 
  CheckoutNavigation 
} from '../../components/pages/checkout';
import GuestCheckoutModal from '../../components/pages/checkout/GuestCheckoutModal';
import AddressSelectionModal from '../../components/pages/checkout/AddressSelectionModal';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { useAuthStore } from '../../store/auth';
import { ShoppingBag, CheckCircle2, Loader2 } from 'lucide-react';
import { useOrdersStore } from '../../store/orders';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { user: userCtx, addresses, isLoggedIn: isLoggedInCtx } = useUser();
  const { user: authUser, isAuthenticated, hasHydrated: authHasHydrated } = useAuthStore();
  const isLoggedIn = isAuthenticated || isLoggedInCtx;
  const [uiAddresses, setUiAddresses] = useState<any[]>([]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();
  const [hasDeclinedGuestModal, setHasDeclinedGuestModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
    
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    billingAddressSame: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingProvince: '',
    billingPostalCode: '',
    billingCountry: 'South Africa',
    
    saveInfo: true,
    newsletter: true,
    specialInstructions: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasAutoFilledAddress, setHasAutoFilledAddress] = useState(false);
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    if (!isLoggedIn) {
      setUiAddresses([]);
      return;
    }
    if (addresses && addresses.length > 0) {
      setUiAddresses(addresses);
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('exobeUserAddresses');
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) setUiAddresses(parsed);
      } catch (_) {
        setUiAddresses([]);
      }
    }
  }, [isLoggedIn, addresses]);

  useEffect(() => {
    if (isLoggedIn && (authUser || userCtx)) {
      setIsLoadingUserData(true);
      
      const fullName = (authUser?.name || userCtx?.name || '').trim();
      const [firstName, ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        email: (authUser?.email || (userCtx as any)?.email || ''),
        phone: (authUser?.phone || (userCtx as any)?.phone || ''),
      }));

      const source = (uiAddresses && uiAddresses.length > 0) ? uiAddresses : (addresses || []);
      const defaultAddress = source?.find((addr: any) => addr.isDefault) || source?.[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setFormData(prev => ({
          ...prev,
          address: defaultAddress.street || defaultAddress.address || '',
          city: defaultAddress.city,
          province: defaultAddress.province,
          postalCode: defaultAddress.postalCode,
        }));
      }
      
      setTimeout(() => {
        setIsLoadingUserData(false);
      }, 500);
    }
  }, [isLoggedIn, authUser, userCtx]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const source = (uiAddresses && uiAddresses.length > 0) ? uiAddresses : (addresses || []);
    if (!source || source.length === 0) return;
    if (hasAutoFilledAddress) return;
    const defaultAddress = source.find((a: any) => a.isDefault) || source[0];
    if (!defaultAddress) return;
    setSelectedAddressId(defaultAddress.id);
    setFormData(prev => ({
      ...prev,
      address: defaultAddress.street || defaultAddress.address || '',
      city: defaultAddress.city || '',
      province: defaultAddress.province || '',
      postalCode: defaultAddress.postalCode || '',
    }));
    setHasAutoFilledAddress(true);
  }, [isLoggedIn, uiAddresses, addresses, hasAutoFilledAddress]);

  useEffect(() => {
    if (!isLoggedIn && hasMounted && authHasHydrated && !showGuestModal && !hasDeclinedGuestModal && state.items.length > 0) {
      const timer = setTimeout(() => {
        setShowGuestModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (isLoggedIn) {
      setShowGuestModal(false);
      setHasDeclinedGuestModal(true);
    }
  }, [isLoggedIn, showGuestModal, hasDeclinedGuestModal, state.items.length, hasMounted, authHasHydrated]);

  useEffect(() => {
    if (state.items.length === 0 && !isProcessing) {
      router.push('/');
    }
  }, [state.items.length, router, isProcessing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddressSelect = (address: any) => {
    setSelectedAddressId(address.id);
    setFormData(prev => ({
      ...prev,
      address: address.street,
      apartment: '',
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
    }));
  };

  const handleAddressDropdownChange = (addressId: number) => {
    const list = (uiAddresses && uiAddresses.length > 0) ? uiAddresses : (addresses || []);
    const selectedAddress = list.find((addr: any) => addr.id === addressId);
    if (selectedAddress) {
      handleAddressSelect(selectedAddress);
    }
  };

  const handleContinueAsGuest = () => {
    setShowGuestModal(false);
    setHasDeclinedGuestModal(true);
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.province.trim()) newErrors.province = 'Province is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return;
    
    setIsProcessing(true);
    
    try {
      const orderItems = state.items.map(item => {
        let variantId = item.variant?.key || null;
        
        if (!variantId && item.variant && Object.keys(item.variant).length > 0) {
          variantId = item.uniqueId || item.id;
        }
        
        return {
          variant_id: variantId || item.id,
          quantity: item.quantity
        };
      });

      const shippingAddress = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        apartment: formData.apartment || '',
        city: formData.city,
        province: formData.province,
        postal_code: formData.postalCode,
        country: formData.country,
        phone: formData.phone
      };

      const billingAddress = formData.billingAddressSame
        ? shippingAddress
        : {
            first_name: formData.billingFirstName || formData.firstName,
            last_name: formData.billingLastName || formData.lastName,
            address: formData.billingAddress || formData.address,
            apartment: formData.billingApartment || formData.apartment || '',
            city: formData.billingCity || formData.city,
            province: formData.billingProvince || formData.province,
            postal_code: formData.billingPostalCode || formData.postalCode,
            country: formData.billingCountry || formData.country,
            phone: formData.phone
          };

      const orderInput = {
        userId: authUser?.id || undefined,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        mobile: formData.phone,
        shippingAddress,
        billingAddress,
        items: orderItems
      };

      const { success, order, error } = await useOrdersStore.getState().placeOrder(orderInput);
      if (success && order) {
        clearCart();
        // Navigate to success page with order number
        router.push(`/order-success?orderNumber=${order.order_number || order.id}`);
      } else {
        throw new Error(error || 'Failed to place order');
      }
    } catch (error: any) {
      console.error('Error creating order:', error);
      // Navigate to failure page with error message
      router.push(`/order-failed?error=${encodeURIComponent(error.message || 'Failed to place order. Please try again.')}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const subtotal = state.totalPrice;
  const shipping = subtotal >= 499 ? 0 : 99;
  const total = subtotal + shipping;

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
                {[1,2,3,4].map(i => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
                <div className="h-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <CheckoutHeader currentStep={currentStep} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <ShippingForm
                formData={formData}
                errors={errors}
                provinces={provinces}
                onInputChange={handleInputChange}
                onPhoneChange={handlePhoneChange}
                onCheckboxChange={handleCheckboxChange}
                isLoggedIn={isLoggedIn}
                userAddresses={uiAddresses}
                onSelectAddress={() => setShowAddressModal(true)}
                onAddressDropdownChange={handleAddressDropdownChange}
                showGuestPrompt={hasDeclinedGuestModal}
                isLoadingData={isLoadingUserData}
              />
            )}

            {currentStep === 2 && (
              <PaymentForm
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />
            )}

            {currentStep === 3 && (
              <OrderReview
                formData={formData}
                onEditShipping={() => setCurrentStep(1)}
                onEditPayment={() => setCurrentStep(2)}
              />
            )}

            <CheckoutNavigation
              currentStep={currentStep}
              totalSteps={3}
              isProcessing={isProcessing}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummary
              items={state.items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <GuestCheckoutModal
          isOpen={showGuestModal}
          onClose={() => {
            setShowGuestModal(false);
            setHasDeclinedGuestModal(true);
          }}
          onContinueAsGuest={handleContinueAsGuest}
        />
      )}

      <AddressSelectionModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleAddressSelect}
        onAddNewAddress={() => {
          setShowAddressModal(false);
          router.push('/dashboard?tab=addresses');
        }}
      />

      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 flex flex-col items-center gap-6 min-w-[320px] sm:min-w-[400px] max-w-md mx-4 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 border-4 border-[#C8102E] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-[#C8102E] animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-[#000000]">
                Processing Your Order
              </h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                Please wait while we securely process your order and update inventory. This may take a few moments.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                <p className="text-xs sm:text-sm text-amber-800 font-medium flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Please do not refresh or close this page</span>
                </p>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A4A4A]">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Validating order details</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A4A4A]">
                <Loader2 className="w-4 h-4 text-[#C8102E] animate-spin flex-shrink-0" />
                <span>Processing payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                <span>Updating inventory</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                <span>Sending confirmation</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200 w-full justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secured by SSL encryption</span>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
