"use client";

import { useState } from 'react';
import {
  ForgotPasswordForm,
  SuccessMessage,
} from '../../../components/auth/forgot-password';
import { AuthFooter, BackToLoginLink } from '../../../components';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <BackToLoginLink />
          <SuccessMessage
            email={email}
            onResendEmail={() => setIsSubmitted(false)}
          />
          <AuthFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <BackToLoginLink />
        <ForgotPasswordForm
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
        />
        <AuthFooter />
      </div>
    </div>
  );
}
