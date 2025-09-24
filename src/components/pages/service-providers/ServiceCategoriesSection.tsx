"use client";

interface ServiceCategory {
  icon: React.ElementType;
  name: string;
  description: string;
}

interface ServiceCategoriesSectionProps {
  serviceCategories: ServiceCategory[];
}

const ServiceCategoriesSection: React.FC<ServiceCategoriesSectionProps> = ({ serviceCategories }) => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            Service Categories
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Whatever your expertise, there's a place for you on eXobe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mb-4">
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#000000] mb-2">{category.name}</h3>
              <p className="text-[#4A4A4A] text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesSection;
