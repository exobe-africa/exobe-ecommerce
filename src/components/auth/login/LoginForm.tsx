import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Checkbox } from '../../index';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onInputChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

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

      <div className="flex items-center justify-between">
        <Checkbox
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={(checked) => onInputChange({ target: { name: 'rememberMe', type: 'checkbox', checked } } as React.ChangeEvent<HTMLInputElement>)}
          label="Remember me"
          size="sm"
        />
        <Link href="/auth/forgot-password" className="text-sm text-[#C8102E] hover:text-[#A00E26] font-medium transition-colors">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
