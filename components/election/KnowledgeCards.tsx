"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const cardsData = [
  {
    id: 1,
    title: "Electronic Voting Machine (EVM)",
    content: "An EVM is an electronic device for recording votes. It consists of a Control Unit and a Balloting Unit. It ensures secure, tamper-proof, and fast vote recording.",
    icon: "📠",
  },
  {
    id: 2,
    title: "VVPAT",
    content: "Voter Verifiable Paper Audit Trail (VVPAT) provides feedback to voters using a slip. It allows voters to verify that their vote was cast correctly, ensuring transparency.",
    icon: "🧾",
  },
  {
    id: 3,
    title: "NOTA",
    content: "None of the Above (NOTA) is a ballot option that allows voters to officially register a vote of rejection for all candidates running in the election.",
    icon: "🚫",
  },
  {
    id: 4,
    title: "Model Code of Conduct",
    content: "A set of guidelines issued by the Election Commission to regulate political parties and candidates prior to elections, ensuring free and fair polling.",
    icon: "⚖️",
  }
];

export default function KnowledgeCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: 45 * direction,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: -45 * direction,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = cardsData.length - 1;
    if (nextIndex >= cardsData.length) nextIndex = 0;
    setCurrentIndex(nextIndex);
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <BookOpen className="w-8 h-8 text-brand-blue" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">
            Election Knowledge
          </h2>
        </div>

        <div className="relative h-[400px] flex items-center justify-center perspective-[1000px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                rotateY: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-sm h-[350px] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col p-8 cursor-grab active:cursor-grabbing"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-6xl mb-6 text-center">{cardsData[currentIndex].icon}</div>
              <h3 className="text-2xl font-bold text-brand-blue mb-4 text-center">
                {cardsData[currentIndex].title}
              </h3>
              <p className="text-slate-800 text-center leading-relaxed flex-grow">
                {cardsData[currentIndex].content}
              </p>
              
              <div className="text-center mt-4 text-xs text-slate-700 font-medium">
                Swipe to explore
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12">
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-white shadow-md text-brand-blue hover:bg-slate-50 transition-colors z-10"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12">
            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-white shadow-md text-brand-blue hover:bg-slate-50 transition-colors z-10"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {cardsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentIndex ? "bg-brand-saffron" : "bg-slate-300"
              }`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
