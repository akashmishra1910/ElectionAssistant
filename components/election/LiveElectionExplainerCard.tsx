"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Volume2, RefreshCw, Sparkles, Clock } from "lucide-react";

interface LiveElectionExplainerCardProps {
  updateText: string;
  timestamp: string;
  id: string;
}

export default function LiveElectionExplainerCard({ updateText, timestamp, id }: LiveElectionExplainerCardProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [complexity, setComplexity] = useState<'standard' | 'simple'>('standard');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const generateExplanation = async (level: 'standard' | 'simple') => {
    setIsGenerating(true);
    setComplexity(level);
    
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updateText, complexity: level }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setExplanation(data.explanation);
      } else {
        // Fallback gracefully on rate limits or API errors
        console.warn('API Error:', data.error);
        if (data.error?.includes('429')) {
          setExplanation(`[Fallback] The election process ensures that citizens can safely participate in democracy. (API Rate Limit Exceeded)`);
        } else {
          setExplanation(`This update signifies an important step in the democratic process. (AI temporarily unavailable)`);
        }
      }
    } catch (error) {
      setExplanation("Network error occurred. The democratic process continues safely.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateExplanation(complexity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Only re-run automatically if the ID changes

  const handleSimplify = () => {
    if (complexity === 'standard') {
      generateExplanation('simple');
    }
  };

  const handleSpeak = () => {
    if (!explanation || isGenerating) return;
    
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.onend = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="glass-card rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white relative group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-saffron to-brand-blue" />
      
      {/* Top Section: Live Update */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Live Update</span>
          </div>
          <div className="flex items-center gap-1 text-slate-700 text-xs font-medium">
            <Clock className="w-3 h-3" />
            {timestamp}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 leading-snug">
          {updateText}
        </h3>
      </div>

      {/* Bottom Section: AI Explanation */}
      <div className="p-5 bg-gradient-to-br from-indigo-50/30 to-blue-50/30 relative">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-brand-blue to-indigo-600 flex items-center justify-center shadow-md relative">
            <Bot className="w-5 h-5 text-white" />
            {isGenerating && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-saffron opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-saffron"></span>
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold flex items-center gap-1.5 text-indigo-900">
                AI Explanation
                <Sparkles className="w-3.5 h-3.5 text-brand-saffron" />
              </h4>
              
              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeak}
                  disabled={isGenerating}
                  className={`p-1.5 rounded-md transition-colors ${isPlayingAudio ? 'bg-brand-blue text-white' : 'text-slate-700 hover:text-brand-blue hover:bg-blue-50'}`}
                  title="Listen to explanation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-slate-700 text-sm leading-relaxed">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-1 items-center h-5"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <p>{explanation}</p>
                    
                    {complexity === 'standard' && (
                      <button 
                        onClick={handleSimplify}
                        className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-indigo-700 transition-colors mt-2"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Explain in simpler terms
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
