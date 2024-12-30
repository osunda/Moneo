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
  name: string;
  symbol: string;
  balance: string;
  value: string;
  change: string;
  icon: string;
};

const tokens: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "1.45",
    value: "$3,234.56",
    change: "+5.2%",
    icon: "/ether.jpg"
  },
  {
    name: "PepeCoin",
    symbol: "PEPE",
    balance: "1,234,567",
    value: "$987.65",
    change: "+12.4%",
    icon: "/pepe.png"
  },
  {
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
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you manage your crypto and analyze your finances. Try asking me something!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
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
    <motion.div
      className="relative w-[440px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        perspective: '1000px',
        willChange: 'transform',
      }}
    >
      <div className="glass-darker p-6 rounded-2xl h-[600px] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 border border-white/5 rounded-2xl" />

        {/* Wallet Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <div>
            <h3 className="text-lg font-semibold text-[#31ef90]">
              My Wallet
            </h3>
            <p className="text-sm text-gray-400">Updated just now</p>
          </div>
          <motion.button
            className="h-10 w-10 rounded-full bg-[#011826]/20 flex items-center justify-center"
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

        <div className="flex-grow overflow-hidden relative">
          {!isChatOpen ? (
            <div className="h-full flex flex-col">
              {/* Balance Card */}
              <motion.div 
                className="bg-[#011826]/20 p-6 rounded-xl mb-6 relative"
                whileHover={{ backgroundColor: "rgba(1, 24, 38, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                <h2 className="text-3xl font-bold mb-4 text-[#31ef90]">
                  $12,345.67
                </h2>
                <div className="flex justify-between text-sm">
                  <span className="text-[#31ef90]">+2.4% ↑</span>
                  <span className="text-gray-400">This month</span>
                </div>
              </motion.div>

              {/* Tokens */}
              <div className="flex-grow overflow-y-auto space-y-3 pr-2">
                <h3 className="text-sm font-medium mb-3 text-gray-300">Your Tokens</h3>
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="glass p-3 rounded-lg relative transition-all duration-200 hover:bg-[#011826]/30"
                  >
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={token.icon}
                            alt={token.name}
                            fill
                            className="object-cover"
                            quality={95}
                            loading="eager"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{token.name}</p>
                            <p className="text-sm text-gray-400">${token.symbol}</p>
                          </div>
                          <p className="text-sm text-gray-400">{token.balance} {token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{token.value}</p>
                        <p className={`text-sm ${
                          token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {token.change}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Chat Messages - adjusted padding and overflow */}
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl relative ${
                        message.sender === 'user'
                          ? 'bg-[#011826]/20 rounded-tr-none'
                          : 'bg-[#31ef90]/10 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything about your finances..."
                  className="flex-1 bg-[#011826]/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#31ef90]/50 placeholder-gray-500"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-gradient-to-r from-[#011511] to-[#31ef90]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-5 h-5 text-white"
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
          )}
        </div>
      </div>
    </motion.div>
  );
} 


