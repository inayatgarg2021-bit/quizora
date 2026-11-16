import React, { useState, useEffect } from 'react';
import {
  BookOpen, Trophy, Target, Clock, CheckCircle2, XCircle, AlertCircle,
  BarChart3, Sparkles, Plus, Search, Filter, Bookmark, Flame, Calendar,
  User, Settings, LogOut, Sun, Moon, ArrowRight, ArrowLeft, Flag, RotateCcw,
  Brain, FileText, Share2, Download, Trash2, Check, ChevronRight, Play, Eye, EyeOff,
  Bell, Award, Zap, HelpCircle, Layers, ShieldCheck, ChevronDown, List, RefreshCw
} from 'lucide-react';
import { SYSTEM_THEME_KEY, LOCAL_DATA_KEY, INITIAL_QUIZZES, INITIAL_USER_STATE } from './data/initialData';
import NavItem from './components/layout/NavItem';
import LandingView from './components/views/LandingView';
import DashboardView from './components/views/DashboardView';
import ExploreView from './components/views/ExploreView';
import QuizDetailsView from './components/views/QuizDetailsView';
import QuizEngineView from './components/views/QuizEngineView';
import ResultsView from './components/views/ResultsView';
import AnalyticsView from './components/views/AnalyticsView';
import MistakeNotebookView from './components/views/MistakeNotebookView';
import SmartPracticeView from './components/views/SmartPracticeView';
import CustomQuizBuilderView from './components/views/CustomQuizBuilderView';
import StudyPlannerView from './components/views/StudyPlannerView';
import AchievementsView from './components/views/AchievementsView';
import ProfileView from './components/views/ProfileView';
import AuthView from './components/views/AuthView';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState('landing'); // landing, dashboard, explore, details, active-quiz, results, analytics, mistakes, smart-practice, custom-builder, planner, achievements, profile
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [activeQuizSession, setActiveQuizSession] = useState(null);
  const [lastCompletedResult, setLastCompletedResult] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // App Core Data State
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [userData, setUserData] = useState(INITIAL_USER_STATE);

  // Load Persisted Data
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(SYSTEM_THEME_KEY);
      if (savedTheme === 'dark') setIsDarkMode(true);

      const savedData = localStorage.getItem(LOCAL_DATA_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.quizzes) setQuizzes(parsed.quizzes);
        if (parsed.userData) setUserData(parsed.userData);
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
  }, []);

  // Save Data on Changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify({ quizzes, userData }));
    } catch (e) {
      console.error('Failed to persist app state:', e);
    }
  }, [quizzes, userData]);

  // Toast Helper
  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem(SYSTEM_THEME_KEY, !isDarkMode ? 'dark' : 'light');
  };

  // Login as Demo Student
  const handleStartDemo = () => {
    setCurrentView('dashboard');
    showToast(`Welcome back, ${userData.profile.name}! Practice goal ready.`, 'success');
  };

  const handleAuthSuccess = ({ name, email }) => {
    setUserData((prev) => ({
      ...prev,
      profile: { ...prev.profile, name, email }
    }));
    setCurrentView('dashboard');
    showToast(`Welcome to Quizora, ${name}!`, 'success');
  };

  // Start Quiz Handler
  const handlePrepareQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setCurrentView('details');
  };

  const handleBeginQuiz = (quiz) => {
    setActiveQuizSession({
      quiz,
      startTime: Date.now(),
      answers: {},
      flagged: {},
      currentQuestionIndex: 0
    });
    setCurrentView('active-quiz');
  };

  // Finish Quiz Handler
  const handleFinishQuiz = (quiz, answers, timeSpentSeconds) => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const mistakesToAdd = [];

    quiz.questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected === undefined || selected === null) {
        skipped++;
      } else if (selected === q.correctIndex) {
        correct++;
      } else {
        incorrect++;
        mistakesToAdd.push({
          questionId: q.id,
          quizId: quiz.id,
          quizTitle: quiz.title,
          category: quiz.category,
          text: q.text,
          code: q.code || null,
          options: q.options,
          correctIndex: q.correctIndex,
          userWrongIndex: selected,
          explanation: q.explanation,
          addedAt: new Date().toISOString()
        });
      }
    });

    const total = quiz.questions.length;
    const scorePct = Math.round((correct / total) * 100);

    const newAttempt = {
      id: 'att-' + Date.now(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      score: scorePct,
      correctCount: correct,
      incorrectCount: incorrect,
      skippedCount: skipped,
      totalQuestions: total,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
      userAnswers: answers
    };

    // Update User State
    setUserData((prev) => {
      // Merge mistakes avoiding duplicates
      const existingIds = new Set(prev.mistakes.map((m) => m.questionId));
      const filteredNewMistakes = mistakesToAdd.filter((m) => !existingIds.has(m.questionId));

      const updatedXP = prev.stats.xp + Math.round(scorePct * 1.5) + 20;

      return {
        ...prev,
        stats: {
          ...prev.stats,
          xp: updatedXP
        },
        attempts: [newAttempt, ...prev.attempts],
        mistakes: [...filteredNewMistakes, ...prev.mistakes]
      };
    });

    setLastCompletedResult({ attempt: newAttempt, quiz });
    setActiveQuizSession(null);
    setCurrentView('results');
    showToast(`Quiz completed! Score: ${scorePct}%`, scorePct >= 70 ? 'success' : 'warning');
  };

  // Render Core Active Page
  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView
          onStartDemo={handleStartDemo}
          onExplore={() => setCurrentView('explore')}
          onLogin={() => setCurrentView('login')}
          onSignUp={() => setCurrentView('signup')}
        />;
      case 'login':
      case 'signup':
        return <AuthView
          mode={currentView}
          onBack={() => setCurrentView('landing')}
          onSwitchMode={() => setCurrentView(currentView === 'login' ? 'signup' : 'login')}
          onSuccess={handleAuthSuccess}
        />;
      case 'dashboard':
        return (
          <DashboardView
            userData={userData}
            quizzes={quizzes}
            onNavigate={(view) => setCurrentView(view)}
            onStartQuiz={handlePrepareQuiz}
          />
        );
      case 'explore':
        return <ExploreView quizzes={quizzes} onSelectQuiz={handlePrepareQuiz} userData={userData} setUserData={setUserData} />;
      case 'details':
        const currentQuiz = quizzes.find((q) => q.id === selectedQuizId);
        return (
          <QuizDetailsView
            quiz={currentQuiz}
            onBack={() => setCurrentView('explore')}
            onStart={() => handleBeginQuiz(currentQuiz)}
          />
        );
      case 'active-quiz':
        return (
          <QuizEngineView
            session={activeQuizSession}
            onCancel={() => {
              if (window.confirm('Are you sure you want to exit? Progress will be lost.')) {
                setCurrentView('dashboard');
              }
            }}
            onSubmit={handleFinishQuiz}
          />
        );
      case 'results':
        return (
          <ResultsView
            result={lastCompletedResult}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onRetry={() => handlePrepareQuiz(lastCompletedResult?.quiz?.id)}
            onOpenMistakes={() => setCurrentView('mistakes')}
          />
        );
      case 'analytics':
        return <AnalyticsView userData={userData} />;
      case 'mistakes':
        return (
          <MistakeNotebookView
            userData={userData}
            setUserData={setUserData}
            onPracticeMistakes={(mistakeQuestions) => {
              const tempQuiz = {
                id: 'temp-mistakes-' + Date.now(),
                title: 'Mistake Revision Session',
                category: 'Targeted Practice',
                difficulty: 'Adaptive',
                duration: 10,
                questions: mistakeQuestions
              };
              handleBeginQuiz(tempQuiz);
            }}
          />
        );
      case 'smart-practice':
        return (
          <SmartPracticeView
            userData={userData}
            quizzes={quizzes}
            onStartSession={(generatedQuiz) => handleBeginQuiz(generatedQuiz)}
          />
        );
      case 'custom-builder':
        return (
          <CustomQuizBuilderView
            onSave={(newQuiz) => {
              setQuizzes([newQuiz, ...quizzes]);
              setUserData((prev) => ({
                ...prev,
                stats: { ...prev.stats, xp: prev.stats.xp + 100 }
              }));
              showToast('Custom Quiz Created (+100 XP)', 'success');
              setCurrentView('explore');
            }}
          />
        );
      case 'planner':
        return <StudyPlannerView userData={userData} setUserData={setUserData} showToast={showToast} />;
      case 'achievements':
        return <AchievementsView userData={userData} />;
      case 'profile':
        return <ProfileView userData={userData} setUserData={setUserData} showToast={showToast} />;
      default:
        return <LandingView
          onStartDemo={handleStartDemo}
          onExplore={() => setCurrentView('explore')}
          onLogin={() => setCurrentView('login')}
          onSignUp={() => setCurrentView('signup')}
        />;
    }
  };

  // Standalone Fullscreen layout for Active Quiz
  if (currentView === 'active-quiz') {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
        {renderCurrentView()}
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDarkMode ? 'bg-[#181928] text-slate-100' : 'bg-[#F7F8FC] text-[#252641]'}`}>
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl bg-slate-900 text-white border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* App Main Shell */}
      {currentView === 'landing' ? (
        renderCurrentView()
      ) : (
        <div className="flex flex-1 min-h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex flex-col border-r ${isDarkMode ? 'bg-[#1E1F35] border-slate-800' : 'bg-white border-slate-200'} z-20`}>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200 dark:shadow-none">
                  Q
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">QUIZORA</span>
                    <span className="block text-[10px] text-slate-400 font-semibold tracking-wider">LEARN & PERFORM</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
              <NavItem icon={<BarChart3 />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} collapsed={sidebarCollapsed} />
              <NavItem icon={<BookOpen />} label="Explore Quizzes" active={currentView === 'explore'} onClick={() => setCurrentView('explore')} collapsed={sidebarCollapsed} />
              <NavItem icon={<Brain />} label="Smart Practice" active={currentView === 'smart-practice'} onClick={() => setCurrentView('smart-practice')} badge="AI" collapsed={sidebarCollapsed} />
              <NavItem icon={<FileText />} label="Mistake Notebook" active={currentView === 'mistakes'} onClick={() => setCurrentView('mistakes')} badge={userData.mistakes.length ? userData.mistakes.length : null} collapsed={sidebarCollapsed} />
              <NavItem icon={<BarChart3 />} label="Analytics" active={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} collapsed={sidebarCollapsed} />
              <NavItem icon={<Calendar />} label="Study Planner" active={currentView === 'planner'} onClick={() => setCurrentView('planner')} collapsed={sidebarCollapsed} />
              <NavItem icon={<Plus />} label="Quiz Builder" active={currentView === 'custom-builder'} onClick={() => setCurrentView('custom-builder')} collapsed={sidebarCollapsed} />
              <NavItem icon={<Award />} label="Achievements" active={currentView === 'achievements'} onClick={() => setCurrentView('achievements')} collapsed={sidebarCollapsed} />
            </nav>

            {/* User Bottom Widget */}
            <div className={`p-3 border-t ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition cursor-pointer" onClick={() => setCurrentView('profile')}>
                <div className="w-9 h-9 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {userData.profile.name.charAt(0)}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate">{userData.profile.name}</p>
                    <p className="text-xs text-slate-400 truncate">{userData.stats.xp} XP • Level 4</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Layout Container */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Navigation Header */}
            <header className={`h-16 px-6 flex items-center justify-between border-b ${isDarkMode ? 'bg-[#1E1F35] border-slate-800' : 'bg-white border-slate-200'} z-10`}>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <List className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold capitalize text-slate-800 dark:text-slate-100">
                  {currentView.replace('-', ' ')}
                </h1>
              </div>

              {/* Header Right Quick Actions */}
              <div className="flex items-center gap-4">
                {/* Streak Counter */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-xs">
                  <Flame className="w-4 h-4 fill-orange-500" />
                  <span>{userData.stats.streak} Day Streak</span>
                </div>

                {/* Theme Switcher */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300"
                  title="Toggle Theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                </button>

                {/* Profile Quick Direct */}
                <button
                  onClick={() => setCurrentView('profile')}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Scrollable View Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-7xl mx-auto space-y-6">
                {renderCurrentView()}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-NAVIGATION ITEM COMPONENT ---
