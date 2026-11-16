import React from 'react';

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ==========================================
// 2. DASHBOARD VIEW
// ==========================================
