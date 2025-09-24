import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackToHomeLink: React.FC = () => {
  return (
    <Link href="/" className="inline-flex items-center text-[#4A4A4A] hover:text-[#C8102E] transition-colors mb-8">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to eXobe
    </Link>
  );
};

export default BackToHomeLink;
