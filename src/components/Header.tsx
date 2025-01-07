'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function Header() {
  const scrollDirection = useScrollDirection();

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
    }`}>
      <nav className="max-w-[1600px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-48 h-12">
            <Image
              src="/neptume.png"
              alt="Neptume AI"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-white/80 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#" className="text-white/80 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-white/80 hover:text-white transition-colors">
              Community
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <motion.button
            className="hidden md:flex px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect Wallet
          </motion.button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg 
              className="w-6 h-6 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
} 