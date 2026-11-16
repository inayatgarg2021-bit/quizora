import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';

export default function QuizDetailsView({ quiz, onBack, onStart }) {
  if (!quiz) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </button>

      <div className="p-8 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 text-xs font-bold">
            {quiz.category}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{quiz.title}</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{quiz.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="text-center">
            <span className="block text-[11px] text-slate-400 font-medium">Questions</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{quiz.questions.length} Items</span>
          </div>
          <div className="text-center border-x border-slate-200 dark:border-slate-700">
            <span className="block text-[11px] text-slate-400 font-medium">Time Limit</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{quiz.duration} Minutes</span>
          </div>
          <div className="text-center">
            <span className="block text-[11px] text-slate-400 font-medium">Difficulty</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{quiz.difficulty}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Attempt Instructions</h4>
          <ul className="text-xs text-slate-500 space-y-2 list-disc pl-5 leading-relaxed">
            <li>Ensure you have a stable internet connection.</li>
            <li>The countdown timer starts immediately once you click "Begin Attempt".</li>
            <li>You can flag questions to revisit before final submission.</li>
            <li>The attempt automatically submits upon timer expiration.</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-200 dark:shadow-none transition flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Begin Attempt Now</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 5. INTERACTIVE QUIZ ENGINE VIEW
// ==========================================
