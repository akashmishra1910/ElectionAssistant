"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Megaphone, 
  UserPlus, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Trophy,
  ChevronDown
} from "lucide-react";

const stages = [
  {
    id: 1,
    title: "Announcement",
    icon: Megaphone,
    description: "The Election Commission announces the dates, enforcing the Model Code of Conduct.",
    color: "text-blue-500",
    bg: "bg-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.6)]",
  },
  {
    id: 2,
    title: "Nomination",
    icon: UserPlus,
    description: "Candidates file nomination papers, which are scrutinized by the returning officer.",
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.6)]",
  },
  {
    id: 3,
    title: "Campaign",
    icon: Users,
    description: "Parties campaign to win over voters. This ends 48 hours before polling.",
    color: "text-purple-500",
    bg: "bg-purple-500",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.6)]",
  },
  {
    id: 4,
    title: "Voting Day",
    icon: CheckSquare,
    description: "Voters cast their votes securely using EVMs and VVPATs at designated booths.",
    color: "text-brand-saffron",
    bg: "bg-brand-saffron",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.6)]",
  },
  {
    id: 5,
    title: "Vote Counting",
    icon: BarChart3,
    description: "EVMs are opened and votes are transparently counted in front of observers.",
    color: "text-orange-500",
    bg: "bg-orange-500",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.6)]",
  },
  {
    id: 6,
    title: "Declaration",
    icon: Trophy,
    description: "The candidate with the most votes in each constituency is declared the winner.",
    color: "text-green-500",
    bg: "bg-green-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.6)]",
  }
];

export default function Roadmap() {
  const [activeStage, setActiveStage] = useState<number>(1);

  // Calculate progress percentage for the connecting line
  const progressPercentage = ((activeStage - 1) / (stages.length - 1)) * 100;

  return (
    <section id="timeline" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            The Election <span className="text-brand-blue">Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-800 max-w-2xl mx-auto"
          >
            An interactive timeline of how democracy happens.
          </motion.p>
        </div>

        {/* Desktop Interactive Timeline */}
        <div className="hidden lg:block relative max-w-6xl mx-auto px-10">
          {/* Background Track */}
          <div className="absolute top-[28px] left-[60px] right-[60px] h-2 bg-slate-100 rounded-full z-0 overflow-hidden">
            {/* Animated Fill Track */}
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-brand-blue to-brand-saffron"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
          
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              const isPast = activeStage >= stage.id;
              
              return (
                <div 
                  key={stage.id} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setActiveStage(stage.id)}
                >
                  {/* Node */}
                  <motion.div 
                    layout
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 relative ${
                      isActive 
                        ? `${stage.bg} text-white ${stage.glow} scale-110 -translate-y-1` 
                        : isPast 
                          ? `bg-slate-800 text-white shadow-md`
                          : `bg-white text-slate-700 border-2 border-slate-200 group-hover:border-slate-300`
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive || isPast ? '' : 'opacity-60'}`} />
                    
                    {/* Ripple effect when active */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl border-2 ${stage.bg} border-opacity-50`}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className={`text-sm font-bold text-center mb-2 transition-colors ${
                    isActive ? stage.color : isPast ? 'text-slate-800' : 'text-slate-700'
                  }`}>
                    {stage.title}
                  </h3>
                  
                  {/* Expanded Info Panel */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-[100px] left-0 right-0 max-w-xl mx-auto z-20"
                      >
                        <div className="glass-panel p-6 rounded-3xl text-center shadow-xl relative overflow-hidden">
                          <div className={`absolute top-0 left-0 right-0 h-1.5 ${stage.bg}`} />
                          <h4 className={`text-xl font-bold mb-3 ${stage.color}`}>{stage.title}</h4>
                          <p className="text-base text-slate-700 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Spacer to prevent layout jump when panel opens */}
          <div className="h-[180px]" />
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            const isPast = activeStage >= stage.id;

            return (
              <motion.div 
                key={stage.id}
                layout
                onClick={() => setActiveStage(stage.id)}
                className={`glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isActive ? `ring-2 ring-offset-2 border-transparent ${stage.glow}` : 'border-slate-200 opacity-80'
                }`}
                style={{
                  '--tw-ring-color': isActive ? 'var(--color-brand-blue)' : 'transparent',
                } as any}
              >
                <div className="p-5 flex items-center gap-4">
                  <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                    isActive 
                      ? `${stage.bg} text-white` 
                      : isPast
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-bold text-lg ${isActive ? stage.color : isPast ? 'text-slate-800' : 'text-slate-700'}`}>
                      {stage.title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${
                    isActive ? `rotate-180 ${stage.color}` : 'text-slate-700'
                  }`} />
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 pt-2 text-base text-slate-700 pl-[5.5rem]">
                        {stage.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
