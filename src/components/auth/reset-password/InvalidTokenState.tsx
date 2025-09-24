import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { AuthFooter } from '../../index';

const InvalidTokenState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
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

        <AuthFooter />
      </div>
    </div>
  );
};

export default InvalidTokenState;
