"use client";

interface AccountIntroductionProps {
  title?: string;
  description?: string;
}

const AccountIntroduction: React.FC<AccountIntroductionProps> = ({
  title,
  description = "Creating an eXobe account is quick, easy, and gives you access to faster checkout, order tracking, wishlists, and exclusive member benefits."
}) => {
  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      )}
      <p className="text-lg text-[#4A4A4A] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default AccountIntroduction;
