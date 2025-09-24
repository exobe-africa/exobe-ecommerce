import { 
  Users, 
  DollarSign,
  Calendar,
  Shield,
  Star,
  BarChart3,
  Wrench,
  Camera,
  Car,
  GraduationCap,
  Scissors,
  Truck,
  Baby,
  PaintBucket,
  Laptop,
  Music,
  Dumbbell,
  ChefHat
} from 'lucide-react';
import {
  ServiceProvidersHeroSection,
  BenefitsSection,
  ServiceCategoriesSection,
  HowItWorksSection,
  SuccessStoriesSection,
  EarningsPotentialSection,
  RequirementsSection,
  CTASection
} from '../../components/pages/service-providers';

export default function ServiceProvidersPage() {
  const benefits = [
    {
      icon: Users,
      title: "Reach More Customers",
      description: "Connect with thousands of customers actively looking for professional services in your area."
    },
    {
      icon: DollarSign,
      title: "Increase Your Income",
      description: "Set your own rates and earn more by expanding your customer base beyond traditional methods."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Work on your own terms. Accept jobs that fit your schedule and availability."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid safely and on time through our secure payment system with buyer protection."
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Showcase your work with reviews and ratings to attract more high-quality customers."
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track your performance, earnings, and customer feedback with detailed insights."
    }
  ];

  const serviceCategories = [
    { icon: Wrench, name: "Home Maintenance", description: "Plumbing, electrical, carpentry, and repairs" },
    { icon: PaintBucket, name: "Home Improvement", description: "Painting, renovations, and interior design" },
    { icon: Scissors, name: "Beauty & Wellness", description: "Hair, nails, massage, and personal care" },
    { icon: Camera, name: "Photography", description: "Events, portraits, and commercial photography" },
    { icon: Laptop, name: "Tech Support", description: "Computer repair, setup, and IT services" },
    { icon: Car, name: "Automotive", description: "Car wash, repairs, and maintenance services" },
    { icon: ChefHat, name: "Food & Catering", description: "Personal chef, catering, and meal prep" },
    { icon: GraduationCap, name: "Education & Tutoring", description: "Academic support and skill training" },
    { icon: Dumbbell, name: "Fitness & Health", description: "Personal training and wellness coaching" },
    { icon: Baby, name: "Childcare", description: "Babysitting, nanny services, and childcare" },
    { icon: Truck, name: "Moving & Delivery", description: "Moving services, delivery, and logistics" },
    { icon: Music, name: "Entertainment", description: "DJ services, music lessons, and events" }
  ];

  const stats = [
    { number: "50K+", label: "Active Customers" },
    { number: "15K+", label: "Service Providers" },
    { number: "200K+", label: "Jobs Completed" },
    { number: "4.8★", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "Interior Designer",
      location: "Cape Town",
      rating: 5,
      comment: "eXobe has transformed my business! I've connected with so many new clients and my income has doubled in just 6 months.",
      avatar: "👩‍🎨"
    },
    {
      name: "Mike Patel",
      service: "Electrician",
      location: "Johannesburg",
      rating: 5,
      comment: "The platform is easy to use and payments are always secure. I love how I can manage my schedule and choose my jobs.",
      avatar: "⚡"
    },
    {
      name: "Lisa Ndaba",
      service: "Personal Trainer",
      location: "Durban",
      rating: 5,
      comment: "Building my reputation through reviews has helped me attract premium clients. The analytics help me understand my business better.",
      avatar: "💪"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Sign up and create a detailed profile showcasing your skills, experience, and portfolio."
    },
    {
      step: 2,
      title: "Set Your Services & Rates",
      description: "List the services you offer, set your pricing, and define your availability."
    },
    {
      step: 3,
      title: "Receive Job Requests",
      description: "Get notified when customers in your area need your services."
    },
    {
      step: 4,
      title: "Complete Jobs & Get Paid",
      description: "Provide excellent service, receive reviews, and get paid securely through the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      
      <ServiceProvidersHeroSection stats={stats} />

      <BenefitsSection benefits={benefits} />

      <ServiceCategoriesSection serviceCategories={serviceCategories} />

      <HowItWorksSection howItWorks={howItWorks} />

      <SuccessStoriesSection testimonials={testimonials} />

      <EarningsPotentialSection />

      <RequirementsSection />

      <CTASection />
    </div>
  );
}
