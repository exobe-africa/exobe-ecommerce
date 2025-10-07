"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginHeader, LoginForm, SignUpLink } from '../../../components/pages/auth/login';
import { BackToHomeLink, SocialButtons, AuthFooter } from '../../../components/common';
import { useAuthStore } from '../../../store/auth';
import { useToast } from '../../../context/ToastContext';
import { getUserFriendlyErrorMessage } from '../../../lib/utils/errorMessages';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      clearError();
      await login({ email: formData.email, password: formData.password });
      showSuccess('Welcome back! You have successfully logged in');
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
      router.push(returnUrl || '/dashboard');
    } catch (err: any) {
      const friendlyMessage = getUserFriendlyErrorMessage(err?.message || error || 'Login failed');
      showError(friendlyMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <BackToHomeLink />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <LoginHeader />

          <div className="px-8 py-8">
            <LoginForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <SocialButtons />

            <SignUpLink />
          </div>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
