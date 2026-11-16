import React, { useState, useEffect } from 'react';
import { Clock, ArrowLeft, Flag, ChevronRight } from 'lucide-react';

export default function QuizEngineView({ session, onCancel, onSubmit }) {
  const { quiz } = session;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);

  // Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      onSubmit(quiz, answers, quiz.duration * 60);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quiz, answers, onSubmit]);

  const currentQuestion = quiz.questions[currentIndex];

  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Top Bar */}
      <header className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm truncate">{quiz.title}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 font-mono font-bold text-sm px-3 py-1.5 rounded-lg border ${
            timeLeft < 120 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-indigo-400'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <button onClick={onCancel} className="text-xs font-bold text-slate-400 hover:text-white">Exit</button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 grid md:grid-cols-4 gap-6 items-start">
        {/* Left Question Content */}
        <div className="md:col-span-3 space-y-6">
          <div className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400">Question {currentIndex + 1} of {quiz.questions.length}</span>
              <button
                onClick={toggleFlag}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                  flagged[currentQuestion.id] ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flagged[currentQuestion.id] ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            <h3 className="text-lg font-bold leading-relaxed">{currentQuestion.text}</h3>

            {currentQuestion.code && (
              <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto border border-slate-800">
                <code>{currentQuestion.code}</code>
              </pre>
            )}

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium transition border flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                        : 'bg-slate-800/40 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'border-indigo-400 bg-indigo-600 text-white' : 'border-slate-600 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-700 font-bold text-xs disabled:opacity-30 hover:bg-slate-800 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs transition flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onSubmit(quiz, answers, quiz.duration * 60 - timeLeft)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs transition shadow-lg shadow-emerald-900/40"
              >
                Submit Attempt
              </button>
            )}
          </div>
        </div>

        {/* Right Navigator Sidebar */}
        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
          <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Question Navigator</h4>
          <div className="grid grid-cols-4 gap-2">
            {quiz.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flagged[q.id];
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-xl text-xs font-bold transition flex items-center justify-center relative ${
                    isCurrent
                      ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white'
                      : isAnswered
                      ? 'bg-indigo-950 border border-indigo-700 text-indigo-300'
                      : 'bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                  {isFlagged && <div className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. RESULTS & PERFORMANCE REVIEW VIEW
// ==========================================
