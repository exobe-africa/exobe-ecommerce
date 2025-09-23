"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  MapPin,
  FileText,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  Upload,
  Store,
  Shield,
  Clock,
  Star,
  Award,
  Camera,
  DollarSign
} from 'lucide-react';
import { Navbar, Footer, PhoneInput, Checkbox, RadioButton, ApplicationSuccessModal, ApplicationHelpSection } from '../../../components';

export default function ServiceProviderApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idNumber: '',
    identificationType: '',
    
    // Step 2: Service Details
    serviceCategories: [] as string[],
    primaryService: '',
    experience: '',
    qualifications: '',
    portfolio: '',
    hourlyRate: '',
    availability: '',
    
    // Step 3: Location & Coverage
    address: '',
    city: '',
    province: '',
    postalCode: '',
    serviceRadius: '',
    transportMode: '',
    
    // Step 4: Professional Information
    businessName: '',
    businessRegistration: '',
    vatRegistered: '',
    vatNumber: '',
    bankDetails: '',
    emergencyContact: '',
    
    // Step 5: Portfolio & References
    workSamples: '',
    clientReferences: '',
    certifications: '',
    insurance: '',
    backgroundCheck: '',
    
    // Step 6: Final Details
    motivation: '',
    goals: '',
    howDidYouHear: '',
    agreeToTerms: false,
    agreeToBackground: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const steps = [
    { id: 1, name: 'Personal Info', icon: User, description: 'Tell us about yourself' },
    { id: 2, name: 'Services', icon: Briefcase, description: 'What services do you offer' },
    { id: 3, name: 'Location', icon: MapPin, description: 'Where do you operate' },
    { id: 4, name: 'Business Info', icon: FileText, description: 'Professional details' },
    { id: 5, name: 'Portfolio', icon: Award, description: 'Show your expertise' },
    { id: 6, name: 'Final Details', icon: CheckCircle, description: 'Complete your application' }
  ];

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const serviceCategories = [
    "Home Maintenance", "Home Improvement", "Beauty & Wellness", "Photography",
    "Tech Support", "Automotive", "Food & Catering", "Education & Tutoring",
    "Fitness & Health", "Childcare", "Moving & Delivery", "Entertainment",
    "Cleaning Services", "Pet Care", "Event Planning", "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    // Special handling for SA ID number - only allow digits
    if (name === 'idNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 13);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(category)
        ? prev.serviceCategories.filter(c => c !== category)
        : [...prev.serviceCategories, category]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.idNumber) {
          newErrors.idNumber = 'ID number is required';
        } else {
          const saIdRegex = /^\d{13}$/;
          if (!saIdRegex.test(formData.idNumber.replace(/\s/g, ''))) {
            newErrors.idNumber = 'ID number must be exactly 13 digits';
          }
        }
        if (!formData.identificationType) newErrors.identificationType = 'Please select identification type';
        break;
      case 2:
        if (formData.serviceCategories.length === 0) newErrors.serviceCategories = 'Please select at least one service category';
        if (!formData.primaryService) newErrors.primaryService = 'Please specify your primary service';
        if (!formData.experience) newErrors.experience = 'Please specify your experience level';
        if (!formData.hourlyRate) newErrors.hourlyRate = 'Please provide your hourly rate';
        break;
      case 3:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.province) newErrors.province = 'Province is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.serviceRadius) newErrors.serviceRadius = 'Please specify your service radius';
        break;
      case 4:
        if (!formData.vatRegistered) newErrors.vatRegistered = 'Please specify VAT registration status';
        if (formData.vatRegistered === 'yes' && !formData.vatNumber) {
          newErrors.vatNumber = 'VAT number is required';
        }
        break;
      case 5:
        // Portfolio step is mostly optional but we can add validations if needed
        break;
      case 6:
        if (!formData.motivation) newErrors.motivation = 'Please tell us why you want to join';
        if (!formData.howDidYouHear) newErrors.howDidYouHear = 'Please tell us how you heard about us';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        if (!formData.agreeToBackground) newErrors.agreeToBackground = 'You must agree to background check';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Service provider application:', formData);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/service-providers');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <User className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Personal Information</h2>
              <p className="text-[#4A4A4A] text-lg">Tell us about yourself</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  label="Mobile Phone *"
                  required
                  showIcon={false}
                  error={errors.phone}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  SA ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="e.g. 8001015009087 (13 digits)"
                  maxLength={13}
                  pattern="\d{13}"
                />
                <div className="text-xs text-[#4A4A4A] mt-1">
                  Enter your 13-digit South African ID number
                </div>
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Identification Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'sa-id', label: 'South African ID document' },
                    { value: 'passport', label: 'Passport' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`identificationType-${option.value}`}
                      name="identificationType"
                      value={option.value}
                      checked={formData.identificationType === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, identificationType: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.identificationType && <p className="text-red-500 text-sm mt-2">{errors.identificationType}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Briefcase className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Service Details</h2>
              <p className="text-[#4A4A4A] text-lg">What services do you offer</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Service Categories <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceCategories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.serviceCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                      />
                      <span className="ml-2 text-sm text-[#000000]">{category}</span>
                    </label>
                  ))}
                </div>
                {errors.serviceCategories && <p className="text-red-500 text-sm mt-2">{errors.serviceCategories}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Primary Service <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="primaryService"
                  value={formData.primaryService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="e.g. Residential Plumbing, Wedding Photography, etc."
                />
                {errors.primaryService && <p className="text-red-500 text-sm mt-1">{errors.primaryService}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'beginner', label: 'Beginner (0-1 years)' },
                    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
                    { value: 'experienced', label: 'Experienced (5-10 years)' },
                    { value: 'expert', label: 'Expert (10+ years)' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`experience-${option.value}`}
                      name="experience"
                      value={option.value}
                      checked={formData.experience === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                      label={option.label}
                      variant="default"
                      size="sm"
                      className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
                    />
                  ))}
                </div>
                {errors.experience && <p className="text-red-500 text-sm mt-2">{errors.experience}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Hourly Rate (ZAR) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                      placeholder="150"
                      min="50"
                      max="2000"
                    />
                  </div>
                  {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays only</option>
                    <option value="weekends">Weekends only</option>
                    <option value="flexible">Flexible schedule</option>
                    <option value="24-7">24/7 availability</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Qualifications & Certifications
                </label>
                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="List your relevant qualifications, certifications, training, etc."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Location & Coverage</h2>
              <p className="text-[#4A4A4A] text-lg">Where do you operate</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Postal Code"
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Service Radius <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: '5km', label: 'Within 5km of my location' },
                    { value: '15km', label: 'Within 15km of my location' },
                    { value: '30km', label: 'Within 30km of my location' },
                    { value: 'province', label: 'Anywhere in my province' },
                    { value: 'national', label: 'Nationwide (travel services)' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`serviceRadius-${option.value}`}
                      name="serviceRadius"
                      value={option.value}
                      checked={formData.serviceRadius === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, serviceRadius: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.serviceRadius && <p className="text-red-500 text-sm mt-2">{errors.serviceRadius}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Transportation Method
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'own-vehicle', label: 'Own vehicle' },
                    { value: 'public-transport', label: 'Public transport' },
                    { value: 'bicycle', label: 'Bicycle' },
                    { value: 'walking', label: 'Walking (local services only)' },
                    { value: 'client-location', label: 'Work at client location only' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`transportMode-${option.value}`}
                      name="transportMode"
                      value={option.value}
                      checked={formData.transportMode === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, transportMode: value }))}
                      label={option.label}
                      variant="default"
                      size="sm"
                      className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <FileText className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Professional Information</h2>
              <p className="text-[#4A4A4A] text-lg">Business and legal details</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Business/Trading Name (Optional)
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Enter your business name if applicable"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Business Registration Number (Optional)
                </label>
                <input
                  type="text"
                  name="businessRegistration"
                  value={formData.businessRegistration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Registration number if you have a registered business"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Are you VAT registered? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`vatRegistered-${option.value}`}
                      name="vatRegistered"
                      value={option.value}
                      checked={formData.vatRegistered === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, vatRegistered: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
                {errors.vatRegistered && <p className="text-red-500 text-sm mt-2">{errors.vatRegistered}</p>}
              </div>

              {formData.vatRegistered === 'yes' && (
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    VAT Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                    placeholder="Enter your VAT number"
                  />
                  {errors.vatNumber && <p className="text-red-500 text-sm mt-1">{errors.vatNumber}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Bank Account Details
                </label>
                <textarea
                  name="bankDetails"
                  value={formData.bankDetails}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Bank name, account holder name, account number (for payment processing)"
                />
                <div className="text-xs text-[#4A4A4A] mt-1">
                  This information is secure and used only for payment processing
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Name and phone number of emergency contact"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Portfolio & References</h2>
              <p className="text-[#4A4A4A] text-lg">Show your expertise and credibility</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Work Samples & Portfolio
                </label>
                <textarea
                  name="workSamples"
                  value={formData.workSamples}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Describe your best work, provide links to portfolio, photos, or examples of your services..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Client References
                </label>
                <textarea
                  name="clientReferences"
                  value={formData.clientReferences}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Provide contact details of previous clients who can vouch for your work (name, phone, email)..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Professional Certifications
                </label>
                <textarea
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="List any relevant certifications, licenses, or professional memberships..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Do you have professional insurance?
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes, I have professional liability insurance' },
                    { value: 'no', label: 'No, but I understand the importance' },
                    { value: 'will-get', label: 'No, but I will obtain it if accepted' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`insurance-${option.value}`}
                      name="insurance"
                      value={option.value}
                      checked={formData.insurance === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, insurance: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  Background Check Consent
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'clean', label: 'I have a clean criminal record' },
                    { value: 'minor', label: 'I have minor offenses but nothing serious' },
                    { value: 'explain', label: 'I need to explain my background' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`backgroundCheck-${option.value}`}
                      name="backgroundCheck"
                      value={option.value}
                      checked={formData.backgroundCheck === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, backgroundCheck: value }))}
                      label={option.label}
                      variant="card"
                      size="md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Final Details</h2>
              <p className="text-[#4A4A4A] text-lg">Complete your application</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Why do you want to become a service provider on eXobe? <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="Tell us about your motivation, what you hope to achieve, and how you plan to provide excellent service to customers..."
                />
                {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Your Goals & Expectations
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
                  placeholder="What are your income goals? How many hours per week do you want to work? What type of clients do you want to serve?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-4">
                  How did you hear about eXobe Service Providers? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'friend', label: 'Friend or family recommendation' },
                    { value: 'social-media', label: 'Social media (Facebook, Instagram, etc.)' },
                    { value: 'google', label: 'Google search' },
                    { value: 'existing-customer', label: 'I\'m already an eXobe customer' },
                    { value: 'advertisement', label: 'Online advertisement' },
                    { value: 'job-board', label: 'Job board or employment site' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <RadioButton
                      key={option.value}
                      id={`howDidYouHear-${option.value}`}
                      name="howDidYouHear"
                      value={option.value}
                      checked={formData.howDidYouHear === option.value}
                      onChange={(value) => setFormData(prev => ({ ...prev, howDidYouHear: value }))}
                      label={option.label}
                      variant="default"
                      size="sm"
                      className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
                    />
                  ))}
                </div>
                {errors.howDidYouHear && <p className="text-red-500 text-sm mt-2">{errors.howDidYouHear}</p>}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked }))}
                  required
                  label={
                    <span className="text-sm leading-relaxed">
                      I agree to the{' '}
                      <Link href="/terms-and-conditions" className="text-[#C8102E] hover:underline font-semibold">
                        Terms and Conditions
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="text-[#C8102E] hover:underline font-semibold">
                        Privacy Policy
                      </Link>
                      , and understand that eXobe will review my application.
                    </span>
                  }
                />
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}

                <Checkbox
                  id="agreeToBackground"
                  name="agreeToBackground"
                  checked={formData.agreeToBackground}
                  onChange={(checked) => setFormData(prev => ({ ...prev, agreeToBackground: checked }))}
                  required
                  label={
                    <span className="text-sm leading-relaxed">
                      I consent to a background check and understand that providing false information may result in rejection or termination of my service provider account.
                    </span>
                  }
                />
                {errors.agreeToBackground && <p className="text-red-500 text-sm mt-2">{errors.agreeToBackground}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] text-white py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/service-providers" className="flex items-center text-white hover:text-red-100 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Service Providers
            </Link>
            <div className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Apply to Become a Service Provider</h1>
            <p className="text-red-100 text-lg">Join thousands of professionals earning on eXobe!</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Progress */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="text-sm font-medium text-[#C8102E]">Step {currentStep} of {steps.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1">
                  <div className={`h-2 rounded-full transition-colors ${
                    currentStep >= step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                  }`} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-3">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  'bg-[#C8102E] border-[#C8102E] text-white'
                }`}>
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-4 w-4" })}
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[#C8102E]">
                    {steps[currentStep - 1].name}
                  </div>
                  <div className="text-xs text-[#4A4A4A]">
                    {steps[currentStep - 1].description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Progress */}
          <div className="hidden lg:block overflow-hidden">
            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex items-center min-w-0 max-w-full">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors flex-shrink-0 ${
                      currentStep >= step.id 
                        ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                        : currentStep === step.id 
                          ? 'border-[#C8102E] text-[#C8102E] bg-white'
                          : 'border-gray-300 text-gray-400 bg-white'
                    }`}>
                      {React.createElement(step.icon, { className: "h-5 w-5" })}
                    </div>
                    <div className="ml-2 min-w-0 flex-1">
                      <div className={`text-xs font-semibold truncate ${
                        currentStep >= step.id ? 'text-[#C8102E]' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate hidden xl:block">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-2 min-w-[20px] max-w-[60px]">
                      <div className={`h-0.5 w-full transition-colors ${
                        currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Progress (simplified) */}
          <div className="hidden sm:block lg:hidden">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                      : currentStep === step.id 
                        ? 'border-[#C8102E] text-[#C8102E] bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {React.createElement(step.icon, { className: "h-5 w-5" })}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-4 h-0.5 w-8 ${
                      currentStep > step.id ? 'bg-[#C8102E]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <div className={`text-lg font-semibold ${
                'text-[#C8102E]'
              }`}>
                {steps[currentStep - 1].name}
              </div>
              <div className="text-sm text-gray-500">{steps[currentStep - 1].description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={currentStep === steps.length ? handleSubmit : (e) => e.preventDefault()}>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-[#4A4A4A] rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep === steps.length ? (
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg"
              >
                <Upload className="h-5 w-5 mr-2" />
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg"
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </form>

        {/* Help Section */}
        <ApplicationHelpSection
          applicationType="service-provider"
          responseTime="3-5 business days"
        />
      </div>

      <ApplicationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        applicationType="service-provider"
        responseTime="3-5 business days"
      />

      <Footer />
    </div>
  );
} 