import React from 'react';
import { BarChart3, Sparkles, ArrowRight, Brain, FileText } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

export default function LandingView({ onStartDemo, onExplore, onLogin, onSignUp }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/30">
            Q
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">QUIZORA</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onExplore} className="text-slate-300 hover:text-white text-sm font-medium px-3 py-2">
            Explore Quizzes
          </button>
          <button onClick={onLogin} className="text-slate-200 hover:text-white text-sm font-semibold px-3 py-2">
            Sign in
          </button>
          <button onClick={onSignUp} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30">
            Sign up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Intelligent Quiz & Adaptive Learning Platform</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Practice. Perform. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
            Improve Systematically.
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Quizora helps university students pinpoint knowledge gaps with data-driven analytics, mistake notebooks, and adaptive diagnostic practice sessions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button onClick={onSignUp} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition shadow-xl shadow-indigo-600/30 flex items-center gap-3 text-lg">
            <span>Create Free Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={onExplore} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-xl border border-slate-700 transition text-lg">
            Browse Question Bank
          </button>
        </div>
      </section>

      {/* Core Features Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Brain className="w-8 h-8 text-indigo-400" />}
          title="Smart Practice Engine"
          desc="Rule-based diagnostic algorithms adaptively reintroduce missed questions and low-accuracy topics."
        />
        <FeatureCard 
          icon={<FileText className="w-8 h-8 text-violet-400" />}
          title="Mistake Notebook"
          desc="Automatically isolates incorrect answers from past attempts into a targeted review hub."
        />
        <FeatureCard 
          icon={<BarChart3 className="w-8 h-8 text-pink-400" />}
          title="In-Depth Performance Analytics"
          desc="Visualize accuracy trends over time, topic mastery percentages, and time-per-question metrics."
        />
      </section>
    </div>
  );
}
