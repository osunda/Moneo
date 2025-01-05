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
    <section className="min-h-screen flex items-start px-4 relative pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-16 relative z-10">
          {/* Left side - Text content */}
          <motion.div 
            className="flex-1 max-w-[600px] w-full text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-1 text-sm font-medium text-[#31ef90]"
            >
              MULTI-CHAIN SUPPORT
            </motion.span>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1]"
            >
              <span className="inline-flex gap-4">
                Your <span className="text-[#31ef90]">wallet,</span>
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

            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center lg:items-start gap-3 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Wallet Demo */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-center scale-[0.85] sm:scale-90 lg:scale-[1.35] mt-0 z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1] // Custom spring-like easing
            }}
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