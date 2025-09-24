"use client";

import { AlertCircle } from 'lucide-react';

const defaultIssues = [
  {
    id: 'declined',
    title: 'Payment Declined',
    description: 'If your payment is declined, try these solutions:',
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    titleColor: 'text-yellow-800',
    iconColor: 'text-yellow-500',
    solutions: [
      'Check your card details are correct',
      'Ensure you have sufficient funds',
      'Contact your bank to authorise online purchases',
      'Try a different payment method'
    ]
  },
  {
    id: 'pending',
    title: 'Payment Pending',
    description: 'If your payment shows as pending:',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    titleColor: 'text-blue-800',
    iconColor: 'text-blue-500',
    solutions: [
      'EFT payments can take 24-48 hours to clear',
      'Check your bank account for deductions',
      'Contact us if payment doesn\'t clear within 3 business days'
    ]
  },
  {
    id: 'unauthorised',
    title: 'Unauthorised Transactions',
    description: 'If you notice unauthorised charges:',
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    titleColor: 'text-red-800',
    iconColor: 'text-red-500',
    solutions: [
      'Contact us immediately at +27 11 123 4567',
      'Notify your bank or card issuer',
      'We\'ll investigate and resolve the issue quickly'
    ]
  }
];

interface PaymentIssue {
  id: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  titleColor: string;
  iconColor: string;
  solutions: string[];
}

interface PaymentIssuesProps {
  title?: string;
  issues?: PaymentIssue[];
}

const PaymentIssues: React.FC<PaymentIssuesProps> = ({
  title = "Common Payment Issues",
  issues = defaultIssues
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-6">
        {issues.map((issue) => (
          <div key={issue.id} className={`p-6 rounded-lg border ${issue.borderColor} ${issue.bgColor}`}>
            <div className="flex items-center space-x-3 mb-3">
              <AlertCircle className={`h-6 w-6 ${issue.iconColor}`} />
              <h3 className={`font-semibold ${issue.titleColor}`}>{issue.title}</h3>
            </div>
            <p className={`${issue.textColor} mb-3`}>{issue.description}</p>
            <ul className={`space-y-1 ${issue.textColor}`}>
              {issue.solutions.map((solution, index) => (
                <li key={index}>• {solution}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentIssues;
