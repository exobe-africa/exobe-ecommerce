"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Briefcase,
  MapPin,
  FileText,
  CheckCircle,
  Award
} from 'lucide-react';
import {
  ApplicationHeader,
  ProgressSteps,
  PersonalInfoStep,
  ServicesStep,
  LocationStep,
  BusinessInfoStep,
  PortfolioStep,
  FinalDetailsStep,
  NavigationButtons,
  StepData
} from '../../../components/pages/service-providers/apply';
import { ApplicationHelpSection } from '@/components/common';
import { ApplicationSuccessModal } from '@/components/common';
import { useServiceProviderApplicationStore } from '../../../store/serviceProviderApplications';
import { useToast } from '../../../context/ToastContext';

export default function ServiceProviderApplicationPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    provinces,
    serviceCategories,
    identificationTypes,
    setFormData,
    setErrors,
    submitApplication,
    validateStep,
    resetForm
  } = useServiceProviderApplicationStore();

  const steps: StepData[] = [
    { id: 1, name: 'Personal Info', icon: User, description: 'Tell us about yourself' },
    { id: 2, name: 'Services', icon: Briefcase, description: 'What services do you offer' },
    { id: 3, name: 'Location', icon: MapPin, description: 'Where do you operate' },
    { id: 4, name: 'Business Info', icon: FileText, description: 'Professional details' },
    { id: 5, name: 'Portfolio', icon: Award, description: 'Show your expertise' },
    { id: 6, name: 'Final Details', icon: CheckCircle, description: 'Complete your application' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let processedValue = value;

    if (name === 'idNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 13);
    }

    setFormData({ [name]: type === 'checkbox' ? checked : processedValue } as any);

    if (errors[name]) {
      setErrors({ [name]: '' });
    }
  };

  const handleCategoryChange = (category: string) => {
    const currentCategories = formData.serviceCategories;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    setFormData({ serviceCategories: newCategories });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
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

    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      return;
    }

    const result = await submitApplication(formData);
    if (result.success) {
      showSuccess('Application submitted successfully! We\'ll review it within 3-5 business days.');
      resetForm();
      setShowSuccessModal(true);
    } else {
      showError(result.error || 'Failed to submit application. Please try again.');
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/service-providers');
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            identificationTypes={identificationTypes}
          />
        );
      case 2:
        return (
          <ServicesStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            serviceCategories={serviceCategories}
            onCategoryChange={handleCategoryChange}
          />
        );
      case 3:
        return (
          <LocationStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            provinces={provinces}
          />
        );
      case 4:
        return (
          <BusinessInfoStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <PortfolioStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />
        );
      case 6:
        return (
          <FinalDetailsStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
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

      {/* Form Content */}
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
        </form>

        <ApplicationHelpSection
          applicationType="service-provider"
          responseTime="3-5 business days"
        />
      </div>

      <ApplicationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        applicationType="service-provider"
        responseTime="3-5 business days"
      />

    </div>
  );
} 