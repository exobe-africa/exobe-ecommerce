import Link from 'next/link';

const SignInLink: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-[#4A4A4A]">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[#C8102E] hover:text-[#A00E26] font-semibold transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignInLink;
