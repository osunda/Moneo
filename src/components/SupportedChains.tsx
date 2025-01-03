'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Base set of chains
const chains = [
  { logo: '/optimism.svg' },
  { logo: '/polygon.svg' },
  { logo: '/avalanche.svg' },
  { logo: '/arbitrum.svg' },
  { logo: '/worldchain.svg' },
];

// Create a much longer array by repeating the chains multiple times
const infiniteChains = Array(8).fill(chains).flat();

export default function SupportedChains() {
  return (
    <section className="py-0 -mt-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-lg uppercase tracking-wider font-medium mb-4 text-gray-500">Supported Chains</h2>
        </motion.div>
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap animate-loop-scroll">
            {infiniteChains.map((chain, index) => (
              <div 
                key={index}
                className="inline-flex flex-shrink-0 mx-10"
              >
                <div className="w-32 h-32 relative flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={chain.logo}
                    alt="Chain logo"
                    width={128}
                    height={128}
                    className="object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate the entire set again for seamless looping */}
            {infiniteChains.map((chain, index) => (
              <div 
                key={`duplicate-${index}`}
                className="inline-flex flex-shrink-0 mx-10"
              >
                <div className="w-32 h-32 relative flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={chain.logo}
                    alt="Chain logo"
                    width={128}
                    height={128}
                    className="object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 