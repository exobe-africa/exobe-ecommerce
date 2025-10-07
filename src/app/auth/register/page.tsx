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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
