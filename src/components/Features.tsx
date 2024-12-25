'use client';

import { motion } from "framer-motion";

const features = [
  {
    title: "Batch Transactions",
    description: "Swap multiple tokens in one go. No more tedious individual transactions - let the AI handle it all at once.",
    icon: "⚡"
  },
  {
    title: "Transaction Analysis",
    description: "Get insights into your trading patterns and behavior. Understand your portfolio performance better.",
    icon: "📊"
  },
  {
    title: "Smart Automation",
    description: "Set up automated actions based on market conditions. Let the AI execute trades at the perfect moment.",
    icon: "🤖"
  },
  {
    title: "Wallet Integration",
    description: "Seamlessly integrates with your existing wallet. No need to change your preferred platform.",
    icon: "🔗"
  }
];

export default function Features() {
  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of wallet management with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-darker p-6 rounded-2xl"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 