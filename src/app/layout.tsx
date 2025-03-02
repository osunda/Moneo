import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./hero.css";
import BackgroundLines from '@/components/BackgroundLines';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "WalletAI - Your Personal Financial Assistant",
  description: "Smart AI-powered wallet management and financial insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <BackgroundLines />
        <div id="heroGradient" className="hero-gradient" />
        {children}
      </body>
    </html>
  );
}
