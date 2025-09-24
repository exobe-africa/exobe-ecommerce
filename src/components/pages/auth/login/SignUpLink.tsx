import Link from 'next/link';

const SignUpLink: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-[#4A4A4A]">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-[#C8102E] hover:text-[#A00E26] font-semibold transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignUpLink;
