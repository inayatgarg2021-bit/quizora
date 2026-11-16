import React from 'react';

export default function ResultsView({ result, onBackToDashboard, onRetry, onOpenMistakes }) {
  if (!result) return null;
  const { attempt, quiz } = result;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Score Summary Card */}
      <div className="p-8 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 text-center space-y-6 shadow-xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-3xl border-4 border-indigo-500/20">
          {attempt.score}%
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {attempt.score >= 80 ? 'Excellent Performance! 🎉' : attempt.score >= 50 ? 'Good Effort! Keep Improving' : 'Needs Practice'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">You completed {quiz.title}</p>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="block text-xs text-slate-400">Correct</span>
            <span className="font-bold text-emerald-500 text-lg">{attempt.correctCount}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400">Incorrect</span>
            <span className="font-bold text-rose-500 text-lg">{attempt.incorrectCount}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400">Skipped</span>
            <span className="font-bold text-amber-500 text-lg">{attempt.skippedCount}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400">Time</span>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">{Math.round(attempt.timeSpentSeconds / 60)}m</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <button onClick={onBackToDashboard} className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50">
            Back to Dashboard
          </button>
          <button onClick={onRetry} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-md">
            Retry Quiz
          </button>
        </div>
      </div>

      {/* Answer Explanations Review */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Question Answer Key</h3>
        {quiz.questions.map((q, idx) => {
          const userAns = attempt.userAnswers[q.id];
          const isCorrect = userAns === q.correctIndex;

          return (
            <div key={q.id} className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold text-slate-400">Q{idx + 1}.</span>
                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm flex-1">{q.text}</p>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold ${
                  isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>

              <div className="space-y-2 pl-6">
                {q.options.map((opt, oIdx) => {
                  const isUserSelection = userAns === oIdx;
                  const isCorrectAnswer = q.correctIndex === oIdx;

                  let style = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800';
                  if (isCorrectAnswer) style = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                  else if (isUserSelection && !isCorrect) style = 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-800 dark:text-rose-300 line-through';

                  return (
                    <div key={oIdx} className={`p-3 rounded-xl border text-xs ${style}`}>
                      {opt}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 text-xs text-indigo-900 dark:text-indigo-300 leading-relaxed">
                <span className="font-bold block mb-1">Explanation:</span>
                {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 7. DETAILED ANALYTICS VIEW
// ==========================================
