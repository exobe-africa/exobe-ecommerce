import {
  SellHeroSection,
  SellerTypesSection,
  BenefitsSection,
  HowItWorksSection,
  SuccessStoriesSection,
  PricingSection,
  CTASection
} from '../../components/pages/sell';

export default function SellOnExobePage() {
  const stats = [
    { number: "2M+", label: "Active Customers" },
    { number: "50K+", label: "Sellers" },
    { number: "R2B+", label: "Annual Sales" },
    { number: "99.8%", label: "Uptime" }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <SellHeroSection stats={stats} />
      <SellerTypesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <SuccessStoriesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
