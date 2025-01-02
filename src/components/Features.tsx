'use client';

import { motion } from "framer-motion";
import DownloadSection from "./DownloadSection";

const features = [
  {
    id: "wallet-management-feature",
    title: "Manage your wallet",
    description: "Your AI assistant for managing crypto. Ask questions, perform actions, and get insights instantly.",
    video: "/videos/chat-demo.mp4",
  },
  {
    id: "batch-transactions-feature", 
    title: "Batch Transactions",
    description: "Swap multiple tokens at once. No more tedious individual transactions.",
    video: "/videos/batch-demo.mp4",
  },
  {
    id: "smart-analysis-feature",
    title: "Smart Analysis", 
    description: "Get real-time insights into your portfolio and trading patterns.",
    video: "/videos/analysis-demo.mp4",
  }
];

export default function Features() {
  return (
    <>
      <section className="min-h-screen py-32 px-4" id="features">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-4">Features that empower you</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the next generation of wallet management
            </p>
          </motion.div>

          <div className="space-y-32">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex items-center gap-16 ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-lg mb-6">{feature.description}</p>
                </div>
                
                <div className="flex-1">
                  <div className="w-[400px] h-[660px] glass-darker rounded-2xl overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={feature.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DownloadSection />
    </>
  );
} 