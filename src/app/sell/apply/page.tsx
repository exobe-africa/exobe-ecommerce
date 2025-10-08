"use client";

import React, { useCallback, useMemo, useState } from 'react';
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
import { useToast } from '../../../context/ToastContext';

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

  const { applySeller, isSubmitting, error: globalSubmitError, fieldErrors, clearError, clearFieldErrors } = useApplicationsStore();

  const { showError } = useToast();

  const allErrors = useMemo(() => {
    return { ...errors, ...fieldErrors };
  }, [errors, fieldErrors]);

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
    if (fieldErrors[name]) {
      clearFieldErrors();
    }
  };

  const handleInputBlur = useCallback((fieldName: string) => {
    if (formData[fieldName as keyof FormData]?.toString().trim()) {
      validateField(fieldName);
    }
  }, [formData]);

  const validateField = useCallback((fieldName: string) => {
    const newErrors: {[key: string]: string} = {};
    const currentValue = formData[fieldName as keyof FormData];

    switch (fieldName) {
      case 'firstName':
        if (!currentValue?.toString().trim()) {
          newErrors.firstName = 'First name is required';
        } else if (currentValue.toString().trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        }
        break;
      case 'lastName':
        if (!currentValue?.toString().trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (currentValue.toString().trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!currentValue?.toString().trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue.toString())) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!currentValue?.toString().trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
      case 'businessName':
        if (!currentValue?.toString().trim()) {
          newErrors.businessName = 'Business name is required';
        }
        break;
      case 'saIdNumber':
        if (formData.applicantType === 'individual') {
          if (!currentValue) {
            newErrors.saIdNumber = 'SA ID number is required for sole proprietors';
          } else if (currentValue.toString().replace(/\s/g, '').length !== 13) {
            newErrors.saIdNumber = 'SA ID number must be exactly 13 digits';
          }
        }
        break;
      case 'vatRegistered':
        if (!currentValue?.toString().trim()) {
          newErrors.vatRegistered = 'Please specify VAT registration status';
        }
        break;
      case 'vatNumber':
        if (formData.vatRegistered === 'yes' && !currentValue?.toString().trim()) {
          newErrors.vatNumber = 'VAT number is required when VAT registered';
        }
        break;
      case 'address':
        if (!currentValue?.toString().trim()) {
          newErrors.address = 'Address is required';
        }
        break;
      case 'city':
        if (!currentValue?.toString().trim()) {
          newErrors.city = 'City is required';
        }
        break;
      case 'province':
        if (!currentValue?.toString().trim()) {
          newErrors.province = 'Province is required';
        }
        break;
      case 'postalCode':
        if (!currentValue?.toString().trim()) {
          newErrors.postalCode = 'Postal code is required';
        }
        break;
      case 'primaryCategory':
        if (!currentValue?.toString().trim()) {
          newErrors.primaryCategory = 'Please select a primary category';
        }
        break;
      case 'stockType':
        if (!currentValue?.toString().trim()) {
          newErrors.stockType = 'Please specify your stock type';
        }
        break;
      case 'productDescription':
        if (!currentValue?.toString().trim()) {
          newErrors.productDescription = 'Please specify your product description';
        }
        break;
      case 'businessSummary':
        if (!currentValue?.toString().trim()) {
          newErrors.businessSummary = 'Business summary is required';
        } else if (currentValue.toString().trim().length < 20) {
          newErrors.businessSummary = 'Business summary must be at least 20 characters';
        }
        break;
      case 'howDidYouHear':
        if (!currentValue?.toString().trim()) {
          newErrors.howDidYouHear = 'Please tell us how you heard about us';
        }
        break;
    }

    // Update errors state only if there's actually a change
    setErrors(prev => {
      const currentError = prev[fieldName];
      const newError = newErrors[fieldName] || '';

      if (currentError !== newError) {
        return {
          ...prev,
          [fieldName]: newError
        };
      }
      return prev;
    });

    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.sellerType) newErrors.sellerType = 'Please select whether you are applying as a retailer or wholesaler';
        if (!formData.businessType) newErrors.businessType = 'Please select a business type';
        if (!formData.applicantType) newErrors.applicantType = 'Please select how you are applying';
        break;
      case 2:
        if (!formData.firstName?.trim()) {
          newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        }
        if (!formData.lastName?.trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        }
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        if (!formData.identificationType) newErrors.identificationType = 'Please select identification type';
        break;
      case 3:
        if (!formData.businessName?.trim()) {
          newErrors.businessName = 'Business name is required';
        }
        if (formData.applicantType === 'individual') {
          if (!formData.saIdNumber) {
            newErrors.saIdNumber = 'SA ID number is required for sole proprietors';
          } else if (formData.saIdNumber.replace(/\s/g, '').length !== 13) {
            newErrors.saIdNumber = 'SA ID number must be exactly 13 digits';
          }
        }
        if (!formData.vatRegistered) {
          newErrors.vatRegistered = 'Please specify VAT registration status';
        }
        if (formData.vatRegistered === 'yes' && !formData.vatNumber?.trim()) {
          newErrors.vatNumber = 'VAT number is required';
        }
        break;
      case 4:
        if (!formData.address?.trim()) newErrors.address = 'Address is required';
        if (!formData.city?.trim()) newErrors.city = 'City is required';
        if (!formData.province?.trim()) newErrors.province = 'Province is required';
        if (!formData.postalCode?.trim()) newErrors.postalCode = 'Postal code is required';
        break;
      case 5:
        if (!formData.primaryCategory?.trim()) newErrors.primaryCategory = 'Please select a primary category';
        if (!formData.stockType?.trim()) newErrors.stockType = 'Please specify your stock type';
        if (!formData.productDescription?.trim()) newErrors.productDescription = 'Please specify your product description';
        break;
      case 6:
        if (!formData.businessSummary?.trim()) {
          newErrors.businessSummary = 'Business summary is required';
        } else if (formData.businessSummary.trim().length < 20) {
          newErrors.businessSummary = 'Business summary must be at least 20 characters';
        }
        if (!formData.howDidYouHear?.trim()) newErrors.howDidYouHear = 'Please tell us how you heard about us';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

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
    } else {
      scrollToTop();
      showError('Please fix the highlighted fields in this step');
    }
  };

  const isCurrentStepComplete = useMemo(() => {
    switch (currentStep) {
      case 1:
        return !!formData.sellerType && !!formData.businessType && !!formData.applicantType;
      case 2:
        return !!formData.firstName?.trim() &&
               formData.firstName.trim().length >= 2 &&
               !!formData.lastName?.trim() &&
               formData.lastName.trim().length >= 2 &&
               !!formData.email?.trim() &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
               !!formData.phone?.trim() &&
               !!formData.identificationType;
      case 3:
        return !!formData.businessName?.trim() &&
               (formData.applicantType !== 'individual' || (formData.saIdNumber?.replace(/\s/g, '').length === 13)) &&
               !!formData.vatRegistered &&
               (formData.vatRegistered !== 'yes' || !!formData.vatNumber?.trim());
      case 4:
        return !!formData.address?.trim() &&
               !!formData.city?.trim() &&
               !!formData.province?.trim() &&
               !!formData.postalCode?.trim();
      case 5:
        return !!formData.primaryCategory?.trim() &&
               !!formData.stockType?.trim() &&
               !!formData.productDescription?.trim();
      case 6:
        return !!formData.businessSummary?.trim() &&
               formData.businessSummary.trim().length >= 20 &&
               !!formData.howDidYouHear?.trim() &&
               !!formData.agreeToTerms;
      default:
        return true;
    }
  }, [currentStep, formData]);

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setSubmitError(null);
      clearFieldErrors();
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
        console.error('Error submitting application:', err);
        const message = getUserFriendlyErrorMessage(err?.message || 'Submission failed');
        setSubmitError(message);
        showError(message);
        scrollToTop();
      }
    } else {
      scrollToTop();
      showError('Please fix the highlighted fields in this step');
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
            errors={allErrors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            formData={formData}
            errors={allErrors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <BusinessDetailsStep
            formData={formData}
            errors={allErrors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <AddressStep
            formData={formData}
            errors={allErrors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
          />
        );
      case 5:
        return (
          <ProductsStep
            formData={formData}
            errors={allErrors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
            setFormData={setFormData}
          />
        );
      case 6:
        return (
          <FinalDetailsStep
            formData={formData}
            errors={allErrors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
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
            isStepComplete={isCurrentStepComplete}
          />
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
