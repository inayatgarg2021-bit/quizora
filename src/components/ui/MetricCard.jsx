import React from 'react';

export default function MetricCard({ icon, label, value, sub }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">{icon}</div>
      </div>
      <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{value}</div>
      <div className="text-[11px] text-slate-400">{sub}</div>
    </div>
  );
}

// ==========================================
// 3. EXPLORE QUIZZES CATALOGUE
// ==========================================
