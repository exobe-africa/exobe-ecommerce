"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  OrderSuccessSection, 
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

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { user, addresses, isLoggedIn } = useUser();
  
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
  const [orderComplete, setOrderComplete] = useState(false);

  // Auto-populate form data for logged-in users
  useEffect(() => {
    if (isLoggedIn && user) {
      const [firstName, ...lastNameParts] = user.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      }));

      // Auto-select default address if available
      const defaultAddress = addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setFormData(prev => ({
          ...prev,
          address: defaultAddress.street,
          city: defaultAddress.city,
          province: defaultAddress.province,
          postalCode: defaultAddress.postalCode,
        }));
      }
    }
  }, [isLoggedIn, user, addresses]);

  // Show guest modal for non-logged-in users (only if they haven't declined before)
  useEffect(() => {
    if (!isLoggedIn && !showGuestModal && !hasDeclinedGuestModal && state.items.length > 0) {
      const timer = setTimeout(() => {
        setShowGuestModal(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, showGuestModal, hasDeclinedGuestModal, state.items.length]);

  useEffect(() => {
    if (state.items.length === 0 && !orderComplete) {
      router.push('/');
    }
  }, [state.items.length, router, orderComplete]);

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
      apartment: '', // Reset apartment as it's not stored in saved addresses
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
    }));
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
    } else if (step === 2) {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
      }
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
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
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
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <OrderSuccessSection />
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
                userAddresses={addresses}
                onSelectAddress={() => setShowAddressModal(true)}
                showGuestPrompt={hasDeclinedGuestModal}
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
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>

      {/* Guest Checkout Modal */}
      <GuestCheckoutModal
        isOpen={showGuestModal}
        onClose={() => {
          setShowGuestModal(false);
          setHasDeclinedGuestModal(true);
        }}
        onContinueAsGuest={handleContinueAsGuest}
      />

      {/* Address Selection Modal */}
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
      
    </div>
  );
}
