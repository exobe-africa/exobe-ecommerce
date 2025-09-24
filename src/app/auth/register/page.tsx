"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Checkbox, PhoneInput } from '../../../components';
import { GoogleIcon, FacebookIcon } from '../../../components/icons';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to eXobe
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
            <h1 className="text-2xl font-bold text-white mb-2">Join eXobe</h1>
            <p className="text-red-100">Create your account and start shopping</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#000000] mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-500"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-[#000000] mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors bg-white text-[#000000] placeholder-gray-500"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <PhoneInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                label="Phone Number"
                required
              />

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
                    placeholder="Create a strong password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#000000] mb-2">
                  Confirm Password
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
                    placeholder="Confirm your password"
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

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-[#000000] mb-2">Password Requirements:</p>
                <ul className="text-xs text-[#4A4A4A] space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Contains at least one special character</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked }))}
                    required
                    label={
                      <span className="text-sm leading-relaxed">
                        I agree to the{' '}
                        <Link href="/terms-and-conditions" className="text-[#C8102E] hover:text-[#A00E26] font-semibold underline">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy-policy" className="text-[#C8102E] hover:text-[#A00E26] font-semibold underline">
                          Privacy Policy
                        </Link>
                      </span>
                    }
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <Checkbox
                    id="subscribeNewsletter"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={(checked) => setFormData(prev => ({ ...prev, subscribeNewsletter: checked }))}
                    label="Subscribe to our newsletter for exclusive offers and updates"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeToTerms}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  formData.agreeToTerms
                    ? 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-[#4A4A4A] bg-white">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Registration */}
            <div className="space-y-3">
              <button className="w-full bg-white border-2 border-gray-300 text-[#4A4A4A] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <GoogleIcon className="w-5 h-5 mr-3" />
                Sign up with Google
              </button>
              <button className="w-full bg-[#1877F2] text-white py-3 rounded-lg font-semibold hover:bg-[#166FE5] transition-colors flex items-center justify-center">
                <FacebookIcon className="w-5 h-5 mr-3" />
                Sign up with Facebook
              </button>
            </div>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-[#4A4A4A]">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-[#C8102E] hover:text-[#A00E26] font-semibold transition-colors">
                  Sign in
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
