'use client';

import { motion } from "framer-motion";

export default function BackgroundLines() {
  // Grid configuration
  const horizontalLines = 5;
  const verticalLines = 4;
  const gridSpacing = 150; // pixels between lines

  return (
    <div className="fixed inset-0 -z-10 bg-black/95">
      {/* Horizontal grid lines */}
      {[...Array(horizontalLines)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute h-[1px] w-full overflow-hidden"
          style={{
            top: `${20 + i * gridSpacing}px`,
          }}
        >
          {/* Static line (nearly invisible) */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              filter: 'blur(0.5px)',
            }}
          />
          
          {/* Traveling light */}
          <motion.div
            className="absolute h-full w-[200px]"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%,
                rgba(255, 0, 255, 0.8) 50%,
                transparent 100%)`,
              filter: 'blur(2px)',
              x: '-100%',
            }}
            animate={{
              x: ['-100%', '100vw'],
            }}
            transition={{
              duration: 8,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      ))}

      {/* Vertical grid lines */}
      {[...Array(verticalLines)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute w-[1px] h-full overflow-hidden"
          style={{
            left: `${20 + i * gridSpacing}px`,
          }}
        >
          {/* Static line (nearly invisible) */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              filter: 'blur(0.5px)',
            }}
          />
          
          {/* Traveling light */}
          <motion.div
            className="absolute w-full h-[200px]"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%,
                rgba(255, 0, 255, 0.8) 50%,
                transparent 100%)`,
              filter: 'blur(2px)',
              y: '-100%',
            }}
            animate={{
              y: ['-100%', '100vh'],
            }}
            transition={{
              duration: 10,
              delay: i * 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      ))}

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.02] via-transparent to-purple-500/[0.02] pointer-events-none" />
    </div>
  );
} 