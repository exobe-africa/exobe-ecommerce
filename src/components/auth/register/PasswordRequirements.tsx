const PasswordRequirements: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm font-semibold text-[#000000] mb-2">Password Requirements:</p>
      <ul className="text-xs text-[#4A4A4A] space-y-1">
        <li>• At least 8 characters long</li>
        <li>• Contains uppercase and lowercase letters</li>
        <li>• Contains at least one number</li>
        <li>• Contains at least one special character</li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
