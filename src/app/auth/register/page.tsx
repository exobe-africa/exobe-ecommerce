"use client";

import { useState } from 'react';
import { RegisterHeader, RegisterForm, PasswordRequirements, TermsAndNewsletter, SignInLink } from '../../../components/pages/auth/register';
import { BackToHomeLink, SocialButtons, AuthFooter } from '../../../components/common';
export default function RegisterPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
  };

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
