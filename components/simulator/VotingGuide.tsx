"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, MapPin, CreditCard, UserCheck, AlertCircle } from "lucide-react";

export default function VotingGuide() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    registered: null as boolean | null,
    hasVoterId: null as boolean | null,
    knowsBooth: null as boolean | null,
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleReset = () => {
    setStep(1);
    setFormData({ age: "", registered: null, hasVoterId: null, knowsBooth: null });
  };

  const calculateScore = () => {
    let score = 0;
    if (parseInt(formData.age) >= 18) score += 20;
    if (formData.registered) score += 30;
    if (formData.hasVoterId) score += 25;
    if (formData.knowsBooth) score += 25;
    return score;
  };

  const score = calculateScore();

  return (
    <section id="voting-guide" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Personal Voting Guide
          </h2>
          <p className="text-lg text-slate-800">
            Answer a few quick questions to get your personalized voting checklist and readiness score.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="bg-brand-blue p-6 text-white flex justify-between items-center">
            <h3 className="font-semibold text-lg">Readiness Assessment</h3>
            <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Step {Math.min(step, 5)} of 4
            </div>
          </div>

          <div className="p-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h4 className="text-xl font-bold text-slate-800 mb-6">How old are you?</h4>
                <div className="flex flex-col gap-4">
                  <input
                    type="number"
                    placeholder="Enter your age"
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-saffron focus:border-transparent outline-none text-lg"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                  <button
                    disabled={!formData.age}
                    onClick={handleNext}
                    className="mt-4 bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Question
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && parseInt(formData.age) < 18 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-brand-saffron mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-slate-800 mb-2">You are not yet eligible.</h4>
                <p className="text-slate-800 mb-8">
                  You must be at least 18 years old to vote. However, learning about the process now is a great idea!
                </p>
                <button onClick={handleReset} className="text-brand-blue font-bold hover:underline">
                  Start Over
                </button>
              </motion.div>
            )}

            {step === 2 && parseInt(formData.age) >= 18 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h4 className="text-xl font-bold text-slate-800 mb-6">Are you registered in the official voter list?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setFormData({ ...formData, registered: true }); handleNext(); }}
                    className="p-6 border-2 border-slate-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all font-bold text-slate-700 flex flex-col items-center gap-3"
                  >
                    <Check className="w-8 h-8 text-green-500" />
                    Yes, I am
                  </button>
                  <button
                    onClick={() => { setFormData({ ...formData, registered: false }); handleNext(); }}
                    className="p-6 border-2 border-slate-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all font-bold text-slate-700 flex flex-col items-center gap-3"
                  >
                    <X className="w-8 h-8 text-red-500" />
                    No / Not Sure
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h4 className="text-xl font-bold text-slate-800 mb-6">Do you have a valid Voter ID card (EPIC) or approved alternative ID?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setFormData({ ...formData, hasVoterId: true }); handleNext(); }}
                    className="p-6 border-2 border-slate-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all font-bold text-slate-700 flex flex-col items-center gap-3"
                  >
                    <Check className="w-8 h-8 text-green-500" />
                    Yes, I have it
                  </button>
                  <button
                    onClick={() => { setFormData({ ...formData, hasVoterId: false }); handleNext(); }}
                    className="p-6 border-2 border-slate-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all font-bold text-slate-700 flex flex-col items-center gap-3"
                  >
                    <X className="w-8 h-8 text-red-500" />
                    No / Lost it
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h4 className="text-xl font-bold text-slate-800 mb-6">Do you know where your designated polling booth is?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setFormData({ ...formData, knowsBooth: true }); handleNext(); }}
                    className="p-6 border-2 border-slate-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all font-bold text-slate-700 flex flex-col items-center gap-3"
                  >
                    <Check className="w-8 h-8 text-green-500" />
                    Yes, I know
                  </button>
                  <button
                    onClick={() => { setFormData({ ...formData, knowsBooth: false }); handleNext(); }}
                    className="p-6 border-2 border-slate-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all font-bold text-slate-700 flex flex-col items-center gap-3"
                  >
                    <X className="w-8 h-8 text-red-500" />
                    No, I need to find it
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-blue/10 mb-4">
                    <span className="text-4xl font-extrabold text-brand-blue">{score}%</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">Your Voting Readiness</h4>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`p-2 rounded-full ${formData.registered ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {formData.registered ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800">Registration Status</h5>
                      <p className="text-sm text-slate-700">
                        {formData.registered ? "You are registered." : "You need to register to vote using Form 6."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`p-2 rounded-full ${formData.hasVoterId ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {formData.hasVoterId ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800">Voter ID</h5>
                      <p className="text-sm text-slate-700">
                        {formData.hasVoterId ? "You have valid identification." : "Keep an alternative approved ID ready (Aadhaar, PAN, etc)."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`p-2 rounded-full ${formData.knowsBooth ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {formData.knowsBooth ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800">Polling Booth</h5>
                      <p className="text-sm text-slate-700">
                        {formData.knowsBooth ? "You know where to go." : "Use our Booth Finder tool below to locate your polling station."}
                      </p>
                    </div>
                  </div>
                </div>

                <button onClick={handleReset} className="w-full text-center text-brand-blue font-bold hover:underline">
                  Retake Assessment
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
