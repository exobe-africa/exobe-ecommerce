import Link from 'next/link';
import Image from 'next/image';

const RegisterHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] px-8 py-8 text-center">
      <Link href="/">
        <Image
          src="/eXobe Main Logo - Red & Black.png"
          alt="eXobe"
          width={80}
          height={80}
          className="h-16 w-16 object-contain bg-white rounded-lg p-2 mx-auto mb-4"
        />
      </Link>
      <h1 className="text-2xl font-bold text-white mb-2">Join eXobe</h1>
      <p className="text-red-100">Create your account and start shopping</p>
    </div>
  );
};

export default RegisterHeader;
