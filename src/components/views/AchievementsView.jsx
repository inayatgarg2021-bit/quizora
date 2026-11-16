import React from 'react';
import { Trophy } from 'lucide-react';

export default function AchievementsView({ userData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Badges & Achievements</h2>
        <p className="text-xs text-slate-400">Unlock study milestones as you practice consistently.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.achievements.map((ach) => (
          <div key={ach.id} className={`p-6 rounded-2xl border space-y-3 ${
            ach.unlocked ? 'bg-white dark:bg-[#1E1F35] border-indigo-500/30 shadow-lg' : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600">
                <Trophy className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${ach.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {ach.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
            <h4 className="font-bold text-sm">{ach.title}</h4>
            <p className="text-xs text-slate-400">{ach.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 13. PROFILE & SETTINGS VIEW
// ==========================================
