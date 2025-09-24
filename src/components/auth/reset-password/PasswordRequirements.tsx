interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm font-semibold text-[#000000] mb-2">Password Requirements:</p>
      <ul className="text-xs text-[#4A4A4A] space-y-1">
        <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
          <span className="mr-2">{password.length >= 8 ? '✓' : '•'}</span>
          At least 8 characters long
        </li>
        <li className={`flex items-center ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-600' : ''}`}>
          <span className="mr-2">{/[A-Z]/.test(password) && /[a-z]/.test(password) ? '✓' : '•'}</span>
          Contains uppercase and lowercase letters
        </li>
        <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : ''}`}>
          <span className="mr-2">{/\d/.test(password) ? '✓' : '•'}</span>
          Contains at least one number
        </li>
        <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : ''}`}>
          <span className="mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '•'}</span>
          Contains at least one special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
