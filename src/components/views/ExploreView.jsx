import React, { useState, useMemo } from 'react';
import { Clock, Search, Filter, HelpCircle, List } from 'lucide-react';

export default function ExploreView({ quizzes, onSelectQuiz, userData, setUserData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Data Structures & Algorithms', 'Web Development', 'Computer Science', 'Aptitude'];

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || q.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [quizzes, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Explore Quiz Catalogue</h2>
          <p className="text-xs text-slate-400">Browse structured quizzes across fundamental engineering subjects.</p>
        </div>
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search topic or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1E1F35] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-[#1E1F35] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quizzes List Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:shadow-xl transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[11px] font-bold">
                  {quiz.category}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  quiz.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                  quiz.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">{quiz.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{quiz.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {quiz.questions.length} Qs</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {quiz.duration}m</span>
              </div>
              <button
                onClick={() => onSelectQuiz(quiz.id)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-200 dark:shadow-none"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. QUIZ DETAILS PREVIEW
// ==========================================
