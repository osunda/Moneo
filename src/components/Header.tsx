'use client';

import { motion, AnimatePresence } from "framer-motion";
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
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              MoneoAI
            </motion.div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#Docs">Docs</NavLink>
              <motion.button
                className="glass px-6 py-2 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try it for free
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
        className="text-gray-300 hover:text-white transition-colors"
        whileHover={{ y: -2 }}
      >
        {children}
      </motion.span>
    </Link>
  );
} 