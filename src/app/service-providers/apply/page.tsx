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
  ServiceProviderFormData,
  StepData
} from '../../../components/pages/service-providers/apply';

export default function ServiceProviderApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<ServiceProviderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idNumber: '',
    identificationType: '',
    serviceCategories: [],
    primaryService: '',
    experience: '',
    qualifications: '',
    portfolio: '',
    hourlyRate: '',
    availability: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    serviceRadius: '',
    transportMode: '',
    businessName: '',
    businessRegistration: '',
    vatRegistered: '',
    vatNumber: '',
    bankDetails: '',
    emergencyContact: '',
    workSamples: '',
    clientReferences: '',
    certifications: '',
    insurance: '',
    backgroundCheck: '',
    motivation: '',
    goals: '',
    howDidYouHear: '',
    agreeToTerms: false,
    agreeToBackground: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const steps: StepData[] = [
    { id: 1, name: 'Personal Info', icon: User, description: 'Tell us about yourself' },
    { id: 2, name: 'Services', icon: Briefcase, description: 'What services do you offer' },
    { id: 3, name: 'Location', icon: MapPin, description: 'Where do you operate' },
    { id: 4, name: 'Business Info', icon: FileText, description: 'Professional details' },
    { id: 5, name: 'Portfolio', icon: Award, description: 'Show your expertise' },
    { id: 6, name: 'Final Details', icon: CheckCircle, description: 'Complete your application' }
  ];

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const serviceCategories = [
    "Home Maintenance", "Home Improvement", "Beauty & Wellness", "Photography",
    "Tech Support", "Automotive", "Food & Catering", "Education & Tutoring",
    "Fitness & Health", "Childcare", "Moving & Delivery", "Entertainment",
    "Cleaning Services", "Pet Care", "Event Planning", "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    if (name === 'idNumber') {
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

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(category)
        ? prev.serviceCategories.filter(c => c !== category)
        : [...prev.serviceCategories, category]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.idNumber) {
          newErrors.idNumber = 'ID number is required';
        } else {
          const saIdRegex = /^\d{13}$/;
          if (!saIdRegex.test(formData.idNumber.replace(/\s/g, ''))) {
            newErrors.idNumber = 'ID number must be exactly 13 digits';
          }
        }
        if (!formData.identificationType) newErrors.identificationType = 'Please select identification type';
        break;
      case 2:
        if (formData.serviceCategories.length === 0) newErrors.serviceCategories = 'Please select at least one service category';
        if (!formData.primaryService) newErrors.primaryService = 'Please specify your primary service';
        if (!formData.experience) newErrors.experience = 'Please specify your experience level';
        if (!formData.hourlyRate) newErrors.hourlyRate = 'Please provide your hourly rate';
        break;
      case 3:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.province) newErrors.province = 'Province is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.serviceRadius) newErrors.serviceRadius = 'Please specify your service radius';
        break;
      case 4:
        if (!formData.vatRegistered) newErrors.vatRegistered = 'Please specify VAT registration status';
        if (formData.vatRegistered === 'yes' && !formData.vatNumber) {
          newErrors.vatNumber = 'VAT number is required';
        }
        break;
      case 5:
        // Portfolio step is mostly optional but we can add validations if needed
        break;
      case 6:
        if (!formData.motivation) newErrors.motivation = 'Please tell us why you want to join';
        if (!formData.howDidYouHear) newErrors.howDidYouHear = 'Please tell us how you heard about us';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        if (!formData.agreeToBackground) newErrors.agreeToBackground = 'You must agree to background check';
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
      console.log('Service provider application:', formData);
      setShowSuccessModal(true);
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
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ServicesStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
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
            setFormData={setFormData}
            provinces={provinces}
          />
        );
      case 4:
        return (
          <BusinessInfoStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      case 5:
        return (
          <PortfolioStep
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
          />
        </form>

        {/* Help Section */}
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