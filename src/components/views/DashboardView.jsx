import React, { useMemo } from 'react';
import { Trophy, Target, Clock, CheckCircle2, AlertCircle, Flame, Calendar, Brain, Play, HelpCircle } from 'lucide-react';
import MetricCard from '../ui/MetricCard';

export default function DashboardView({ userData, quizzes, onNavigate, onStartQuiz }) {
  // Compute Stats
  const totalAttempts = userData.attempts.length;
  const avgAccuracy = useMemo(() => {
    if (!totalAttempts) return 0;
    const sum = userData.attempts.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / totalAttempts);
  }, [userData.attempts]);

  const recommendedQuiz = quizzes[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, {userData.profile.name}! 👋
          </h2>
          <p className="text-indigo-100 text-sm leading-relaxed">
            You are on a <span className="font-bold text-amber-300">{userData.stats.streak}-day learning streak</span>. Complete 1 practice session today to hit your target goal.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button 
              onClick={() => onStartQuiz(recommendedQuiz.id)}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition shadow-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-indigo-600" />
              <span>Continue Learning</span>
            </button>
            <button 
              onClick={() => onNavigate('smart-practice')}
              className="px-5 py-2.5 rounded-xl bg-indigo-500/30 border border-white/20 text-white font-semibold text-sm hover:bg-indigo-500/40 transition flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              <span>Smart Practice Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={<Trophy className="text-amber-500" />} label="Total XP" value={`${userData.stats.xp} XP`} sub="Level 4 Scholar" />
        <MetricCard icon={<Target className="text-indigo-500" />} label="Overall Accuracy" value={`${avgAccuracy}%`} sub="Based on all quizzes" />
        <MetricCard icon={<CheckCircle2 className="text-emerald-500" />} label="Quizzes Completed" value={totalAttempts} sub="Lifetime total" />
        <MetricCard icon={<Flame className="text-orange-500" />} label="Current Streak" value={`${userData.stats.streak} Days`} sub="Keep it going!" />
      </div>

      {/* Main Grid Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recommended & Recent */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weak Topic Alert Box */}
          {userData.mistakes.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Mistake Notebook Reminder</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    You have {userData.mistakes.length} questions queued for revision in your notebook.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('mistakes')}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition shrink-0"
              >
                Review Mistakes
              </button>
            </div>
          )}

          {/* Recommended Quizzes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Recommended for You</h3>
              <button onClick={() => onNavigate('explore')} className="text-indigo-600 text-xs font-bold hover:underline">
                View All
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {quizzes.slice(0, 2).map((quiz) => (
                <div key={quiz.id} className="p-5 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-3 hover:shadow-lg transition">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[11px] font-bold">
                    {quiz.category}
                  </span>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm line-clamp-1">{quiz.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {quiz.questions.length} Qs</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {quiz.duration} mins</span>
                  </div>
                  <button 
                    onClick={() => onStartQuiz(quiz.id)}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition font-bold text-xs text-slate-700 dark:text-slate-300"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Widget - Planner Summary */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Today's Study Plan</span>
              </h3>
              <button onClick={() => onNavigate('planner')} className="text-xs text-indigo-600 font-bold hover:underline">Manage</button>
            </div>
            <div className="space-y-2.5">
              {userData.studyPlan.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <input type="checkbox" checked={item.completed} readOnly className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span className={`text-xs font-medium flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
