"use client";

import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

const officeLocations = [
  {
    city: 'Johannesburg',
    address: '123 Sandton Drive, Sandton City',
    postal: 'Sandton, 2196, South Africa',
    phone: '+27 11 123 4567',
    email: 'jhb@exobe.africa',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    isHeadquarters: true
  },
  {
    city: 'Cape Town',
    address: '456 Victoria & Alfred Waterfront',
    postal: 'Cape Town, 8001, South Africa',
    phone: '+27 21 987 6543',
    email: 'cpt@exobe.africa',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    isHeadquarters: false
  },
  {
    city: 'Durban',
    address: '789 Gateway Theatre of Shopping',
    postal: 'Umhlanga, 4319, South Africa',
    phone: '+27 31 555 7890',
    email: 'dbn@exobe.africa',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    isHeadquarters: false
  }
];

const OfficeLocationsSection = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#000000] mb-4">Visit Our Offices</h2>
        <p className="text-[#4A4A4A]">
          Meet us in person at one of our convenient locations across South Africa.
        </p>
      </div>

      {officeLocations.map((office, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#000000]">{office.city}</h3>
                {office.isHeadquarters && (
                  <span className="inline-block bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full">
                    HEADQUARTERS
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-[#4A4A4A] mt-0.5" />
              <div>
                <p className="text-[#000000] font-medium">{office.address}</p>
                <p className="text-[#4A4A4A] text-sm">{office.postal}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-[#4A4A4A]" />
              <a href={`tel:${office.phone}`} className="text-[#C8102E] font-medium hover:underline">
                {office.phone}
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-[#4A4A4A]" />
              <a href={`mailto:${office.email}`} className="text-[#C8102E] font-medium hover:underline">
                {office.email}
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-[#4A4A4A]" />
              <span className="text-[#4A4A4A]">{office.hours}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-[#C8102E] font-semibold hover:text-[#A00E26] transition-colors flex items-center">
              Get Directions
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficeLocationsSection;
