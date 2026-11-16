import React from 'react';

export default function NavItem({ icon, label, active, onClick, badge, collapsed }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
      }`}
    >
      <div className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
        {icon}
      </div>
      {!collapsed && <span className="flex-1 text-left truncate">{label}</span>}
      {!collapsed && badge && (
        <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
          active ? 'bg-white text-indigo-600' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ==========================================
// 1. LANDING PAGE VIEW
// ==========================================
