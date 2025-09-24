import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface ResetPasswordFormProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  email?: string | null;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  email 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="px-8 py-8">
      {email && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-[#4A4A4A]">
            Resetting password for: <span className="font-semibold text-[#000000]">{email}</span>
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
    </div>
  );
};

export default ResetPasswordForm;
