"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Compass, CalendarDays, Vote, Bot, Trophy } from "lucide-react";
import React from "react";
import Link from "next/link";

const features = [
  {
    title: "Personal Voting Guide",
    description: "Get a personalized readiness score and checklist.",
    icon: Compass,
    color: "text-blue-500",
    href: "#voting-guide",
  },
  {
    title: "Election Timeline",
    description: "Follow the journey from announcement to results.",
    icon: CalendarDays,
    color: "text-indigo-500",
    href: "#timeline",
  },
  {
    title: "Voting Simulator",
    description: "Experience the step-by-step polling booth process.",
    icon: Vote,
    color: "text-brand-saffron",
    href: "#simulator",
  },
  {
    title: "AI Election Assistant",
    description: "Ask any question to our intelligent AI guide.",
    icon: Bot,
    color: "text-purple-500",
    href: "#ai",
  },
];

const TiltCard = ({ feature, index }: { feature: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (feature.href === '#ai') {
      e.preventDefault();
      document.dispatchEvent(new Event('open-ai-chat'));
    }
  };

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <Link href={feature.href} onClick={handleLinkClick} className="block h-full">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="h-full relative rounded-2xl glass-card p-8 flex flex-col items-start gap-4 cursor-pointer overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="p-4 rounded-xl bg-slate-50 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10" style={{ transform: "translateZ(30px)" }}>
            <Icon className={`w-8 h-8 ${feature.color}`} />
          </div>
          
          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
            <p className="text-slate-800 leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-saffron/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-slate-900 mb-4"
          >
            Explore the Platform
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-800"
          >
            Interactive tools designed to demystify the democratic process.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <TiltCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
