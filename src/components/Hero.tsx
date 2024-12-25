'use client';

import { motion } from "framer-motion";
import WalletDemo from "./WalletDemo";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        <motion.div 
          className="flex flex-col items-start max-w-2xl lg:max-w-[45%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span 
            className="text-sm font-medium mb-4 px-4 py-2 rounded-full bg-white/10"
            whileHover={{ scale: 1.05 }}
          >
            MONEO V.0
          </motion.span>
          
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold leading-tight mb-6"
          >
            Your Smart Wallet<br/>
            <span className="text-pink-500 italic">Assistant</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-400 mb-8"
          >
            Simplify your crypto life with an AI agent that handles complex transactions, 
            provides insights, and automates your daily crypto tasks. Save time and effort 
            with intelligent batch processing.
          </motion.p>
          
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              className="glass px-8 py-4 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try it for free
            </motion.button>
            <motion.a
              href="#features"
              className="flex items-center px-8 py-4 font-medium"
              whileHover={{ x: 5 }}
            >
              Check out our features ↓
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="w-[440px] flex-shrink-0">
          <WalletDemo />
        </div>
      </div>
    </section>
  );
} 