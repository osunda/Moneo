'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import WalletDemo from "./WalletDemo";
import { useGradientScroll } from '@/hooks/useGradientScroll';
import { useEffect } from 'react';

export default function Hero() {
  useGradientScroll();
  const { scrollY } = useScroll();
  
  // Different fade points for mobile and desktop
  const fadeOutPoint = typeof window !== 'undefined' ? 
    window.innerWidth < 768 ? 500 : 300 : 300; // Default to 300 during SSR
  
  // Update the transform ranges
  const titleOpacity = useTransform(scrollY, [0, fadeOutPoint], [1, 0]);
  const titleY = useTransform(scrollY, [0, fadeOutPoint], [0, -100]);
  
  const walletY = useTransform(scrollY, [0, fadeOutPoint], [0, -100]);
  const walletOpacity = useTransform(scrollY, [0, fadeOutPoint], [1, 0]);
  const walletBlur = useTransform(scrollY, [0, fadeOutPoint], [0, 0.5]);

  // Add effect to update fade point on resize
  useEffect(() => {
    const handleResize = () => {
      const newFadePoint = window.innerWidth < 768 ? 500 : 300;
      titleOpacity.set(window.scrollY > newFadePoint ? 0 : 1);
      walletOpacity.set(window.scrollY > newFadePoint ? 0 : 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [titleOpacity, walletOpacity]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-start px-4 relative pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-16 relative z-10">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-[600px] w-full text-center lg:text-left z-10">
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="space-y-4"
            >
              <span 
                className="inline-block px-4 py-1 text-sm font-medium text-blue-400 bg-blue-900/30 rounded-full"
              >
                MULTI-CHAIN SUPPORT
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1]">
                <span className="inline-flex gap-4">
                  Your <span className="text-[#31ef90]">wallet,</span>
                </span>
                <br/>
                supercharged
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
                Experience seamless crypto management across multiple chains. 
                Trade, swap, and manage your assets with AI-powered intelligence.
              </p>

              <div className="flex flex-col items-center lg:items-start gap-3 pt-2">
                <button
                  className="bg-[#31ef90] px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-2.5 text-[#011826] border border-transparent w-fit hover:bg-transparent hover:border-[#31ef90] hover:text-[#31ef90] transition-all duration-200"
                >
                  <div className="relative w-4 sm:w-[18px] h-4 sm:h-[18px]">
                    <Image
                      src="/brave.png"
                      alt="Brave Browser"
                      fill
                      className="object-contain"
                    />
                  </div>
                  Download for Brave
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right side - Wallet Demo */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-center scale-[0.85] sm:scale-90 lg:scale-[1.35] mt-0 z-20"
            style={{ 
              y: walletY,
              opacity: walletOpacity,
              filter: `brightness(${walletBlur})`,
            }}
          >
            <WalletDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 