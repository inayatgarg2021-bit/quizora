import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function MistakeNotebookView({ userData, setUserData, onPracticeMistakes }) {
  const mistakes = userData.mistakes;

  const handleRemoveMistake = (qId) => {
    setUserData((prev) => ({
      ...prev,
      mistakes: prev.mistakes.filter((m) => m.questionId !== qId)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Mistake Notebook</h2>
          <p className="text-xs text-slate-400">Targeted review hub containing questions answered incorrectly in previous attempts.</p>
        </div>
        {mistakes.length > 0 && (
          <button
            onClick={() => onPracticeMistakes(mistakes)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice All Mistakes ({mistakes.length})</span>
          </button>
        )}
      </div>

      {mistakes.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#1E1F35] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Your Notebook is Empty!</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Great job! You have no unresolved mistakes queued up right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakes.map((m) => (
            <div key={m.questionId} className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-900/40 text-amber-600 text-[10px] font-bold">
                  {m.category}
                </span>
                <button onClick={() => handleRemoveMistake(m.questionId)} className="text-xs text-rose-500 font-bold hover:underline">
                  Mark Mastered
                </button>
              </div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{m.text}</h4>
              <p className="text-xs text-slate-400 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">{m.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. SMART PRACTICE DIAGNOSTIC MODE
// ==========================================
