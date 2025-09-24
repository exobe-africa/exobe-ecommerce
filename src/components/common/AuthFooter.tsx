"use client";

import Link from 'next/link';

const AuthFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="mt-8 text-center text-sm text-[#4A4A4A]">
      <p>© {currentYear} eXobe. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <Link href="/privacy-policy" className="hover:text-[#C8102E] transition-colors">Privacy</Link>
        <Link href="/terms-and-conditions" className="hover:text-[#C8102E] transition-colors">Terms</Link>
        <Link href="/help-center" className="hover:text-[#C8102E] transition-colors">Help</Link>
      </div>
    </div>
  );
};

export default AuthFooter;
