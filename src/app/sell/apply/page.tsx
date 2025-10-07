"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building,
  User,
  MapPin,
  Package,
  FileText,
  CheckCircle
} from 'lucide-react';
import {
  ApplicationHeader,
  ProgressSteps,
  BusinessTypeStep,
  ContactInfoStep,
  BusinessDetailsStep,
  AddressStep,
  ProductsStep,
  FinalDetailsStep,
  NavigationButtons,
  FormData
} from '../../../components/pages/sell/apply';
import { ApplicationHelpSection, ApplicationSuccessModal } from '../../../components/common';
import { getUserFriendlyErrorMessage } from '../../../lib/utils/errorMessages';
import { useApplicationsStore } from '../../../store/applications';

export default function SellerApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    sellerType: '',
    businessType: '',
    applicantType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    landline: '',
    identificationType: '',
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
    address: '',
    city: '',
    province: '',
    postalCode: '',
    uniqueProducts: '',
    primaryCategory: '',
    stockType: '',
    productDescription: '',
    ownedBrands: '',
    resellerBrands: '',
    website: '',
    socialMedia: '',
    businessSummary: '',
    howDidYouHear: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const { applySeller, isSubmitting, error: globalSubmitError, clearError } = useApplicationsStore();

  const steps = [
    { id: 1, name: 'Business Type', icon: Building, description: 'Tell us about your business structure' },
    { id: 2, name: 'Contact Info', icon: User, description: 'How can we reach you' },
    { id: 3, name: 'Business Details', icon: FileText, description: 'Your business information' },
    { id: 4, name: 'Address', icon: MapPin, description: 'Where is your business located' },
    { id: 5, name: 'Products', icon: Package, description: 'What do you want to sell' },
    { id: 6, name: 'Final Details', icon: CheckCircle, description: 'Complete your application' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    if (name === 'saIdNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 13);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

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
        if (!formData.sellerType) newErrors.sellerType = 'Please select whether you are applying as a retailer or wholesaler';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setSubmitError(null);
      // Map frontend form fields to backend input naming
      const input = {
        businessType: formData.businessType,
        applicantType: formData.applicantType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        landline: formData.landline || null,
        identificationType: formData.identificationType,
        businessName: formData.businessName,
        businessRegistration: formData.businessRegistration || null,
        saIdNumber: formData.saIdNumber || null,
        vatRegistered: formData.vatRegistered,
        vatNumber: formData.vatNumber || null,
        monthlyRevenue: formData.monthlyRevenue || null,
        physicalStores: formData.physicalStores || null,
        numberOfStores: formData.numberOfStores || null,
        supplierToRetailers: formData.supplierToRetailers || null,
        otherMarketplaces: formData.otherMarketplaces || null,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        uniqueProducts: formData.uniqueProducts || null,
        primaryCategory: formData.primaryCategory,
        stockType: formData.stockType,
        productDescription: formData.productDescription,
        ownedBrands: formData.ownedBrands || null,
        resellerBrands: formData.resellerBrands || null,
        website: formData.website || null,
        socialMedia: formData.socialMedia || null,
        businessSummary: formData.businessSummary,
        howDidYouHear: formData.howDidYouHear,
        agreeToTerms: !!formData.agreeToTerms,
      } as const;

      try {
        await applySeller(formData.sellerType === 'wholesaler' ? 'wholesaler' : 'retailer', input as any);
        setShowSuccessModal(true);
      } catch (err: any) {
        const message = getUserFriendlyErrorMessage(err?.message || 'Submission failed');
        setSubmitError(message);
      }
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
          <BusinessTypeStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <BusinessDetailsStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <AddressStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <ProductsStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      case 6:
        return (
          <FinalDetailsStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <ApplicationHeader 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <ProgressSteps 
        steps={steps} 
        currentStep={currentStep} 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={currentStep === steps.length ? handleSubmit : (e) => e.preventDefault()}>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
            {renderStepContent()}
          </div>

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          {submitError && (
            <p className="mt-4 text-red-600 text-sm">{submitError}</p>
          )}
          {!submitError && globalSubmitError && (
            <p className="mt-4 text-red-600 text-sm">{getUserFriendlyErrorMessage(globalSubmitError)}</p>
          )}
        </form>

        <ApplicationHelpSection
          applicationType="seller"
          responseTime="2-3 business days"
        />
      </div>

      <ApplicationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        applicationType="seller"
        subtitle="Thank you for your interest in selling on eXobe"
        responseTime="2-3 business days"
        backButtonText="Back to Sell Page"
      />

    </div>
  );
}
