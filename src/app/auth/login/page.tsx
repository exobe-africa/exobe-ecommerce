"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginHeader, LoginForm, SignUpLink } from '../../../components/pages/auth/login';
import { BackToHomeLink, SocialButtons, AuthFooter } from '../../../components/common';
import { useUser } from '../../../context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
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
    
    // Mock login - in a real app, you'd validate credentials with your backend
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: formData.email,
      phone: '+27 11 123 4567',
      joinDate: '2024-01-15',
      avatar: null,
      totalOrders: 12,
      totalSpent: 15750.00,
      loyaltyPoints: 1575
    };

    const mockAddresses = [
      { 
        id: 1, 
        type: 'home', 
        name: 'Home Address', 
        street: '123 Main Street', 
        city: 'Johannesburg', 
        province: 'Gauteng', 
        postalCode: '2001', 
        isDefault: true 
      },
      { 
        id: 2, 
        type: 'work', 
        name: 'Work Address', 
        street: '456 Business Ave', 
        city: 'Sandton', 
        province: 'Gauteng', 
        postalCode: '2146', 
        isDefault: false 
      }
    ];

    login(mockUser, mockAddresses);
    
    // Redirect to dashboard or previous page
    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
    router.push(returnUrl || '/dashboard');
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
