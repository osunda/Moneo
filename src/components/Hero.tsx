'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import WalletDemo from "./WalletDemo";

export default function Hero() {
  const { scrollY } = useScroll();
  
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  
  const walletY = useTransform(scrollY, [0, 300], [0, -50]);
  const walletOpacity = useTransform(scrollY, [0, 300], [1, 1.1]);
  const walletBlur = useTransform(scrollY, [0, 300], [0, 0.5]);
  const glowOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-24"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.p
            className="text-gray-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Swap, transact, and manage—instantly with AI
          </motion.p>
          
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your <span className="text-[#31ef90] italic">wallet, </span><br/>
            supercharged
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              className="bg-[#31ef90] px-8 py-3 rounded-full font-medium flex items-center gap-3 text-[#011826] border-2 border-transparent"
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "transparent",
                borderColor: "#31ef90",
                color: "#31ef90",
                boxShadow: "0 0 20px rgba(49, 239, 144, 0.2)",
              }}
              initial={{ boxShadow: "0 0 0 rgba(23, 166, 85, 0)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="relative w-6 h-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/brave.png"
                  alt="Brave Browser"
                  fill
                  className="object-contain"
                />
              </motion.div>
              Download for Brave
            </motion.button>
            <p className="text-sm text-gray-400">
              Also available on other<br/>
              browsers and devices.
              <a href="#" className="text-[#31ef90] ml-1 hover:underline">
                Discover more
              </a>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-center"
          style={{ 
            y: walletY,
            opacity: walletOpacity,
            filter: `brightness(${walletBlur})`,
          }}
        >
          <WalletDemo />
        </motion.div>
      </div>
    </section>
  );
} 