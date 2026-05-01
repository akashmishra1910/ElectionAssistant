"use client";

import { motion } from "framer-motion";

const chapters = [
  {
    id: 1,
    title: "Election Announced",
    content: "The Election Commission officially declares the dates. The Model Code of Conduct comes into effect immediately, setting rules for all political parties.",
    image: "📅",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Candidates Apply",
    content: "Individuals wishing to contest submit their nomination papers. These are scrutinized, and valid candidates are finalized.",
    image: "📝",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: 3,
    title: "Campaign Begins",
    content: "Candidates hit the streets, holding rallies and distributing manifestos to convince voters. The campaign ends 48 hours before voting.",
    image: "📢",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Voting Day",
    content: "Citizens head to polling booths. After verifying identity, they cast their vote using the EVM and verify it via the VVPAT slip.",
    image: "🗳️",
    color: "from-brand-saffron to-orange-400"
  },
  {
    id: 5,
    title: "Counting",
    content: "On a predetermined day, EVMs are opened under strict security and observation. Votes are tallied constituency by constituency.",
    image: "📊",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 6,
    title: "Winner Declared",
    content: "The candidate with the highest number of votes in each area is declared the winner, forming the new government.",
    image: "🎉",
    color: "from-green-500 to-emerald-400"
  }
];

export default function StoryMode() {
  return (
    <section className="relative py-20">
      <div className="max-w-4xl mx-auto px-4 text-center mb-20 sticky top-10 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 drop-shadow-sm"
        >
          The Story of Democracy
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xl text-slate-700 font-medium max-w-2xl mx-auto"
        >
          Scroll to experience how an election unfolds, step by step.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-20 pb-32">
        {/* Vertical Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full hidden md:block z-0" />

        {chapters.map((chapter, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={chapter.id} className="min-h-[60vh] flex items-center relative z-10 w-full mb-20 md:mb-0">
              <div className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Image/Icon Side */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="w-full md:w-1/2 flex justify-center p-8"
                >
                  <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${chapter.color} flex items-center justify-center text-7xl md:text-8xl shadow-[0_0_50px_rgba(255,255,255,0.1)] relative group`}>
                    <div className="absolute inset-2 bg-slate-900 rounded-full z-0 transition-transform group-hover:scale-90 duration-500" />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-500 select-none">
                      {chapter.image}
                    </span>
                  </div>
                </motion.div>

                {/* Center Dot for Desktop */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-800 z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-brand-saffron" />

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`w-full md:w-1/2 p-8 flex flex-col justify-center ${isEven ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}
                >
                  <h3 className="text-sm font-bold tracking-widest text-brand-saffron-dark uppercase mb-2">
                    Chapter {chapter.id}
                  </h3>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 leading-tight">
                    {chapter.title}
                  </h4>
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    {chapter.content}
                  </p>
                </motion.div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
