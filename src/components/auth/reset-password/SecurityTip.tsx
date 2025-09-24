const SecurityTip: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-blue-800">Security Tip</h3>
          <p className="text-sm text-blue-700 mt-1">
            Choose a strong password that you don't use on other websites. Consider using a password manager.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityTip;
