"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackToLoginLink: React.FC = () => {
  return (
    <Link href="/auth/login" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Login
    </Link>
  );
};

export default BackToLoginLink;
