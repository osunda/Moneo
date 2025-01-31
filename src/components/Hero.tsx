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
    window.innerWidth < 768 ? 800 : 600 : 600; // Increased from 500/300 to 800/600
  
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-start px-4 relative pt-16 md:pt-20 lg:pt-24 mb-20 lg:mb-0">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-16 relative z-10">
          {/* Left side - Text content */}
          <motion.div 
            className="flex-1 max-w-[600px] w-full flex flex-col space-y-6 text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.div className="space-y-6">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1]"
              >
                <span className="inline-flex gap-4">
                Your <span className="text-[#31efb6]">wallet,</span>
                </span>
                <br/>
                supercharged
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0"
              >
                Experience seamless crypto management across multiple chains. 
                Trade, swap, and manage your assets with AI-powered intelligence.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start pt-4 gap-4 mb-24 lg:mb-0"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#31efb6] px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-medium text-[#011826] shadow-lg shadow-[#31efb6]/10 hover:shadow-xl hover:shadow-[#31efb6]/20 hover:bg-[#31efb6]/90 transition-all duration-200"
              >
                Get Started
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-medium text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              >
                Join Community
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Wallet Demo */}
          <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <WalletDemo />
          </div>
        </div>
      </div>
    </section>
  );
} 