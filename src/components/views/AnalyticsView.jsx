import React, { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsView({ userData }) {
  const chartData = useMemo(() => {
    return userData.attempts.map((att, i) => ({
      name: `Attempt ${i + 1}`,
      score: att.score
    })).reverse();
  }, [userData.attempts]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Performance Analytics</h2>
        <p className="text-xs text-slate-400">Track your learning trends and accuracy metrics across recent quiz attempts.</p>
      </div>

      {/* Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Score Trend History</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="#8884d8" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#8884d8" fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#6965E8" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. MISTAKE NOTEBOOK VIEW
// ==========================================
