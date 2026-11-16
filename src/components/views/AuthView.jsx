import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';

export default function AuthView({ mode, onSwitchMode, onBack, onSuccess }) {
  const isSignup = mode === 'signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) return setError('Please enter your email and password.');
    if (isSignup && !name.trim()) return setError('Please enter your name.');
    if (isSignup && password.length < 6) return setError('Password must be at least 6 characters.');
    if (isSignup && password !== confirmPassword) return setError('Passwords do not match.');

    let users = [];
    try { users = JSON.parse(localStorage.getItem('quizora_demo_users') || '[]'); } catch { users = []; }

    if (isSignup) {
      if (users.some((user) => user.email === normalizedEmail)) return setError('An account with this email already exists. Please sign in.');
      const user = { name: name.trim(), email: normalizedEmail, password };
      localStorage.setItem('quizora_demo_users', JSON.stringify([...users, user]));
      onSuccess({ name: user.name, email: user.email });
    } else {
      const user = users.find((item) => item.email === normalizedEmail && item.password === password);
      if (!user) return setError('Email or password is incorrect. Create an account first if you are new.');
      onSuccess({ name: user.name, email: user.email });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-9 shadow-2xl shadow-indigo-950/40">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
            <BookOpen className="h-7 w-7" />
          </div>
          <div className="text-center mb-8">
            <p className="text-sm font-extrabold tracking-[0.2em] text-indigo-400">QUIZORA</p>
            <h1 className="mt-3 text-2xl font-extrabold">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
            <p className="mt-2 text-sm text-slate-400">{isSignup ? 'Start your learning journey today.' : 'Sign in to continue your learning journey.'}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Full name</span>
                <span className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3">
                  <UserRound className="h-4 w-4 text-slate-500" />
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-600" />
                </span>
              </label>
            )}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Email address</span>
              <span className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-600" />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
              <span className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3">
                <LockKeyhole className="h-4 w-4 text-slate-500" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder={isSignup ? 'At least 6 characters' : 'Enter your password'} className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-600" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-500 hover:text-white" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            {isSignup && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Confirm password</span>
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" placeholder="Re-enter password" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500" />
              </label>
            )}
            {error && <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold transition hover:bg-indigo-500">
              {isSignup ? 'Create account' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={onSwitchMode} className="font-semibold text-indigo-400 hover:text-indigo-300">{isSignup ? 'Sign in' : 'Sign up'}</button>
          </p>
          <p className="mt-5 text-center text-xs leading-relaxed text-slate-600">
            Demo authentication only: account details are stored in this browser. Do not use a real or reused password.
          </p>
        </div>
      </div>
    </div>
  );
}
