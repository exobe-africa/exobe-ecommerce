"use client";

import { useEffect, useState } from 'react';
import { RegisterHeader, RegisterForm, PasswordRequirements, TermsAndNewsletter, SignInLink } from '../../../components/pages/auth/register';
import { BackToHomeLink, SocialButtons, AuthFooter } from '../../../components/common';
import { useAuthStore } from '../../../store/auth';
import { useToast } from '../../../context/ToastContext';
import { getUserFriendlyErrorMessage } from '../../../lib/utils/errorMessages';
export default function RegisterPage() {
  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear field error on change
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
    // Clear phone error on change
    if (validationErrors.phone) {
      setValidationErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
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
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+27\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid South African phone number';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      clearError();
      await register({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        agreeToTerms: formData.agreeToTerms,
        subscribeNewsletter: formData.subscribeNewsletter,
      });
      showSuccess('Account created successfully! Welcome to eXobe');
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      const friendlyMessage = getUserFriendlyErrorMessage(err?.message || error || 'Registration failed');
      showError(friendlyMessage);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.replace('/dashboard');
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <BackToHomeLink />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <RegisterHeader />

          <div className="px-8 py-8">
            <RegisterForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onPhoneChange={handlePhoneChange}
              isLoading={isLoading}
              errors={validationErrors}
            />

            <PasswordRequirements />

            <TermsAndNewsletter
              formData={formData}
              onInputChange={handleInputChange}
            />

            <SocialButtons />

            <SignInLink />
          </div>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
