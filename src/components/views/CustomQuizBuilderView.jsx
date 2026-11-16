import React, { useState } from 'react';

export default function CustomQuizBuilderView({ onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Data Structures & Algorithms');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState(10);
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 'cq-1',
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: 'cq-' + Date.now(),
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: ''
      }
    ]);
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a quiz title');

    const newQuiz = {
      id: 'custom-quiz-' + Date.now(),
      title,
      category,
      difficulty,
      duration: parseInt(duration, 10),
      description: description || 'Custom user created quiz.',
      questions
    };

    onSave(newQuiz);
  };

  return (
    <form onSubmit={handleSaveQuiz} className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Custom Quiz Builder</h2>
        <p className="text-xs text-slate-400">Design custom questions to share or practice privately.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1F35] border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm">Quiz Configuration</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Advanced Graph Algorithms"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
            >
              <option>Data Structures & Algorithms</option>
              <option>Web Development</option>
              <option>Computer Science</option>
              <option>Aptitude</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl transition">
        Save & Publish Quiz
      </button>
    </form>
  );
}

// ==========================================
// 11. STUDY PLANNER VIEW
// ==========================================
