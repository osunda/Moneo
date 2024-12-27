'use client';

import { motion } from "framer-motion";

const features = [
  {
    title: "Manage your wallet",
    description: "Your AI assistant for managing crypto. Ask questions, perform actions, and get insights instantly.",
    video: "/videos/chat-demo.mp4", // Add your video files
  },
  {
    title: "Batch Transactions",
    description: "Swap multiple tokens at once. No more tedious individual transactions.",
    video: "/videos/batch-demo.mp4",
  },
  {
    title: "Smart Analysis",
    description: "Get real-time insights into your portfolio and trading patterns.",
    video: "/videos/analysis-demo.mp4",
  }
];

export default function Features() {
  return (
    <>
      <section className="py-20 px-6" id="features">
        <div className="max-w-7xl mx-auto">
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
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex items-center gap-16 ${
                  i % 2 === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-lg mb-6">{feature.description}</p>
                </div>
                
                <div className="flex-1">
                  <div className="w-[440px] h-[600px] glass-darker rounded-2xl overflow-hidden">
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

      {/* Download Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-blue-500/10 opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-8">
            Use MoneoAI in <br/>
            any wallet
          </h2>
          
          <motion.button
            className="bg-pink-500 px-8 py-3 rounded-full font-medium inline-flex items-center gap-3"
            whileHover={{ 
              scale: 1.03,
              backgroundColor: "#F43F5E",
              boxShadow: "0 0 20px rgba(244, 63, 94, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Download now
          </motion.button>
        </motion.div>
      </section>
    </>
  );
} 