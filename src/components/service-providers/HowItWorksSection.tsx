"use client";

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  howItWorks: HowItWorksStep[];
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ howItWorks }) => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Start earning in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connecting Line */}
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-1/2 z-0" />
              )}
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#C8102E] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-4">{step.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
