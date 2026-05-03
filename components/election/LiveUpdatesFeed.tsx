"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import LiveElectionExplainerCard from "./LiveElectionExplainerCard";

const MOCK_UPDATES = [
  {
    id: "update-1",
    text: "The Election Commission has deployed an additional 100 companies of Central Armed Police Forces (CAPF) across West Bengal to ensure peaceful polling in the final phase.",
  },
  {
    id: "update-2",
    text: "Polling has officially begun across 9 constituencies in West Bengal, including Kolkata Dakshin and Jadavpur.",
  },
  {
    id: "update-3",
    text: "Early reports show a strong voter turnout of 15.2% recorded till 9:00 AM across the polling booths in West Bengal.",
  },
  {
    id: "update-4",
    text: "The Chief Electoral Officer (CEO) of West Bengal has received 150 complaints regarding EVM malfunctions, which are being resolved by sector officers.",
  },
  {
    id: "update-5",
    text: "Heavy rains in the coastal districts of West Bengal are slowing down voter turnout; polling hours extended by one hour in affected booths.",
  }
];

export default function LiveUpdatesFeed() {
  const [activeUpdates, setActiveUpdates] = useState<typeof MOCK_UPDATES>([MOCK_UPDATES[0]]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    // Simulate real-time updates arriving every 60 seconds
    const interval = setInterval(() => {
      if (currentIndex < MOCK_UPDATES.length) {
        setActiveUpdates((prev) => [MOCK_UPDATES[currentIndex], ...prev]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [currentIndex, activeUpdates.length]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-center justify-between mb-12 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Activity className="w-8 h-8 text-red-500" />
              West Bengal Live Election Feed
            </h2>
            <p className="text-slate-700 mt-2">Real-time updates with AI-powered civic explanations.</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">System Active</span>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {activeUpdates.map((update, index) => {
              // Calculate a simulated relative timestamp
              const minsAgo = index * 2 + (currentIndex - index) * 5;
              const timeString = index === 0 ? 'Just now' : `${minsAgo}m ago`;

              return (
                <LiveElectionExplainerCard
                  key={update.id}
                  id={update.id}
                  updateText={update.text}
                  timestamp={timeString}
                />
              );
            })}
          </AnimatePresence>
        </div>
        
        {currentIndex < MOCK_UPDATES.length && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-slate-700 text-sm">
              <span className="w-1 h-1 rounded-full bg-slate-400 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-slate-400 animate-pulse delay-75" />
              <span className="w-1 h-1 rounded-full bg-slate-400 animate-pulse delay-150" />
              Waiting for next update...
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
