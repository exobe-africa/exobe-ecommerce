"use client";

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
  showTooltip?: boolean;
}

export default function WhatsAppButton({
  phoneNumber = '+27111234567',
  message = 'Hi! I\'m interested in your products on eXobe. Could you please help me?',
  position = 'bottom-right',
  showTooltip = true
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleWhatsAppClick = () => {
    try {
      // Format phone number (remove all non-digits except +)
      let formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
      
      // Ensure it starts with + and has country code
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }
      
      // Remove + for WhatsApp URL (WhatsApp expects numbers without +)
      const phoneForUrl = formattedPhone.replace('+', '');
      
      // Encode the message
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${phoneForUrl}?text=${encodedMessage}`;
      
      console.log('WhatsApp URL:', whatsappUrl); // Debug log
      
      // Try to open WhatsApp
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      // Fallback if popup was blocked
      if (!newWindow) {
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback - try direct URL
      window.location.href = `https://wa.me/27111234567?text=${encodeURIComponent(message)}`;
    }
  };

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <>
      {/* Message Bubble */}
      {showMessage && (
        <div className={`fixed ${positionClasses[position]} z-40 mb-20 transition-all duration-300 transform ${
          showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-xs relative">
            {/* Close button */}
            <button
              onClick={() => setShowMessage(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            
            {/* eXobe Logo */}
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-[#C8102E] rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">eX</span>
              </div>
              <div>
                <p className="font-semibold text-[#000000] text-sm">eXobe Support</p>
                <p className="text-xs text-green-600">● Online</p>
              </div>
            </div>
            
            {/* Message */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                👋 Hi there! Welcome to eXobe!
              </p>
              <p className="text-sm text-[#4A4A4A] leading-relaxed mt-2">
                Need help with your shopping? I'm here to assist you with:
              </p>
              <ul className="text-xs text-[#4A4A4A] mt-2 space-y-1">
                <li>• Product recommendations</li>
                <li>• Order assistance</li>
                <li>• Delivery information</li>
                <li>• Returns & exchanges</li>
              </ul>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => {
                handleWhatsAppClick();
                setShowMessage(false);
              }}
              className="w-full bg-[#25D366] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </button>
            
            {/* Typing indicator */}
            <div className="flex items-center mt-2 text-xs text-[#4A4A4A]">
              <div className="flex space-x-1 mr-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span>eXobe Support is typing...</span>
            </div>
            
            {/* Speech bubble arrow */}
            <div className={`absolute bottom-0 ${
              position === 'bottom-right' ? 'right-4' : 'left-4'
            } transform translate-y-full`}>
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-200 transform -translate-y-px"></div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {/* Tooltip */}
        {showTooltip && isHovered && !showMessage && (
          <div className={`absolute bottom-full mb-2 ${
            position === 'bottom-right' ? 'right-0' : 'left-0'
          } bg-[#000000] text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 transform ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}>
            Chat with us on WhatsApp
            <div className={`absolute top-full ${
              position === 'bottom-right' ? 'right-3' : 'left-3'
            } w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#000000]`}></div>
          </div>
        )}
        
        {/* Main Button */}
        <button
          onClick={toggleMessage}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group ${
            showMessage ? 'rotate-180' : ''
          }`}
          aria-label="Chat on WhatsApp"
        >
          {showMessage ? (
            <X className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8102E] text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
          1
        </div>
      </div>
    </>
  );
}
