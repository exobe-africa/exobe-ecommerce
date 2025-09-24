"use client";

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  email: string;
  onResendEmail: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  email,
  onResendEmail
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-8 text-center">
        <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
        <p className="text-green-100">We've sent you a password reset link</p>
      </div>

      <div className="px-8 py-8 text-center">
        <div className="mb-6">
          <p className="text-[#4A4A4A] mb-4">
            We've sent a password reset link to:
          </p>
          <p className="font-semibold text-[#000000] bg-gray-50 py-2 px-4 rounded-lg">
            {email}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-sm text-[#4A4A4A] mb-4">
            Click the link in the email to reset your password. If you don't see the email, check your spam folder.
          </p>
          <p className="text-xs text-[#4A4A4A]">
            The link will expire in 24 hours for security reasons.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onResendEmail}
            className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors"
          >
            Resend Email
          </button>
          <Link href="/auth/login">
            <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
