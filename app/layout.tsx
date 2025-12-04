import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/contexts/CartContext";
import FloatingToolsButton from "@/components/FloatingToolsButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VCM Suite - Free Tools & Resources for Creators",
  description: "Free tools and resources to help creators grow, engage, and monetize their creative business.",
  verification: {
    google: '5cb76b900fd3341c',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0SGBDR0QMG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0SGBDR0QMG');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <FloatingToolsButton />
        </CartProvider>
      </body>
    </html>
  );
}
