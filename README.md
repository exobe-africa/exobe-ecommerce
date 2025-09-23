# eXobe E-commerce Platform

A comprehensive, professional e-commerce platform built with Next.js 15, featuring a modern marketplace design with seller and service provider capabilities.

## 🚀 Project Overview

eXobe is a full-featured e-commerce platform designed for the South African market, offering:

- **Multi-vendor Marketplace** - Support for both product sellers and service providers
- **Mobile-First Design** - Responsive, touch-friendly interface optimized for mobile users
- **Professional UI/UX** - Modern, attractive design with eXobe branding and color scheme
- **Complete Shopping Experience** - Cart, wishlist, checkout, order management, and user authentication
- **Comprehensive Help System** - Help center, FAQ, contact support, and detailed policies

## ✨ Key Features

### 🛒 **E-commerce Core**
- Product catalog with categories, filtering, and search
- Shopping cart with persistent storage and real-time updates
- Wishlist functionality with easy management
- Advanced product pages with variants, reviews, and sharing
- Multi-step checkout process with order confirmation

### 👥 **Multi-Platform Support**
- **Marketplace for Sellers** - Complete seller onboarding and application system
- **Service Provider Platform** - Dedicated service provider registration and management
- **Customer Portal** - User accounts, order tracking, and profile management

### 📱 **Mobile-Optimized Experience**
- Touch-friendly navigation and interactions
- Responsive design across all screen sizes
- Mobile-specific features like swipe gestures
- Optimized mobile menus and modals

### 🎨 **Professional Design System**
- Consistent eXobe branding (#C8102E primary color)
- Reusable component library
- Modern UI patterns and animations
- South African localization (ZAR currency, local phone formats)

### 🔧 **Advanced Functionality**
- Real-time search with suggestions and filters
- Dynamic cart drawer with shipping calculations
- WhatsApp integration for customer support
- Comprehensive form validation and error handling
- Toast notifications and confirmation modals

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: localStorage for cart/wishlist persistence
- **Fonts**: Google Fonts (Noto Sans)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages (login, register, etc.)
│   ├── cart/              # Shopping cart page
│   ├── categories/        # Category browsing
│   ├── category/[slug]/   # Individual category pages
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── help-center/       # Help center with articles
│   ├── order/             # Order success/failure pages
│   ├── product/[id]/      # Product detail pages
│   ├── search/            # Search results page
│   ├── sell/              # Seller marketplace pages
│   ├── service-providers/ # Service provider pages
│   ├── wishlist/          # Wishlist management
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
├── context/              # React Context providers
└── globals.css           # Global styles and theme
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Target Market

- **Primary Market**: South Africa
- **Currency**: South African Rand (ZAR)
- **Compliance**: POPIA (Protection of Personal Information Act)
- **Language**: English
- **Mobile-First**: Optimized for mobile commerce

## 🔒 Privacy & Compliance

- POPIA-compliant privacy policy
- Comprehensive terms and conditions
- Secure data handling practices
- User consent management

## 📞 Support Features

- Comprehensive help center with searchable articles
- FAQ section with categorized questions
- Contact forms with department routing
- WhatsApp integration for instant support
- Multiple contact methods (phone, email, live chat)

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting provider

## 📄 License

This project is proprietary software developed for eXobe.

## 🤝 Contributing

This is a private project. For development team members, please follow the established coding standards and component patterns.
