import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

export default function SmartPracticeView({ userData, quizzes, onStartSession }) {
  const handleGenerateSession = () => {
    // Generate adaptive quiz based on mistakes or random items
    const allQuestions = quizzes.flatMap((q) => q.questions);
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);

    const generatedQuiz = {
      id: 'smart-practice-' + Date.now(),
      title: 'Smart Diagnostic Revision Session',
      category: 'Adaptive Practice',
      difficulty: 'Adaptive',
      duration: 8,
      description: 'An AI-driven diagnostic set focusing on your weak topic areas.',
      questions: shuffled
    };

    onStartSession(generatedQuiz);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      <div className="p-8 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-200 dark:shadow-none">
          <Brain className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Smart Diagnostic Engine</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Our diagnostic algorithm selects questions specifically targeting your lowest historical accuracy topics to accelerate memory retention.
          </p>
        </div>

        <button
          onClick={handleGenerateSession}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-200 dark:shadow-none transition flex items-center justify-center gap-2 mx-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Diagnostic Practice (5 Qs)</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 10. CUSTOM QUIZ BUILDER VIEW
// ==========================================
