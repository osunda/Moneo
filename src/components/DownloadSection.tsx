'use client';

import { motion } from "framer-motion";
import { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function DownloadSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: Star[] = [];
    const STARS_PER_PIXEL = 0.0003; // Reduced density
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const createStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1, // Much larger stars (1-4px)
      vx: (Math.random() - 0.5) * 0.15, // Slightly slower for bigger stars
      vy: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.7 + 0.3 // Higher minimum opacity
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.opacity = Math.sin(Date.now() * 0.002 + star.x * 0.01) * 0.3 + 0.7; // More subtle twinkling

        // Wrap around edges with a buffer
        if (star.x < -20) star.x = canvas.width + 20;
        if (star.x > canvas.width + 20) star.x = -20;
        if (star.y < -20) star.y = canvas.height + 20;
        if (star.y > canvas.height + 20) star.y = -20;

        // Add glow effect for larger stars
        const glow = star.radius > 2;
        if (glow) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.8})`; // Brighter core
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const initStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) * STARS_PER_PIXEL);
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push(createStar());
      }
    };

    resizeCanvas();
    initStars();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="py-16 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#31ef90]/5 to-[#011826]/10 opacity-30" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
    </section>
  );
} 