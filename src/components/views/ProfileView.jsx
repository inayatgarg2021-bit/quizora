import React, { useState } from 'react';
import { Target, Settings } from 'lucide-react';

export default function ProfileView({ userData, setUserData, showToast }) {
  const [name, setName] = useState(userData.profile.name);
  const [targetQuizzes, setTargetQuizzes] = useState(userData.profile.targetDailyQuizzes);

  const handleSave = (e) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name,
        targetDailyQuizzes: parseInt(targetQuizzes, 10)
      }
    }));
    showToast('Profile preferences updated!', 'success');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Account Preferences</h2>
        <p className="text-xs text-slate-400">Manage learning goals and account settings.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Daily Target Quizzes</label>
          <input
            type="number"
            min="1"
            max="10"
            value={targetQuizzes}
            onChange={(e) => setTargetQuizzes(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
          />
        </div>
        <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">
          Save Settings
        </button>
      </form>
    </div>
  );
}
