"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  ArrowRight,
  Building,
  User,
  MapPin,
  Package,
  FileText,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  Upload,
  Store,
  Shield,
  Clock
} from 'lucide-react';
import { Navbar, Footer, PhoneInput, Checkbox, RadioButton, ApplicationSuccessModal, ApplicationHelpSection } from '../../../components';

export default function SellerApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Business Type
    businessType: '',
    applicantType: '',
    
    // Step 2: Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    landline: '',
    identificationType: '',
    
    // Step 3: Business Details
    businessName: '',
    businessRegistration: '',
    saIdNumber: '',
    vatRegistered: '',
    vatNumber: '',
    monthlyRevenue: '',
    physicalStores: '',
    numberOfStores: '',
    supplierToRetailers: '',
    otherMarketplaces: '',
    
    // Step 4: Address
    address: '',
    city: '',
    province: '',
    postalCode: '',
    
    // Step 5: Products
    uniqueProducts: '',
    primaryCategory: '',
    stockType: '',
    productDescription: '',
    ownedBrands: '',
    resellerBrands: '',
    website: '',
    socialMedia: '',
    
    // Step 6: Final Details
    businessSummary: '',
    howDidYouHear: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const steps = [
    { id: 1, name: 'Business Type', icon: Building, description: 'Tell us about your business structure' },
    { id: 2, name: 'Contact Info', icon: User, description: 'How can we reach you' },
    { id: 3, name: 'Business Details', icon: FileText, description: 'Your business information' },
    { id: 4, name: 'Address', icon: MapPin, description: 'Where is your business located' },
    { id: 5, name: 'Products', icon: Package, description: 'What do you want to sell' },
    { id: 6, name: 'Final Details', icon: CheckCircle, description: 'Complete your application' }
  ];

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Books",
    "Automotive", "Health", "Toys", "Jewelry", "Food & Beverages", "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    // Special handling for SA ID number - only allow digits
    if (name === 'saIdNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 13);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.businessType) newErrors.businessType = 'Please select a business type';
        if (!formData.applicantType) newErrors.applicantType = 'Please select how you are applying';
        break;
      case 2:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.identificationType) newErrors.identificationType = 'Please select identification type';
        break;
      case 3:
        if (!formData.businessName) newErrors.businessName = 'Business name is required';
        if (formData.applicantType === 'individual' && !formData.saIdNumber) {
          newErrors.saIdNumber = 'SA ID number is required for sole proprietors';
        } else if (formData.applicantType === 'individual' && formData.saIdNumber) {
          // Validate SA ID format (13 digits)
          const saIdRegex = /^\d{13}$/;
          if (!saIdRegex.test(formData.saIdNumber.replace(/\s/g, ''))) {
            newErrors.saIdNumber = 'SA ID number must be exactly 13 digits';
          }
        }
        if (!formData.vatRegistered) newErrors.vatRegistered = 'Please specify VAT registration status';
        if (formData.vatRegistered === 'yes' && !formData.vatNumber) {
          newErrors.vatNumber = 'VAT number is required';
        }
        break;
      case 4:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.province) newErrors.province = 'Province is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        break;
      case 5:
        if (!formData.primaryCategory) newErrors.primaryCategory = 'Please select a primary category';
        if (!formData.stockType) newErrors.stockType = 'Please specify your stock type';
        if (!formData.productDescription) newErrors.productDescription = 'Please specify your product description';
        break;
      case 6:
        if (!formData.businessSummary) newErrors.businessSummary = 'Business summary is required';
        if (!formData.howDidYouHear) newErrors.howDidYouHear = 'Please tell us how you heard about us';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Seller application:', formData);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/sell');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Building className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Business Type</h2>
              <p className="text-[#4A4A4A] text-lg">Tell us about your business structure</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  I am applying as: <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'individual', label: 'An individual (Sole Proprietor)' },
                    { value: 'registered', label: 'A South African Registered Business' },
                    { value: 'international', label: 'An International Seller (Non-SA Business)' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`applicantType-${option.value}`}
                      name="applicantType"
                      value={option.value}
                      checked={formData.applicantType === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, applicantType: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.applicantType && <p className="text-red-500 text-sm mt-2">{errors.applicantType}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Business Type: <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                >
                  <option value="">Select Business Type</option>
                  <option value="sole-proprietor">Sole Proprietor</option>
                  <option value="partnership">Partnership</option>
                  <option value="company">Company (Pty Ltd)</option>
                  <option value="cc">Close Corporation (CC)</option>
                  <option value="trust">Trust</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && <p className="text-red-500 text-sm mt-2">{errors.businessType}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <User className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Contact Information</h2>
              <p className="text-[#4A4A4A] text-lg">How can we get in touch with you</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    label="Mobile Phone *"
                    required
                    showIcon={false}
                    error={errors.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Landline Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                    <input
                      type="tel"
                      name="landline"
                      value={formData.landline}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                      placeholder="+27 11 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Identification Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'sa-id', label: 'South African ID document' },
                    { value: 'passport', label: 'Passport' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`identificationType-${option.value}`}
                      name="identificationType"
                      value={option.value}
                      checked={formData.identificationType === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, identificationType: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.identificationType && <p className="text-red-500 text-sm mt-2">{errors.identificationType}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <FileText className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Business Details</h2>
              <p className="text-[#4A4A4A] text-lg">Tell us about your business</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  {formData.applicantType === 'individual' ? 'Trading Name / Business Name' : 'Company/Business Legal Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder={formData.applicantType === 'individual' ? 'Enter your trading name' : 'Enter your registered business name'}
                />
                {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.applicantType !== 'individual' && (
                  <div>
                    <label className="block text-sm font-semibold text-[#000000] mb-2">
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      name="businessRegistration"
                      value={formData.businessRegistration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                      placeholder="Registration number"
                    />
                  </div>
                )}

                {formData.applicantType === 'individual' && (
                  <div>
                    <label className="block text-sm font-semibold text-[#000000] mb-2">
                      SA ID Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="saIdNumber"
                      value={formData.saIdNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                      placeholder="e.g. 8001015009087 (13 digits)"
                      maxLength={13}
                      pattern="\d{13}"
                    />
                    <div className="text-xs text-[#4A4A4A] mt-1">
                      Enter your 13-digit South African ID number
                    </div>
                    {errors.saIdNumber && <p className="text-red-500 text-sm mt-1">{errors.saIdNumber}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Are you VAT registered? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`vatRegistered-${option.value}`}
                      name="vatRegistered"
                      value={option.value}
                      checked={formData.vatRegistered === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, vatRegistered: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.vatRegistered && <p className="text-red-500 text-sm mt-2">{errors.vatRegistered}</p>}
              </div>

              {formData.vatRegistered === 'yes' && (
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    VAT Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Enter your VAT number"
                  />
                  {errors.vatNumber && <p className="text-red-500 text-sm mt-1">{errors.vatNumber}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Monthly Revenue (Optional)
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'under-20k', label: 'Less than R20k' },
                    { value: '20k-50k', label: 'R20k - R50k' },
                    { value: '50k-100k', label: 'R50k - R100k' },
                    { value: '100k-500k', label: 'R100k - R500k' },
                    { value: '500k-1m', label: 'R500k - R1 Million' },
                    { value: '1m-2.5m', label: 'R1 Million - R2.5 Million' },
                    { value: '2.5m-plus', label: 'R2.5 Million +' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`monthlyRevenue-${option.value}`}
                      name="monthlyRevenue"
                      value={option.value}
                      checked={formData.monthlyRevenue === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, monthlyRevenue: value }))}
                      label={option.label}
                      variant="default"
                      size="sm"
                      className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Business Address</h2>
              <p className="text-[#4A4A4A] text-lg">Where is your business located</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Enter your business address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Postal Code"
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Package className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Product Information</h2>
              <p className="text-[#4A4A4A] text-lg">Tell us about what you want to sell</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Number of Unique Products
                </label>
                <input
                  type="number"
                  name="uniqueProducts"
                  value={formData.uniqueProducts}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="How many different products do you offer?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Primary Product Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="primaryCategory"
                  value={formData.primaryCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                >
                  <option value="">Select Primary Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.primaryCategory && <p className="text-red-500 text-sm mt-1">{errors.primaryCategory}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Do you carry or hold stock? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'whole-range', label: 'Yes, on my whole product range' },
                    { value: 'some-range', label: 'Yes, on some of my product range' },
                    { value: 'on-demand', label: 'No, I order or manufacture on demand' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`stockType-${option.value}`}
                      name="stockType"
                      value={option.value}
                      checked={formData.stockType === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, stockType: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.stockType && <p className="text-red-500 text-sm mt-2">{errors.stockType}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Our finished products are best described as: <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'imported', label: 'Imported' },
                    { value: 'manufactured-locally', label: 'Manufactured locally' },
                    { value: 'mixture', label: 'A mixture of import and local manufacturers' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`productDescription-${option.value}`}
                      name="productDescription"
                      value={option.value}
                      checked={formData.productDescription === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, productDescription: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.productDescription && <p className="text-red-500 text-sm mt-2">{errors.productDescription}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Brand Names You Own
                  </label>
                  <textarea
                    name="ownedBrands"
                    value={formData.ownedBrands}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="List brand names you own or hold trademarks for"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Brand Names You Resell
                  </label>
                  <textarea
                    name="resellerBrands"
                    value={formData.resellerBrands}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="List brand names you resell or are licensed to use"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Website (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Social Media Page (Optional)
                  </label>
                  <input
                    type="url"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Link to your social media page"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Final Details</h2>
              <p className="text-[#4A4A4A] text-lg">Complete your application</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Business Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="businessSummary"
                  value={formData.businessSummary}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Tell us about your business, what makes it unique, what products you want to sell on eXobe, and any special requirements or certifications you have..."
                />
                <div className="text-sm text-[#4A4A4A] mt-2">
                  What makes your business or products unique?<br/>
                  What products do you want to market on the eXobe platform?<br/>
                  Do you have any feature requirements?<br/>
                  Does your business or products have any certifications? (Example: ISO, Proudly SA, ICASA, NRCS, etc)
                </div>
                {errors.businessSummary && <p className="text-red-500 text-sm mt-1">{errors.businessSummary}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  How did you hear about eXobe Marketplace? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'referral', label: 'Colleague or Friend Referral' },
                    { value: 'township', label: 'Township Economy Initiative' },
                    { value: 'expo', label: 'Expo' },
                    { value: 'customer', label: 'Found ability to sell as a customer of eXobe' },
                    { value: 'facebook', label: 'Facebook' },
                    { value: 'google', label: 'Google' },
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'tiktok', label: 'TikTok' },
                    { value: 'youtube', label: 'YouTube' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`howDidYouHear-${option.value}`}
                      name="howDidYouHear"
                      value={option.value}
                      checked={formData.howDidYouHear === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, howDidYouHear: value }))}
                      label={option.label}
                      variant="default"
                      size="sm"
                      className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
                    />
                  ))}
                </div>
                {errors.howDidYouHear && <p className="text-red-500 text-sm mt-2">{errors.howDidYouHear}</p>}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked }))}
                  required
                  label={
                    <span className="text-sm leading-relaxed">
                      I agree to the{' '}
                      <Link href="/terms-and-conditions" className="text-[#C8102E] hover:underline font-semibold">
                        Terms and Conditions
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="text-[#C8102E] hover:underline font-semibold">
                        Privacy Policy
                      </Link>
                      , and understand that eXobe will review my application within 2-3 business days.
                    </span>
                  }
                />
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] text-white py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/sell" className="flex items-center text-white hover:text-red-100 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Sell Page
            </Link>
            <div className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Apply to Sell on eXobe</h1>
            <p className="text-red-100 text-lg">2M+ customers are looking for new brands and unique products!</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Progress */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="text-sm font-medium text-[#C8102E]">Step {currentStep} of {steps.length}</span>
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
            <div className="flex justify-center mt-3">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  'bg-[#C8102E] border-[#C8102E] text-white'
                }`}>
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-4 w-4" })}
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[#C8102E]">
                    {steps[currentStep - 1].name}
                  </div>
                  <div className="text-xs text-[#4A4A4A]">
                    {steps[currentStep - 1].description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block overflow-hidden">
            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex items-center min-w-0 max-w-full">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors flex-shrink-0 ${
                      currentStep >= step.id 
                        ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                        : currentStep === step.id 
                          ? 'border-[#C8102E] text-[#C8102E] bg-white'
                          : 'border-gray-300 text-gray-400 bg-white'
                    }`}>
                      {React.createElement(step.icon, { className: "h-5 w-5" })}
                    </div>
                    <div className="ml-2 min-w-0 flex-1">
                      <div className={`text-xs font-semibold truncate ${
                        currentStep >= step.id ? 'text-[#C8102E]' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate hidden xl:block">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-2 min-w-[20px] max-w-[60px]">
                      <div className={`h-0.5 w-full transition-colors ${
                        currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:block lg:hidden">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                      : currentStep === step.id 
                        ? 'border-[#C8102E] text-[#C8102E] bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {React.createElement(step.icon, { className: "h-5 w-5" })}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-4 h-0.5 w-8 ${
                      currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <div className={`text-lg font-semibold ${
                'text-[#C8102E]'
              }`}>
                {steps[currentStep - 1].name}
              </div>
              <div className="text-sm text-gray-500">{steps[currentStep - 1].description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={currentStep === steps.length ? handleSubmit : (e) => e.preventDefault()}>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-[#4A4A4A] rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep === steps.length ? (
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg"
              >
                <Upload className="h-5 w-5 mr-2" />
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg"
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </form>

        {/* Help Section */}
        <ApplicationHelpSection
          applicationType="seller"
          responseTime="2-3 business days"
        />
      </div>

      {/* Success Modal */}
      <ApplicationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        applicationType="seller"
        subtitle="Thank you for your interest in selling on eXobe"
        responseTime="2-3 business days"
        backButtonText="Back to Sell Page"
      />

      <Footer />
    </div>
  );
}
