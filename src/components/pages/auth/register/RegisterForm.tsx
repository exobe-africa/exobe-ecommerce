import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { PhoneInput } from '../../../common/index';
import { Spinner } from '../../../common/Spinner';

interface RegisterFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
    subscribeNewsletter: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPhoneChange: (value: string) => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  onPhoneChange,
  isLoading = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
        onChange={onPhoneChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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

      <button
        type="submit"
        disabled={!formData.agreeToTerms || isLoading}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${
          formData.agreeToTerms && !isLoading
            ? 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
