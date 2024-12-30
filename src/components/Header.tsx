'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function Header() {
  const scrollDirection = useScrollDirection();

  return (
    <AnimatePresence>
      {scrollDirection === 'up' && (
        <motion.header 
          className="fixed top-0 w-full z-50 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
              className="relative w-48 h-12"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/neptume.png"
                alt="MoneoAI"
                fill
                className="object-contain"
              />
            </motion.div>
            
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
          </nav>
        </motion.header>
      )}
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