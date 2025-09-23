"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const token = searchParams?.get('token');
  const email = searchParams?.get('email');

  useEffect(() => {
    // In a real app, validate the token here
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <Link href="/" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to eXobe
          </Link>

          {/* Invalid Token Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-8 text-center">
              <AlertCircle className="h-16 w-16 text-white mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Invalid Link</h1>
              <p className="text-red-100">This password reset link is not valid</p>
            </div>

            {/* Content */}
            <div className="px-8 py-8 text-center">
              <div className="mb-8">
                <p className="text-[#4A4A4A] mb-4">
                  This password reset link is either invalid or has expired. Password reset links are only valid for 24 hours.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href="/auth/forgot-password">
                  <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors">
                    Request New Reset Link
                  </button>
                </Link>
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

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-8 text-center">
              <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Password Reset</h1>
              <p className="text-green-100">Your password has been successfully reset</p>
            </div>

            {/* Content */}
            <div className="px-8 py-8 text-center">
              <div className="mb-8">
                <p className="text-[#4A4A4A] mb-4">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
              </div>

              {/* Actions */}
              <Link href="/auth/login">
                <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Sign In Now
                </button>
              </Link>
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

  // Reset password form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link href="/auth/login" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>

        {/* Reset Password Card */}
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
            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-red-100">Enter your new password</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {email && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-[#4A4A4A]">
                  Resetting password for: <span className="font-semibold text-[#000000]">{email}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#000000] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-500"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#4A4A4A]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#4A4A4A]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#000000] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-500"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-[#4A4A4A]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#4A4A4A]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-[#000000] mb-2">Password Requirements:</p>
                <ul className="text-xs text-[#4A4A4A] space-y-1">
                  <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{formData.password.length >= 8 ? '✓' : '•'}</span>
                    At least 8 characters long
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? '✓' : '•'}</span>
                    Contains uppercase and lowercase letters
                  </li>
                  <li className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/\d/.test(formData.password) ? '✓' : '•'}</span>
                    Contains at least one number
                  </li>
                  <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✓' : '•'}</span>
                    Contains at least one special character
                  </li>
                </ul>
              </div>

              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className={`text-sm flex items-center ${
                  formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="mr-2">
                    {formData.password === formData.confirmPassword ? '✓' : '✗'}
                  </span>
                  {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !formData.password || 
                  !formData.confirmPassword || 
                  formData.password !== formData.confirmPassword ||
                  formData.password.length < 8
                }
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  formData.password && 
                  formData.confirmPassword && 
                  formData.password === formData.confirmPassword &&
                  formData.password.length >= 8
                    ? 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reset Password
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-blue-800">Security Tip</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Choose a strong password that you don't use on other websites. Consider using a password manager.
                  </p>
                </div>
              </div>
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
