"use client";

const defaultIssues = [
  {
    id: 'email-exists',
    title: 'Email Already Exists',
    description: 'If you get this error, you may already have an account. Try using the "Forgot Password" feature to reset your password.'
  },
  {
    id: 'verification-not-received',
    title: 'Verification Email Not Received',
    description: 'Check your spam folder first. If still not found, contact support to resend the verification email.'
  },
  {
    id: 'password-weak',
    title: 'Password Too Weak',
    description: 'Make sure your password meets all requirements listed above. Use a mix of letters, numbers, and symbols.'
  }
];

interface TroubleshootingIssue {
  id: string;
  title: string;
  description: string;
}

interface AccountTroubleshootingProps {
  title?: string;
  issues?: TroubleshootingIssue[];
}

const AccountTroubleshooting: React.FC<AccountTroubleshootingProps> = ({
  title = "Common Issues",
  issues = defaultIssues
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-4">
        {issues.map((issue) => (
          <div key={issue.id} className="p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-[#000000] mb-2">{issue.title}</h3>
            <p className="text-[#4A4A4A] text-sm">
              {issue.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountTroubleshooting;
