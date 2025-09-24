import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { AuthFooter } from '../../index';

const SuccessState: React.FC = () => {
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

        <AuthFooter />
      </div>
    </div>
  );
};

export default SuccessState;
