"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResetPasswordHeader, ResetPasswordForm, PasswordRequirements, SecurityTip, InvalidTokenState, SuccessState } from '../../../components/pages/auth/reset-password';
import { BackToLoginLink } from '../../../components/common';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const token = searchParams?.get('token');
  const email = searchParams?.get('email');

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
    }
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Reset password functionality will be implemented later
    console.log('Password reset for:', { email, token, password: formData.password });
    setIsSuccess(true);
  };

  // Invalid token state
  if (!isValidToken) {
    return <InvalidTokenState />;
  }

  // Success state
  if (isSuccess) {
    return <SuccessState />;
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <BackToLoginLink />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <ResetPasswordHeader />

          <ResetPasswordForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            email={email}
          />

          <PasswordRequirements password={formData.password} />

          <SecurityTip />
        </div>
      </div>
    </div>
  );
}
