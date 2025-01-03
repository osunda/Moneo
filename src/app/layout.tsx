import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./hero.css";
import BackgroundLines from '@/components/BackgroundLines';
import DiscordPopup from '@/components/DiscordPopup';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundLines />
        <div id="heroGradient" className="hero-gradient" />
        {children}
        <DiscordPopup />
      </body>
    </html>
  );
}
