"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Play, Pause, RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface VoteData {
  time: string;
  partyA: number;
  partyB: number;
  partyC: number;
}

const COLORS = {
  partyA: "#3B82F6", // Brand Blue Light
  partyB: "#F97316", // Brand Saffron
  partyC: "#10B981"  // Emerald
};

export default function VoteCounting() {
  const [dataFlow, setDataFlow] = useState<VoteData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noElection, setNoElection] = useState(false);
  
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchRealData();
  }, []);

  const fetchRealData = async (mock = false) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/election-data?type=voteCounting${mock ? '&mock=true' : ''}`);
      const json = await res.json();
      if (json.ongoing === false) {
        setNoElection(true);
        setDataFlow([]);
      } else {
        setNoElection(false);
        setDataFlow(json.data || []);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setNoElection(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isFinished && dataFlow.length > 0) {
      interval = setInterval(() => {
        if (currentIndex < dataFlow.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setIsFinished(true);
        }
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, isFinished, dataFlow]);

  const togglePlay = () => {
    if (isFinished) return;
    setIsPlaying(!isPlaying);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setIsFinished(false);
    setCurrentIndex(0);
  };

  if (isLoading) {
    return (
      <section className="py-24 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-800 font-medium tracking-wide animate-pulse">Initializing Data Stream...</p>
        </div>
      </section>
    );
  }

  if (noElection || dataFlow.length === 0) {
    return (
      <section id="results" className="py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-50 pointer-events-none" />
        <div className="max-w-3xl text-center z-10 p-12 glass-card rounded-3xl">
          <Trophy className="w-16 h-16 text-brand-saffron mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
            No Elections Are Currently Underway
          </h2>
          <p className="text-xl text-slate-700 mb-10 font-medium leading-relaxed">
            The democratic process is currently resting. Check back during official vote counting days for real-time live results directly from the election commission.
          </p>
          <button 
            onClick={() => fetchRealData(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-brand-blue/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <RotateCcw className="w-5 h-5 relative z-10 group-hover:-rotate-180 transition-transform duration-700" />
            <span className="relative z-10">Simulate Past Election</span>
          </button>
        </div>
      </section>
    );
  }

  const currentData = [dataFlow[currentIndex]];
  const latestNumbers = dataFlow[currentIndex];
  const maxVotes = Math.max(latestNumbers.partyA, latestNumbers.partyB, latestNumbers.partyC);
  
  let winner = "";
  if (isFinished) {
    if (maxVotes === latestNumbers.partyA) winner = "Party A";
    if (maxVotes === latestNumbers.partyB) winner = "Party B";
    if (maxVotes === latestNumbers.partyC) winner = "Party C";
  }

  return (
    <section id="results" className="py-24 relative overflow-hidden">
      {/* Decorative dark blur to keep some contrast if needed */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-saffron rounded-full blur-[150px]" />
      </div>

      {isFinished && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti 
            width={width} 
            height={height} 
            recycle={false} 
            numberOfPieces={800}
            gravity={0.15}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Live Vote <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron to-yellow-400">Counting</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-700 max-w-2xl mx-auto"
          >
            Experience the tension of counting day. Watch how the numbers change over time as EVMs are counted.
          </motion.p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 md:p-10 shadow-2xl relative">
          
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-slate-900/80 px-6 py-3 rounded-xl border border-slate-700/50 shadow-inner">
                <span className="text-slate-700 text-sm uppercase tracking-wider block mb-1">Time Elapsed</span>
                <span className="font-mono text-2xl font-bold text-brand-saffron">{latestNumbers.time}</span>
              </div>
              
              <AnimatePresence>
                {!isFinished && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-3 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20"
                  >
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" /> 
                    <span className="text-red-400 font-bold uppercase tracking-widest text-sm">Live Feed</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={togglePlay}
                disabled={isFinished}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white rounded-full font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-brand-blue/30 disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isPlaying ? <><Pause className="w-5 h-5 relative z-10" /> <span className="relative z-10">Pause</span></> : <><Play className="w-5 h-5 relative z-10" /> <span className="relative z-10">Start Counting</span></>}
              </button>
              <button 
                onClick={resetSimulation}
                className="p-4 bg-slate-700 hover:bg-slate-600 transition-colors rounded-full text-white shadow-xl flex items-center justify-center hover:rotate-[-45deg] duration-300"
                title="Reset Simulation"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[450px] w-full bg-slate-900/50 rounded-2xl p-6 border border-slate-700/30">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={120}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.4} />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{fontSize: 14}} tickMargin={10} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 14}} tickFormatter={(val) => val.toLocaleString()} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.8)', borderRadius: '12px', color: '#fff', padding: '12px 16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ fontSize: '16px', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                <Bar dataKey="partyA" name="Party A" fill={COLORS.partyA} radius={[8, 8, 0, 0]} animationDuration={1200} />
                <Bar dataKey="partyB" name="Party B" fill={COLORS.partyB} radius={[8, 8, 0, 0]} animationDuration={1200} />
                <Bar dataKey="partyC" name="Party C" fill={COLORS.partyC} radius={[8, 8, 0, 0]} animationDuration={1200} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Winner Declaration */}
          <AnimatePresence>
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 rounded-3xl"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-10 rounded-3xl text-center max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tight">
                    Results Declared!
                  </h3>
                  <p className="text-xl text-slate-300 mb-8">
                    <strong className="text-green-400 font-black text-3xl block my-4">{winner}</strong> has won the election with a total of <span className="text-white font-bold">{maxVotes.toLocaleString()}</span> votes.
                  </p>
                  <button
                    onClick={resetSimulation}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Watch Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
