'use client';

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Swapped 20 different tokens in one go. What used to take me an hour now takes seconds. This is game-changing!",
    author: "Alex Thompson",
    role: "Crypto Trader"
  },
  {
    quote: "The transaction analysis helped me understand my trading patterns. I'm making better decisions thanks to the AI insights.",
    author: "Sarah Chen",
    role: "DeFi Enthusiast"
  },
  {
    quote: "Finally, a wallet assistant that actually understands what I need. Batch transactions are a lifesaver.",
    author: "Michael Roberts",
    role: "Meme Coin Trader"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">What Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust WalletAI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-darker p-6 rounded-2xl relative"
            >
              <div className="text-4xl absolute -top-4 left-4 text-pink-500/20">"</div>
              <p className="text-gray-300 mb-4 relative z-10">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 