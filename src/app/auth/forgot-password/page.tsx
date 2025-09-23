"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Forgot password functionality will be implemented later
    console.log('Password reset request for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          {/* Back to Login */}
          <Link href="/auth/login" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-8 text-center">
              <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
              <p className="text-green-100">We've sent you a password reset link</p>
            </div>

            {/* Content */}
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

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsSubmitted(false)}
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

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-[#4A4A4A]">
            <p>© 2025 eXobe. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link href="/auth/login" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] px-8 py-8 text-center">
            <Link href="/">
              <Image
                src="/eXobe Main Logo - Red & Black.png"
                alt="eXobe"
                width={80}
                height={80}
                className="h-16 w-16 object-contain bg-white rounded-lg p-2 mx-auto mb-4"
              />
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-red-100">No worries, we'll help you reset it</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <p className="text-[#4A4A4A] text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#000000] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Send Reset Link
              </button>
            </form>

            {/* Additional Help */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-blue-800">Need more help?</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    If you're still having trouble, contact our support team at{' '}
                    <a href="mailto:support@exobe.africa" className="font-medium underline">
                      support@exobe.africa
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-[#4A4A4A]">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-[#C8102E] hover:text-[#A00E26] font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#4A4A4A]">
          <p>© 2025 eXobe. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-[#C8102E] transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#C8102E] transition-colors">Terms</Link>
            <Link href="/help-center" className="hover:text-[#C8102E] transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
