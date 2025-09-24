"use client";

import { Building2, Headphones, Shield, Users, Globe, Award } from 'lucide-react';

const departments = [
  { name: 'Sales & Product Inquiries', email: 'sales@exobe.africa', icon: Building2 },
  { name: 'Customer Support', email: 'support@exobe.africa', icon: Headphones },
  { name: 'Returns & Exchanges', email: 'returns@exobe.africa', icon: Shield },
  { name: 'Corporate & Partnerships', email: 'corporate@exobe.africa', icon: Users },
  { name: 'Media & Press', email: 'media@exobe.africa', icon: Globe },
  { name: 'Careers', email: 'careers@exobe.africa', icon: Award }
];

const DepartmentDirectorySection = () => {
  return (
    <section className="mb-20">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">Department Directory</h2>
          <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
            Connect directly with the right team for faster, more specialised assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => {
            const IconComponent = dept.icon;
            return (
              <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#F6E2E0] rounded-lg flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                    <IconComponent className="h-6 w-6 text-[#C8102E] group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#000000] mb-1">{dept.name}</h3>
                    <a href={`mailto:${dept.email}`} className="text-[#C8102E] text-sm hover:underline">
                      {dept.email}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentDirectorySection;
