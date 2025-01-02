'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useState, useEffect } from "react";

export default function Header() {
  const scrollDirection = useScrollDirection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.innerHeight + window.scrollY) / document.documentElement.scrollHeight;
      setIsAtBottom(scrollPercent > 0.95);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.header 
        className="fixed top-0 w-full z-50 px-4 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: scrollDirection === 'up' && !isAtBottom ? 1 : 0,
          y: scrollDirection === 'up' && !isAtBottom ? 0 : -20 
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-[1600px] mx-auto flex justify-between items-center">
          <motion.div
            className="relative w-48 h-12"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/neptume.png"
              alt="Neptume"
              fill
              
              className="object-contain"
            />
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#security">Security</NavLink>
            <NavLink href="#learn">Learn</NavLink>
            <NavLink href="#explore">Explore</NavLink>
            <NavLink href="#support">Support</NavLink>
            <motion.button
              className="bg-[#31ef90] px-6 py-2 rounded-full font-medium text-[#011826] border-2 border-transparent transition-all duration-200 hover:bg-transparent hover:border-[#31ef90] hover:text-[#31ef90]"
              whileTap={{ scale: 0.95 }}
            >
              Download
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 text-[#31ef90]"
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
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#00060D]/80 backdrop-blur-lg z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-[#011826]/90 backdrop-blur-xl z-50 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end">
                  <motion.button
                    className="w-10 h-10 flex items-center justify-center text-[#31ef90]"
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <div className="flex flex-col gap-6 mt-8">
                  <MobileNavLink href="#security" onClick={() => setIsMenuOpen(false)}>Security</MobileNavLink>
                  <MobileNavLink href="#learn" onClick={() => setIsMenuOpen(false)}>Learn</MobileNavLink>
                  <MobileNavLink href="#explore" onClick={() => setIsMenuOpen(false)}>Explore</MobileNavLink>
                  <MobileNavLink href="#support" onClick={() => setIsMenuOpen(false)}>Support</MobileNavLink>
                </div>
                <motion.button
                  className="mt-auto bg-[#31ef90] px-6 py-3 rounded-xl font-medium text-[#011826] border-2 border-transparent"
                  whileTap={{ scale: 0.95 }}
                >
                  Download
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span 
        className="text-[15px] text-gray-300 hover:text-white transition-colors"
        whileHover={{ y: -2 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.span 
        className="text-xl text-gray-300 hover:text-white transition-colors block"
        whileTap={{ x: 10 }}
      >
        {children}
      </motion.span>
    </Link>
  );
} 