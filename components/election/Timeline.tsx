"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    date: "Day 1",
    title: "Election Announced",
    description: "The official dates are announced, triggering the immediate implementation of the Model Code of Conduct across the region.",
  },
  {
    id: 2,
    date: "Day 7 - 14",
    title: "Nomination Filing",
    description: "Candidates from various parties or independents file their nomination papers along with an affidavit of their assets and criminal records.",
  },
  {
    id: 3,
    date: "Day 15",
    title: "Scrutiny of Nominations",
    description: "The Returning Officer verifies the nomination papers. Invalid applications are rejected.",
  },
  {
    id: 4,
    date: "Day 17 - 45",
    title: "Campaign Period",
    description: "The intense period where candidates rally, advertise, and organize public meetings to woo voters.",
  },
  {
    id: 5,
    date: "Day 47",
    title: "Voting Day",
    description: "Voters arrive at booths, verify identity, and cast their vote using the Electronic Voting Machine (EVM).",
  },
  {
    id: 6,
    date: "Day 50",
    title: "Counting Day",
    description: "EVMs are opened under tight security. Votes are counted and tallied.",
  },
  {
    id: 7,
    date: "Day 50 Evening",
    title: "Result Declaration",
    description: "The final results are announced, and the victorious candidates receive their winning certificates.",
  }
];

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-16">
          <Calendar className="w-8 h-8 text-brand-saffron" />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">
            Election Timeline
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 md:pl-0">
          {timelineEvents.map((event, index) => {
            const isExpanded = expandedId === event.id;
            
            return (
              <div key={event.id} className="mb-8 relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    isExpanded 
                      ? "bg-brand-saffron border-brand-saffron ring-4 ring-brand-saffron/20" 
                      : "bg-white border-slate-300"
                  }`} 
                />
                
                <div 
                  className="bg-slate-50 border border-slate-100 rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-bold text-brand-saffron tracking-wider uppercase mb-1 block">
                        {event.date}
                      </span>
                      <h3 className={`text-xl font-bold transition-colors ${isExpanded ? 'text-brand-blue' : 'text-slate-800 group-hover:text-brand-blue'}`}>
                        {event.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-700 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-blue' : ''}`} 
                    />
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-800 leading-relaxed pt-4 border-t border-slate-200">
                          {event.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
