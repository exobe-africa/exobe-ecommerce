"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Checkbox } from '../../../components';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login functionality will be implemented later
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to eXobe
        </Link>

        {/* Login Card */}
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
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-red-100">Sign in to your eXobe account</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#000000] mb-2">
                  Password
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
                  label="Remember me"
                  size="sm"
                />
                <Link href="/auth/forgot-password" className="text-sm text-[#C8102E] hover:text-[#A00E26] font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-[#4A4A4A] bg-white">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full bg-white border-2 border-gray-300 text-[#4A4A4A] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button className="w-full bg-[#1877F2] text-white py-3 rounded-lg font-semibold hover:bg-[#166FE5] transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
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
