export interface ServiceProviderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  idNumber: string;
  identificationType: string;
  serviceCategories: string[];
  primaryService: string;
  experience: string;
  qualifications: string;
  portfolio: string;
  hourlyRate: string;
  availability: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  serviceRadius: string;
  transportMode: string;
  businessName: string;
  businessRegistration: string;
  vatRegistered: string;
  vatNumber: string;
  bankDetails: string;
  emergencyContact: string;
  workSamples: string;
  clientReferences: string;
  certifications: string;
  insurance: string;
  backgroundCheck: string;
  motivation: string;
  goals: string;
  howDidYouHear: string;
  agreeToTerms: boolean;
  agreeToBackground: boolean;
}

export interface StepData {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
}
