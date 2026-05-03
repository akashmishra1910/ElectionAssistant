"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Ancient Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-out hover:scale-105"
        style={{ 
          backgroundImage: "url('/national_emblem.png')",
        }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 bg-black/60 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Lighting Orbs (Subtle Torchlight effect) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-overlay">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-saffron blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-brand-saffron-light blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest mb-6 leading-tight drop-shadow-2xl uppercase" style={{ fontFamily: 'var(--font-cinzel)' }}>
              Democracy,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-yellow-200 to-brand-saffron-light">
                Preserved.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-slate-200/90 mb-12 max-w-2xl font-medium tracking-wide drop-shadow-md"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Explore the ancient roots and modern execution of the world&apos;s largest democratic process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <button 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-background bg-brand-saffron rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] border border-yellow-300/30 cursor-pointer"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-saffron-dark via-brand-saffron to-brand-saffron-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3 uppercase tracking-wider">
                Begin the Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 z-10"
      >
        <span className="text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: 'var(--font-cinzel)' }}>Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-brand-saffron" />
        </motion.div>
      </motion.div>
    </section>
  );
}
