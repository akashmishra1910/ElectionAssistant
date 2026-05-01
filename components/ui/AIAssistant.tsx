"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! I'm your Election AI Guide. How can I help you understand the voting process today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('open-ai-chat', handleOpen);
    return () => document.removeEventListener('open-ai-chat', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    
    // Add user message
    const userMsgId = Date.now().toString() + Math.random().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(), role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(), role: "assistant", content: data.error || "Sorry, I couldn't process that right now." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(), role: "assistant", content: "Network error occurred. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] px-6 py-4 rounded-full flex items-center gap-3 bg-gradient-to-r from-brand-blue to-indigo-600 text-white shadow-2xl hover:shadow-brand-blue/50 cursor-pointer border border-white/20"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-6 h-6" />
            <span className="font-bold">Ask AI Guide</span>
            
            {/* Ping animation */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[80vh] glass-card rounded-3xl flex flex-col overflow-hidden border border-white/40"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-blue to-indigo-600 p-5 flex justify-between items-center text-white shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg leading-tight tracking-wide">Election AI Guide</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_#4ade80]" />
                    <p className="text-xs text-blue-100 font-medium">Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-5 bg-slate-50/50 backdrop-blur-sm hide-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md ${
                      msg.role === 'user' ? 'bg-slate-200 text-slate-800' : 'bg-gradient-to-br from-brand-saffron to-orange-500 text-white'
                    }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm border ${
                      msg.role === 'user' 
                        ? 'bg-brand-blue text-white rounded-tr-sm border-blue-600 shadow-blue-500/20' 
                        : 'bg-white text-slate-800 border-slate-100 rounded-tl-sm shadow-slate-200/50'
                    }`}>
                      <p className="text-[15px] leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-saffron to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex items-center gap-1.5 h-12">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-5 pr-14 py-3.5 rounded-full border border-slate-200 focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue outline-none bg-white shadow-inner transition-all placeholder:text-slate-700"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2.5 bg-brand-blue text-white rounded-full hover:bg-brand-blue-dark transition-all disabled:opacity-50 disabled:hover:bg-brand-blue shadow-md hover:shadow-lg disabled:shadow-none hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-3 flex justify-center gap-2">
                <span className="text-[11px] text-slate-700 font-medium">Suggestions:</span>
                <button onClick={() => setInput("What is NOTA?")} className="text-[11px] text-brand-blue font-medium hover:underline">What is NOTA?</button>
                <span className="text-[11px] text-slate-300">•</span>
                <button onClick={() => setInput("How to register?")} className="text-[11px] text-brand-blue font-medium hover:underline">How to register?</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
