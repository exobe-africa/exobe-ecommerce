"use client";

import Link from 'next/link';
import { Mail } from 'lucide-react';

interface EmailConfirmationNoticeProps {
  customerEmail: string;
}

const EmailConfirmationNotice: React.FC<EmailConfirmationNoticeProps> = ({ customerEmail }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
      <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Confirmation Email Sent</h3>
      <p className="text-blue-700 mb-4">
        We've sent a detailed order confirmation to <span className="font-semibold">{customerEmail}</span>
      </p>
      <p className="text-sm text-blue-600">
        Don't see it? Check your spam folder or <Link href="/help-center" className="underline hover:no-underline">contact support</Link>
      </p>
    </div>
  );
};

export default EmailConfirmationNotice;
