import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, YouTubeIcon, InstagramIcon, LinkedInIcon } from "../pages/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#4A4A4A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/eXobe Main Logo - Red & Black.png"
              alt="eXobe Logo"
              width={120}
              height={120}
              className="h-10 w-10 mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium products and exceptional shopping experience.
            </p>
            
            <div className="flex space-x-4 mb-4">
              <a href="https://www.linkedin.com/company/exobeafrica" className="text-gray-300 hover:text-[#C8102E] transition-colors" aria-label="LinkedIn">
                <LinkedInIcon className="h-6 w-6" />
              </a>
              <a href="https://x.com/exobeafrica" className="text-gray-300 hover:text-[#C8102E] transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@exobeafrica" className="text-gray-300 hover:text-[#C8102E] transition-colors" aria-label="YouTube">
                <YouTubeIcon className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/exobeafrica" className="text-gray-300 hover:text-[#C8102E] transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
            
            <div className="text-sm text-gray-400">
              © {currentYear} eXobe. All Rights Reserved.
              <br />
              www.exobe.africa
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/contact" className="hover:text-[#C8102E] transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-[#C8102E] transition-colors">FAQ</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#C8102E] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#C8102E] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/category/electronics" className="hover:text-[#C8102E] transition-colors">Electronics</Link></li>
              <li><Link href="/category/fashion" className="hover:text-[#C8102E] transition-colors">Fashion</Link></li>
              <li><Link href="/category/home-garden" className="hover:text-[#C8102E] transition-colors">Home & Garden</Link></li>
              <li><Link href="/category/sports" className="hover:text-[#C8102E] transition-colors">Sports</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Phone: +27 11 123 4567</li>
              <li>Email: support@exobe.africa</li>
              <li>Mon-Fri: 9AM-6PM</li>
              <li>Sat-Sun: 10AM-4PM</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
