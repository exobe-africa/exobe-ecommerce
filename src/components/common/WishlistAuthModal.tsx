"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Heart, User, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useWishlistStore } from '../../store/wishlist';
import { useToast } from '../../context/ToastContext';

interface WishlistAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

type AuthMode = 'login' | 'register';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const WishlistAuthModal: React.FC<WishlistAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { login, register, error } = useAuthStore();
  const { handleAuthSuccess } = useWishlistStore();

  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginErrors, setLoginErrors] = useState<Partial<LoginFormData>>({});
  const [registerErrors, setRegisterErrors] = useState<Partial<RegisterFormData>>({});

  if (!isOpen) return null;

  const validateLoginForm = (): boolean => {
    const errors: Partial<LoginFormData> = {};

    if (!loginData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!loginData.password.trim()) {
      errors.password = 'Password is required';
    }

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const errors: Partial<RegisterFormData> = {};

    if (!registerData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!registerData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsLoading(true);

    try {
      await login(loginData);
      
      showSuccess('Welcome back!');
      handleAuthSuccess();
      onAuthSuccess?.();
      onClose();
      router.push('/wishlist');
    } catch (error: any) {
      showError(error?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm()) return;

    setIsLoading(true);

    try {
      await register({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
        agreeToTerms: true,
        subscribeNewsletter: false,
      });

      // If we reach here, registration was successful
      showSuccess('Account created successfully!');
      handleAuthSuccess();
      onAuthSuccess?.();
      onClose();
      router.push('/wishlist');
    } catch (error: any) {
      showError(error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setLoginData({ email: '', password: '' });
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setLoginErrors({});
    setRegisterErrors({});
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const switchToRegister = () => {
    resetForms();
    setMode('register');
  };

  const switchToLogin = () => {
    resetForms();
    setMode('login');
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-[#C8102E]" />
            <h3 className="text-xl font-bold text-[#000000]">
              {mode === 'login' ? 'Sign In to Access Wishlist' : 'Create Account'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                      loginErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                      loginErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#C8102E] hover:bg-[#A00E26] text-white'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <p className="text-[#4A4A4A]">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToRegister}
                    className="text-[#C8102E] hover:underline font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                        registerErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                  </div>
                  {registerErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{registerErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                      registerErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {registerErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{registerErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                        registerErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                  />
                </div>
                {registerErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                      registerErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="At least 6 characters"
                />
                {registerErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] text-[#000000] placeholder:text-gray-500 ${
                      registerErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                />
                {registerErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#C8102E] hover:bg-[#A00E26] text-white'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="text-center">
                <p className="text-[#4A4A4A]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-[#C8102E] hover:underline font-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistAuthModal;
