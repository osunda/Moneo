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
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'ai-message-initial',
      text: "Hi! I'm your AI assistant. I can help you manage your crypto and analyze your finances. Try asking me something!",
      sender: 'ai' as const,
      timestamp: new Date()
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
      {/* Add neon glow wrapper */}
      <div className="absolute inset-0 rounded-[12px] neon-glow" />
      
      <div className="bg-[#00060D]/95 rounded-[12px] h-[480px] flex flex-col relative overflow-hidden">
        {/* Wallet Header - increased padding */}
        <div className="px-6 py-5">
          <div className="flex justify-between items-center relative">
            <div>
              <h3 className="text-lg font-semibold text-[#31ef90]">
                Neptume AI
              </h3>
            </div>
            <motion.button
              className="h-10 w-10 rounded-[12px] bg-[#011826]/20 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(49, 239, 144, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <span className="text-[#31ef90] text-xl transition-transform duration-200" 
                    style={{ transform: isChatOpen ? 'rotate(45deg)' : 'none' }}>
                {isChatOpen ? '×' : '+'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Header separator line */}
        <div className="w-full h-px bg-white/10" />

        <div className="flex-grow overflow-hidden flex flex-col">
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
                      ? 'bg-[#31ef90]/10'
                      : 'bg-[#011826]/40'
                  }`}
                >
                  <p className="text-sm text-white/90 whitespace-pre-line">{message.text}</p>
                </div>
                <p className="text-[11px] text-white/40 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom separator line */}
          <div className="w-full h-[2px] bg-white/15" />
          
          {/* Chat Input - fixed padding */}
          <div className="px-6 py-4">
            <div className="relative flex gap-2 bg-[#011826]/40 p-2 rounded-[12px]">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-white/40 text-white/90"
              />
              <motion.button
                onClick={handleSendMessage}
                className="p-2 rounded-[12px] bg-[#31ef90] hover:bg-[#31ef90]/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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


