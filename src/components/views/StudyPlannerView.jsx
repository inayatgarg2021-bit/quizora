import React, { useState } from 'react';

export default function StudyPlannerView({ userData, setUserData, showToast }) {
  const [newTitle, setNewTitle] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: 'sp-' + Date.now(),
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      category: 'General',
      completed: false
    };

    setUserData((prev) => ({
      ...prev,
      studyPlan: [...prev.studyPlan, newItem]
    }));

    setNewTitle('');
    showToast('Plan item added!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Study Planner</h2>
        <p className="text-xs text-slate-400">Organize daily revision topics and exam preparation dates.</p>
      </div>

      <form onSubmit={handleAddItem} className="flex gap-3">
        <input
          type="text"
          placeholder="Add revision target..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1E1F35] text-sm"
        />
        <button type="submit" className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">
          Add Goal
        </button>
      </form>

      <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-3">
        {userData.studyPlan.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <input type="checkbox" checked={item.completed} readOnly className="rounded text-indigo-600" />
            <span className={`text-xs font-medium flex-1 ${item.completed ? 'line-through text-slate-400' : ''}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 12. ACHIEVEMENTS VIEW
// ==========================================
