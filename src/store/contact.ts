"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { CONTACT_SEND_MESSAGE } from "../lib/api/contact";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface Department {
  name: string;
  email: string;
  icon: any;
}

interface ContactState {
  // Form data
  formData: ContactFormData;

  // UI state
  isSubmitting: boolean;
  isSubmitted: boolean;
  validationErrors: ValidationErrors;

  // Static data
  departments: Department[];

  // Actions
  setFormData: (data: Partial<ContactFormData>) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  resetForm: () => void;
  validateAndSetErrors: (data: ContactFormData) => void;

  // GraphQL operations
  sendMessage: (data: ContactFormData) => Promise<{ success: boolean; error?: string }>;

  // Validation
  validateForm: (data: ContactFormData) => ValidationErrors;
}

export const useContactStore = create<ContactState>((set, get) => ({
  // Initial state
  formData: {
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: 'support@exobe.africa',
    message: ''
  },

  isSubmitting: false,
  isSubmitted: false,
  validationErrors: {},

  departments: [
    { name: 'Sales & Product Inquiries', email: 'sales@exobe.africa', icon: 'Building2' },
    { name: 'Customer Support', email: 'support@exobe.africa', icon: 'Headphones' },
    { name: 'Returns & Exchanges', email: 'returns@exobe.africa', icon: 'Shield' },
    { name: 'Corporate & Partnerships', email: 'corporate@exobe.africa', icon: 'Users' },
    { name: 'Media & Press', email: 'media@exobe.africa', icon: 'Globe' },
    { name: 'Careers', email: 'careers@exobe.africa', icon: 'Award' }
  ],

  // Setters
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  setValidationErrors: (errors) => set({ validationErrors: errors }),

  clearValidationErrors: () => set({ validationErrors: {} }),

  resetForm: () => set({
    formData: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      department: 'support@exobe.africa',
      message: ''
    },
    isSubmitted: false,
    validationErrors: {}
  }),

  validateAndSetErrors: (data) => {
    const errors = get().validateForm(data);
    set({ validationErrors: errors });
  },

  // Validation
  validateForm: (data) => {
    const errors: ValidationErrors = {};

    if (!data.name.trim()) {
      errors.name = 'Full name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Full name must be at least 2 characters';
    }

    if (!data.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (data.phone && !/^\+27\s?\d{2}\s?\d{3}\s?\d{4}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid South African phone number';
    }

    if (!data.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  },

  // GraphQL operations
  sendMessage: async (data) => {
    set({ isSubmitting: true, validationErrors: {} });

    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: CONTACT_SEND_MESSAGE,
        variables: {
          input: {
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            subject: data.subject,
            message: data.message,
            department: data.department,
          }
        }
      });

      set({ isSubmitting: false, isSubmitted: true });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to send message';
      set({ isSubmitting: false });
      return { success: false, error: message };
    }
  }
}));
