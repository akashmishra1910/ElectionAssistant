"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Fingerprint, Box, Eye, CheckCircle2, ChevronRight, RotateCcw } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Identity Verification",
    description: "The polling officer checks your name in the voter list and verifies your ID document.",
    icon: UserCheck,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Ink Marking",
    description: "The second officer marks your left forefinger with indelible ink, gives you a slip, and takes your signature.",
    icon: Fingerprint,
    color: "text-indigo-500",
    bg: "bg-indigo-100",
  },
  {
    id: 3,
    title: "Cast Vote on EVM",
    description: "Proceed to the voting compartment. Press the blue button on the EVM against the candidate of your choice.",
    icon: Box,
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
  {
    id: 4,
    title: "Verify with VVPAT",
    description: "Look at the VVPAT window. A printed slip containing the serial number, name, and symbol of the candidate will be visible for 7 seconds.",
    icon: Eye,
    color: "text-brand-saffron",
    bg: "bg-orange-100",
  }
];

export default function VotingSimulator() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <section id="simulator" className="py-24 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-saffron/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Voting Booth <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">Simulator</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-800 max-w-2xl mx-auto"
          >
            Experience the exact process of casting a vote inside a polling booth.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Visual Simulator Area */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100" />
            
            {/* Top Progress Bar */}
            {activeStep > 0 && activeStep <= steps.length && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 rounded-t-3xl overflow-hidden z-20">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-saffron"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}

            <div className="relative z-10 w-full p-8 flex items-center justify-center h-full">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    className="text-center"
                  >
                    <div className="w-28 h-28 bg-gradient-to-br from-brand-blue to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-2xl shadow-blue-500/30">
                      <UserCheck className="w-14 h-14" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Ready to Vote?</h3>
                    <p className="text-lg text-slate-700 mb-8 max-w-sm mx-auto">Step inside the virtual polling station to learn what to expect.</p>
                    <button
                      onClick={handleNext}
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-blue rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-brand-blue/30"
                    >
                      <span className="relative flex items-center gap-2">
                        Enter Booth
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </motion.div>
                )}

                {activeStep > 0 && activeStep <= steps.length && (
                  <motion.div
                    key={`step${activeStep}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="text-center w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden"
                  >
                    {/* Step number watermark */}
                    <div className="absolute -top-10 -right-4 text-[150px] font-black text-slate-50 opacity-50 select-none z-0">
                      {activeStep}
                    </div>

                    {(() => {
                      const currentStep = steps[activeStep - 1];
                      const CurrentIcon = currentStep.icon;
                      return (
                        <div className="relative z-10">
                          <motion.div 
                            initial={{ rotate: -10, scale: 0.5 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                            className={`w-24 h-24 ${currentStep.bg} ${currentStep.color} rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-inner`}
                          >
                            <CurrentIcon className="w-12 h-12" />
                          </motion.div>
                          <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
                            {currentStep.title}
                          </h3>
                          <p className="text-lg text-slate-800 mb-10 leading-relaxed">
                            {currentStep.description}
                          </p>
                          <button
                            onClick={handleNext}
                            className={`w-full py-4 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${
                              activeStep === steps.length 
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-500/25" 
                                : "bg-brand-blue hover:bg-brand-blue-dark hover:shadow-blue-500/25"
                            }`}
                          >
                            {activeStep === steps.length ? "Finish Voting" : "Proceed to Next Step"}
                            {activeStep !== steps.length && <ChevronRight className="w-5 h-5" />}
                          </button>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}

                {activeStep > steps.length && (
                  <motion.div
                    key="finish"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                      className="w-32 h-32 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20 relative"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping opacity-20"
                      />
                      <CheckCircle2 className="w-16 h-16" />
                    </motion.div>
                    <h3 className="text-4xl font-extrabold text-slate-800 mb-4">Vote Cast!</h3>
                    <p className="text-xl text-slate-700 mb-10">You have successfully completed your civic duty.</p>
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 mx-auto text-brand-blue font-bold hover:bg-blue-50 px-6 py-3 rounded-full transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Simulate Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress Indicator Area */}
          <div className="space-y-8 pl-4 lg:pl-12">
            {steps.map((step, index) => {
              const isPast = activeStep > index + 1;
              const isActive = activeStep === index + 1;
              const isFuture = activeStep > 0 && activeStep < index + 1;
              const isNotStarted = activeStep === 0;

              return (
                <div 
                  key={step.id} 
                  className={`flex items-start gap-6 transition-all duration-500 ${
                    isFuture || isNotStarted ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <motion.div 
                      layout
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 z-10 relative
                        ${isPast 
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                          : isActive 
                            ? 'bg-brand-blue text-white shadow-xl shadow-blue-500/40 ring-8 ring-blue-100 scale-110' 
                            : 'bg-white text-slate-700 border-2 border-slate-200'}
                      `}
                    >
                      {isPast ? <CheckCircle2 className="w-7 h-7" /> : step.id}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className="w-1 h-16 mt-2 relative overflow-hidden bg-slate-200 rounded-full">
                        <motion.div 
                          className="absolute top-0 left-0 right-0 bg-green-500"
                          initial={{ height: 0 }}
                          animate={{ height: isPast ? '100%' : '0%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                  <div className={`pt-3 ${isActive ? 'scale-105 transform origin-left transition-transform duration-300' : ''}`}>
                    <h4 className={`font-bold text-2xl mb-2 ${
                      isPast ? 'text-green-600' : isActive ? 'text-brand-blue' : 'text-slate-700'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-slate-700 ${isActive ? 'block' : 'hidden md:block'}`}>
                      {step.description.split('.')[0]}.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
