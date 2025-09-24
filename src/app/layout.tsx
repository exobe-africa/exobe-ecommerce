import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import CartDrawer from "../components/CartDrawer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eXobe",
  description: "Discover premium products at eXobe. Shop with confidence from our curated collection of high-quality items with fast delivery and exceptional customer service.",
  keywords: "ecommerce, online shopping, premium products, eXobe",
  authors: [{ name: "eXobe" }],
  robots: "index, follow",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
