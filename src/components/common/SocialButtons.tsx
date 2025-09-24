import { GoogleIcon, FacebookIcon } from '../pages/icons';

const SocialButtons: React.FC = () => {
  return (
    <>
      <div className="my-8 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-[#4A4A4A] bg-white">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-white border-2 border-gray-300 text-[#4A4A4A] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
          <GoogleIcon className="w-5 h-5 mr-3" />
          Continue with Google
        </button>
        <button className="w-full bg-[#1877F2] text-white py-3 rounded-lg font-semibold hover:bg-[#166FE5] transition-colors flex items-center justify-center">
          <FacebookIcon className="w-5 h-5 mr-3" />
          Continue with Facebook
        </button>
      </div>
    </>
  );
};

export default SocialButtons;
