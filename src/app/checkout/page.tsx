"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  Lock, 
  Check, 
  Edit2, 
  Plus,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  Shield,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { Navbar, Footer, Checkbox, PhoneInput } from '../../components';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
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

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      // Shipping information validation
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
      // Payment validation
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
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  const subtotal = state.totalPrice;
  const shipping = subtotal >= 499 ? 0 : 99;
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: Check }
  ];

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-[#000000] mb-4">Order Confirmed!</h1>
            <p className="text-[#4A4A4A] mb-6">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-[#4A4A4A]">Order Number</p>
              <p className="text-lg font-semibold text-[#000000]">#EXO{Date.now().toString().slice(-6)}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="flex-1">
                <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors">
                  Continue Shopping
                </button>
              </Link>
              <Link href="/orders" className="flex-1">
                <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                  View Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/cart">
                <button className="flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors touch-manipulation">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Back to Cart</span>
                </button>
              </Link>
              <div className="h-5 w-px bg-gray-300 hidden sm:block" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000]">Checkout</h1>
            </div>
            
            <div className="flex items-center text-xs sm:text-sm text-[#4A4A4A] self-start sm:self-center">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Secure Checkout</span>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-4 sm:mt-6">
            {/* Mobile Progress Steps */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <span className="text-sm font-medium text-[#C8102E]">Step {currentStep} of 3</span>
              </div>
              <div className="flex items-center space-x-1">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-1">
                    <div className={`h-2 rounded-full transition-colors ${
                      currentStep >= step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                    }`} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                    'bg-[#C8102E] border-[#C8102E] text-white'
                  }`}>
                    {React.createElement(steps[currentStep - 1].icon, { className: "h-4 w-4" })}
                  </div>
                  <span className="text-sm font-medium text-[#C8102E]">
                    {steps[currentStep - 1].name}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Progress Steps */}
            <div className="hidden sm:flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                      : 'border-gray-300 text-[#4A4A4A]'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-[#C8102E]' : 'text-[#4A4A4A]'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 flex-1 h-px ${
                      currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                  <Truck className="h-6 w-6 mr-2 text-[#C8102E]" />
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    label="Phone"
                    error={errors.phone}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#000000] mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#4A4A4A]" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#000000] mb-2">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500"
                    placeholder="Apartment 4B"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Johannesburg"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">Province</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] ${
                        errors.province ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="2000"
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#000000] mb-2">Special Instructions (optional)</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500"
                    placeholder="Any special delivery instructions..."
                  />
                </div>

                <div className="space-y-3">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={(checked) => setFormData(prev => ({ ...prev, saveInfo: checked }))}
                    label="Save this information for next time"
                    size="sm"
                  />
                  
                  <Checkbox
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked }))}
                    label="Email me with news and offers"
                    size="sm"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                  <CreditCard className="h-6 w-6 mr-2 text-[#C8102E]" />
                  Payment Information
                </h2>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#000000] mb-3">Payment Method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-[#000000]">Credit Card</div>
                        <div className="text-xs text-[#4A4A4A]">Visa, Mastercard</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-[#000000]">PayPal</div>
                        <div className="text-xs text-[#4A4A4A]">Pay with PayPal</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="eft"
                        checked={formData.paymentMethod === 'eft'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-[#000000]">Bank Transfer</div>
                        <div className="text-xs text-[#4A4A4A]">EFT Payment</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                          errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal */}
                {formData.paymentMethod === 'paypal' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      After clicking "Place Order", you will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}

                {/* EFT */}
                {formData.paymentMethod === 'eft' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800 mb-2">
                      Bank transfer details will be provided after order confirmation.
                    </p>
                    <p className="text-xs text-orange-700">
                      Your order will be processed once payment is received (usually within 24 hours).
                    </p>
                  </div>
                )}

                {/* Billing Address */}
                <div className="mt-6">
                  <div className="mb-4">
                    <Checkbox
                      id="billingAddressSame"
                      name="billingAddressSame"
                      checked={formData.billingAddressSame}
                      onChange={(checked) => setFormData(prev => ({ ...prev, billingAddressSame: checked }))}
                      label="Billing address is the same as shipping address"
                      size="sm"
                      labelClassName="font-medium"
                    />
                  </div>

                  {!formData.billingAddressSame && (
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-[#000000]">Billing Address</h3>
                      {/* Add billing address fields here - similar to shipping */}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                  <Check className="h-6 w-6 mr-2 text-[#C8102E]" />
                  Review Your Order
                </h2>

                {/* Shipping Info Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#000000]">Shipping Address</h3>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="text-[#C8102E] hover:text-[#A00E26] text-sm font-medium flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-[#4A4A4A]">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    {formData.apartment && <p>{formData.apartment}</p>}
                    <p>{formData.city}, {formData.province} {formData.postalCode}</p>
                    <p>{formData.country}</p>
                    <p className="mt-2">{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>

                {/* Payment Info Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#000000]">Payment Method</h3>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="text-[#C8102E] hover:text-[#A00E26] text-sm font-medium flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-[#4A4A4A]">
                    {formData.paymentMethod === 'card' && (
                      <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                    )}
                    {formData.paymentMethod === 'paypal' && <p>PayPal</p>}
                    {formData.paymentMethod === 'eft' && <p>Bank Transfer (EFT)</p>}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Your payment is secure</p>
                      <p className="text-xs text-green-600">We use industry-standard encryption to protect your information</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-[#4A4A4A] rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-[#C8102E]" />
                Order Summary
              </h3>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#000000] truncate">{item.name}</h4>
                      <p className="text-sm text-[#4A4A4A]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#C8102E]">R{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pricing Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">Subtotal</span>
                  <span className="text-[#000000]">R{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : 'text-[#000000]'}>
                    {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">VAT (15%)</span>
                  <span className="text-[#000000]">R{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-[#000000]">Total</span>
                    <span className="text-[#C8102E]">R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    Add R{(499 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}
              
              {/* Trust Signals */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <Shield className="h-4 w-4 mr-2 text-green-600" />
                  Secure 256-bit SSL encryption
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <Truck className="h-4 w-4 mr-2 text-blue-600" />
                  Free returns within 30 days
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <Phone className="h-4 w-4 mr-2 text-purple-600" />
                  24/7 customer support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
