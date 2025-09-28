import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { UserProvider } from "../context/UserContext";
import { UIProvider } from "../context/UIContext";
import CartDrawer from "../components/common/CartDrawer";
import HelpChatWidget from "../components/common/HelpChatWidget";
import ScrollToTop from "../components/common/ScrollToTop";
import LayoutContent from "./LayoutContent";

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
  authors: [{ name: "Alex Sexwale" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
        <UIProvider>
        <UserProvider>
        <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <LayoutContent>
            {children}
          </LayoutContent>
          <CartDrawer />
          <HelpChatWidget position="bottom-right" />
        </WishlistProvider>
        </CartProvider>
        </UserProvider>
        </UIProvider>
      </body>
    </html>
  );
}
