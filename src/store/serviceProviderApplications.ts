"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { APPLY_SERVICE_PROVIDER } from "../lib/api/applications";

export interface ServiceProviderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  idNumber: string;
  identificationType: string;
  serviceCategories: string[];
  primaryService: string;
  experience: string;
  qualifications: string;
  portfolio: string;
  hourlyRate: string;
  availability: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  serviceRadius: string;
  transportMode: string;
  businessName: string;
  businessRegistration: string;
  vatRegistered: string;
  vatNumber: string;
  bankDetails: string;
  emergencyContact: string;
  workSamples: string;
  clientReferences: string;
  certifications: string;
  insurance: string;
  backgroundCheck: string;
  motivation: string;
  goals: string;
  howDidYouHear: string;
  agreeToTerms: boolean;
  agreeToBackground: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

interface ServiceProviderApplicationState {
  formData: ServiceProviderFormData;

  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: ValidationErrors;
  validationErrors: ValidationErrors;

  provinces: string[];
  serviceCategories: string[];
  identificationTypes: string[];

  setFormData: (data: Partial<ServiceProviderFormData>) => void;
  setErrors: (errors: ValidationErrors) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  resetForm: () => void;

  submitApplication: (data: ServiceProviderFormData) => Promise<{ success: boolean; error?: string }>;

  validateStep: (step: number) => ValidationErrors;
  validateForm: (data: ServiceProviderFormData) => ValidationErrors;
}

export const useServiceProviderApplicationStore = create<ServiceProviderApplicationState>((set, get) => ({
  formData: {
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
  },

  isSubmitting: false,
  isSubmitted: false,
  errors: {},
  validationErrors: {},

  provinces: [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ],

  serviceCategories: [
    "Home Maintenance", "Home Improvement", "Beauty & Wellness", "Photography",
    "Tech Support", "Automotive", "Food & Catering", "Education & Tutoring",
    "Fitness & Health", "Childcare", "Moving & Delivery", "Entertainment",
    "Cleaning Services", "Pet Care", "Event Planning", "Other"
  ],

  identificationTypes: [
    'South African ID',
    'Passport',
    'Driver\'s License'
  ],

  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  setErrors: (errors) => set({ errors }),

  setValidationErrors: (errors) => set({ errors, validationErrors: errors }),

  clearValidationErrors: () => set({ errors: {}, validationErrors: {} }),

  resetForm: () => set({
    formData: {
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
    },
    isSubmitted: false,
    errors: {},
    validationErrors: {}
  }),

  validateStep: (step) => {
    const { formData } = get();
    const errors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          errors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
          errors.firstName = 'First name must be at least 2 characters';
        }

        if (!formData.lastName.trim()) {
          errors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
          errors.lastName = 'Last name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!/^\+27\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
          errors.phone = 'Please enter a valid South African phone number';
        }

        if (!formData.idNumber.trim()) {
          errors.idNumber = 'ID number is required';
        } else if (!/^\d{13}$/.test(formData.idNumber.replace(/\s/g, ''))) {
          errors.idNumber = 'ID number must be exactly 13 digits';
        }

        if (!formData.identificationType) {
          errors.identificationType = 'Please select identification type';
        }
        break;

      case 2:
        if (formData.serviceCategories.length === 0) {
          errors.serviceCategories = 'Please select at least one service category';
        }

        if (!formData.primaryService.trim()) {
          errors.primaryService = 'Please specify your primary service';
        }

        if (!formData.experience.trim()) {
          errors.experience = 'Please specify your experience level';
        }

        if (!formData.hourlyRate.trim()) {
          errors.hourlyRate = 'Please provide your hourly rate';
        }
        break;

      case 3:
        if (!formData.address.trim()) {
          errors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
          errors.city = 'City is required';
        }

        if (!formData.province.trim()) {
          errors.province = 'Province is required';
        }

        if (!formData.postalCode.trim()) {
          errors.postalCode = 'Postal code is required';
        } else if (!/^\d{4}$/.test(formData.postalCode.trim())) {
          errors.postalCode = 'Postal code must be 4 digits';
        }

        if (!formData.serviceRadius.trim()) {
          errors.serviceRadius = 'Please specify your service radius';
        }

        if (!formData.transportMode.trim()) {
          errors.transportMode = 'Please specify your transport mode';
        }
        break;

      case 4:
        if (formData.vatRegistered === 'yes' && !formData.vatNumber.trim()) {
          errors.vatNumber = 'VAT number is required when VAT registered';
        }
        break;

      case 5:
        break;

      case 6:
        if (!formData.motivation.trim()) {
          errors.motivation = 'Please tell us why you want to join';
        }

        if (!formData.howDidYouHear.trim()) {
          errors.howDidYouHear = 'Please tell us how you heard about us';
        }

        if (!formData.agreeToTerms) {
          errors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        if (!formData.agreeToBackground) {
          errors.agreeToBackground = 'You must agree to background check';
        }
        break;
    }

    return errors;
  },

  validateForm: (data) => {
    const errors: ValidationErrors = {};

    for (let step = 1; step <= 6; step++) {
      const stepErrors = get().validateStep(step);
      Object.assign(errors, stepErrors);
    }

    return errors;
  },

  submitApplication: async (data) => {
    set({ isSubmitting: true, errors: {}, validationErrors: {} });

    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: APPLY_SERVICE_PROVIDER,
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth || undefined,
            idNumber: data.idNumber,
            identificationType: data.identificationType,
            serviceCategories: data.serviceCategories,
            primaryService: data.primaryService,
            experience: data.experience,
            qualifications: data.qualifications || undefined,
            portfolio: data.portfolio || undefined,
            hourlyRate: data.hourlyRate,
            availability: data.availability,
            address: data.address,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            serviceRadius: data.serviceRadius,
            transportMode: data.transportMode,
            businessName: data.businessName || undefined,
            businessRegistration: data.businessRegistration || undefined,
            vatRegistered: data.vatRegistered || undefined,
            vatNumber: data.vatNumber || undefined,
            bankDetails: data.bankDetails || undefined,
            emergencyContact: data.emergencyContact || undefined,
            workSamples: data.workSamples || undefined,
            clientReferences: data.clientReferences || undefined,
            certifications: data.certifications || undefined,
            insurance: data.insurance || undefined,
            backgroundCheck: data.backgroundCheck || undefined,
            motivation: data.motivation,
            goals: data.goals || undefined,
            howDidYouHear: data.howDidYouHear,
            agreeToTerms: data.agreeToTerms,
            agreeToBackground: data.agreeToBackground,
          }
        }
      });

      set({ isSubmitting: false, isSubmitted: true });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to submit application';
      set({ isSubmitting: false });
      return { success: false, error: message };
    }
  }
}));
