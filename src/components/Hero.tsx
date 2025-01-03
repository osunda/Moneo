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
    <section className="min-h-screen flex items-center px-4 relative pt-24 lg:pt-0">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 relative">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-[650px] w-full text-center lg:text-left z-10">
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="space-y-6"
            >
              <p className="text-gray-400 text-lg">
                Swap, transact, and manage—instantly with AI
              </p>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[1.1]">
                <span className="inline-flex gap-4">
                  Your <span className="text-[#31ef90] italic">wallet,</span>
                </span>
                <br/>
                supercharged
              </h1>

              <div className="flex flex-col items-center lg:items-start gap-3">
                <div className="flex items-center gap-4">
                  <button
                    className="bg-[#31ef90] px-12 py-4 rounded-xl font-medium flex items-center gap-3 text-[#011826] border-2 border-transparent w-fit hover:bg-transparent hover:border-[#31ef90] hover:text-[#31ef90] transition-all duration-200"
                  >
                    <div className="relative w-6 h-6">
                      <Image
                        src="/brave.png"
                        alt="Brave Browser"
                        fill
                        className="object-contain"
                      />
                    </div>
                    Download for Brave
                  </button>

                  <div className="flex gap-8 text-sm text-gray-400">
                    <div>
                      <div className="text-white text-xl font-bold">50K+</div>
                      <div>Active users</div>
                    </div>
                    <div>
                      <div className="text-white text-xl font-bold">$2M+</div>
                      <div>Daily volume</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400">
                  Also available on other browsers and devices.
                  <a href="#" className="text-[#31ef90] ml-1 hover:underline">
                    Discover more
                  </a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Wallet Demo */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end scale-90 lg:scale-[1.35] -mt-12 lg:mt-0"
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