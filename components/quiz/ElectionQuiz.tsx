"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, HelpCircle, ArrowRight, RefreshCw } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum age to be eligible to vote in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correctAnswer: 1,
    explanation: "The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years."
  },
  {
    id: 2,
    question: "What does NOTA stand for?",
    options: [
      "None of the Above",
      "Notice of Transfer Application",
      "National Organisation of Teachers Association",
      "None of the Authorities"
    ],
    correctAnswer: 0,
    explanation: "NOTA allows voters to officially register a vote of rejection for all candidates."
  },
  {
    id: 3,
    question: "Which machine is used alongside EVM to print a paper slip of the vote cast?",
    options: ["VVPAT", "EVM-P", "VotePrint", "BallotBox"],
    correctAnswer: 0,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) provides a paper trail for the electronic vote."
  },
  {
    id: 4,
    question: "When does the Model Code of Conduct come into effect?",
    options: [
      "One month before voting",
      "Immediately after election dates are announced",
      "When nominations are filed",
      "On the day of voting"
    ],
    correctAnswer: 1,
    explanation: "It comes into effect immediately after the Election Commission announces the election schedule."
  }
];

export default function ElectionQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (index: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerChecked(true);
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-brand-saffron mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-blue-200">
            Take our quick quiz to see how much you've learned about the election process.
          </p>
        </div>

        <div className="bg-white text-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-8 text-sm font-bold text-slate-700">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>Score: {score}</span>
                </div>

                <h3 className="text-2xl font-bold text-brand-blue mb-8 leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-4 flex-grow">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                    
                    let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg ";
                    
                    if (!isAnswerChecked) {
                      buttonClass += isSelected 
                        ? "border-brand-blue bg-blue-50 text-brand-blue" 
                        : "border-slate-200 hover:border-brand-blue hover:bg-slate-50";
                    } else {
                      if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-50 text-green-700";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-50 text-red-700";
                      } else {
                        buttonClass += "border-slate-200 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectOption(index)}
                        disabled={isAnswerChecked}
                        className={buttonClass}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option}</span>
                          {isAnswerChecked && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                          {isAnswerChecked && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {isAnswerChecked && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-xl ${selectedOption === quizQuestions[currentQuestion].correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    <p className="font-bold mb-1">
                      {selectedOption === quizQuestions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect!"}
                    </p>
                    <p className="text-sm">{quizQuestions[currentQuestion].explanation}</p>
                  </motion.div>
                )}

                <div className="mt-8 flex justify-end">
                  {!isAnswerChecked ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className="px-8 py-3 bg-brand-saffron text-white rounded-xl font-bold hover:bg-brand-saffron-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-8 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors flex items-center gap-2"
                    >
                      {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next Question"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12"
              >
                <div className="w-24 h-24 bg-brand-saffron/10 rounded-full flex items-center justify-center mb-6">
                  <Trophy className="w-12 h-12 text-brand-saffron" />
                </div>
                <h3 className="text-3xl font-bold text-brand-blue mb-2">Quiz Completed!</h3>
                <p className="text-slate-800 mb-8">Your Election Knowledge Score</p>
                
                <div className="text-6xl font-extrabold text-slate-800 mb-8">
                  {score} <span className="text-3xl text-slate-700">/ {quizQuestions.length}</span>
                </div>

                <p className="text-center text-slate-800 max-w-md mx-auto mb-10">
                  {score === quizQuestions.length 
                    ? "Perfect score! You are a fully informed citizen ready to participate in democracy." 
                    : score >= quizQuestions.length / 2 
                    ? "Good job! You have a solid understanding of the election process." 
                    : "Keep learning! Review the timeline and knowledge cards to improve your understanding."}
                </p>

                <button
                  onClick={handleRestart}
                  className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
