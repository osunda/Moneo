'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type Token = {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
  change: string;
  icon: string;
};

const tokens: Token[] = [
  {
    id: 'ethereum-token',
    name: "Ethereum",
    symbol: "ETH",
    balance: "1.45",
    value: "$3,234.56",
    change: "+5.2%",
    icon: "/ether.jpg"
  },
  {
    id: 'pepe-token',
    name: "PepeCoin",
    symbol: "PEPE",
    balance: "1,234,567",
    value: "$987.65",
    change: "+12.4%",
    icon: "/pepe.png"
  },
  {
    id: 'doge-token',
    name: "Dogecoin",
    symbol: "DOGE",
    balance: "15,234",
    value: "$1,432.87",
    change: "-2.1%",
    icon: "/doge.png"
  }
];

export default function WalletDemo() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'user-message-1',
      text: "Hey! what can you do?",
      sender: 'user',
      timestamp: new Date(Date.now() - 60000) // 1 minute ago
    },
    {
      id: 'ai-message-1',
      text: "I can help you with:\n" +
            "• Batch swapping multiple tokens at once\n" +
            "• Portfolio analysis and insights\n" +
            "• Market trends and opportunities\n" +
            "• Gas optimization strategies\n\n" +
            "What would you like to explore?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 58000) // 58 seconds ago
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-message-${Date.now()}`,
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-message-${Date.now()}`,
        text: generateAIResponse(inputText),
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes('swap') && (input.includes('tokens') || input.includes('memecoins'))) {
      return "I can help you swap multiple tokens at once. Here's what I found in your wallet:\n" +
             "• 15 memecoins detected\n" +
             "• Total value: ~$1,245.67\n" +
             "• Estimated gas fees for batch swap: $12.50\n\n" +
             "Would you like me to prepare this batch transaction for you?";
    }
    if (input.includes('analysis') || input.includes('insights')) {
      return "Based on your recent transactions:\n" +
             "• Most active trading pairs: PEPE/ETH, DOGE/ETH\n" +
             "• Average hold time: 3.2 days\n" +
             "• Most profitable token: PEPE (+24%)\n" +
             "Would you like a detailed report?";
    }
    return "I can help you with batch transactions, market analysis, and automated trading. What would you like to do?";
  };

  return (
    <motion.div className="relative w-[400px]">
      {/* Inner container with background */}
      <div className="bg-[#000305]/60 rounded-[12px] h-[480px] flex flex-col relative overflow-hidden backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
        {/* Wallet Header - updated styling */}
        <div className="px-6 py-5 bg-[#000305]/80">
          <div className="flex justify-between items-center relative">
            <div>
              <h3 className="text-lg font-semibold text-white/90">
                Neptume AI
              </h3>
            </div>
            <motion.button
              className="h-10 w-10 rounded-[12px] border border-white/10 flex items-center justify-center hover:bg-white/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <span className="text-white/90 text-xl transition-transform duration-200" 
                    style={{ transform: isChatOpen ? 'none' : 'rotate(45deg)' }}>
                {isChatOpen ? '+' : '×'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Header separator line */}
        <div className="w-full h-px bg-white/10" />

        <div className="flex-grow overflow-hidden flex flex-col bg-[#000305]/40">
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto space-y-4 px-6 pt-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-[12px] relative ${
                    message.sender === 'user'
                      ? 'bg-[#31efb6]/5 border border-[#31efb6]/30'
                      : 'bg-[#000305]/80 border border-white/10'
                  }`}
                >
                  <p className="text-sm text-white/90 whitespace-pre-line">{message.text}</p>
                </div>
                <p className="text-[11px] text-white/50 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom separator line */}
          <div className="w-full h-px bg-white/10" />
          
          {/* Chat Input - updated styling */}
          <div className="px-6 py-4 bg-[#000305]/80">
            <div className="relative flex gap-2 border border-white/10 p-2 rounded-[12px] bg-[#000305]/60">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-white/50 text-white"
              />
              <motion.button
                onClick={handleSendMessage}
                className="p-2 rounded-[12px] bg-[#31efb6] hover:bg-[#31efb6]/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg 
                  className="w-5 h-5 text-[#011826]"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 


