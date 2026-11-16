# Quizora React project

This project separates the original Quizora single-file React app into data, layout, reusable UI, and page components.

## Run locally

1. Install Node.js (LTS) if it is not already installed.
2. Open this folder in VS Code.
3. In the VS Code terminal, run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite.

## Folder structure

```text
quizora-react/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── data/
    │   └── initialData.js
    └── components/
        ├── layout/
        │   └── NavItem.jsx
        ├── ui/
        │   ├── FeatureCard.jsx
        │   └── MetricCard.jsx
        └── views/
            ├── AuthView.jsx\n            ├── LandingView.jsx
            ├── DashboardView.jsx
            ├── ExploreView.jsx
            ├── QuizDetailsView.jsx
            ├── QuizEngineView.jsx
            ├── ResultsView.jsx
            ├── AnalyticsView.jsx
            ├── MistakeNotebookView.jsx
            ├── SmartPracticeView.jsx
            ├── CustomQuizBuilderView.jsx
            ├── StudyPlannerView.jsx
            ├── AchievementsView.jsx
            └── ProfileView.jsx
```

## Notes

- The original JSX uses Tailwind CSS utility classes, so Tailwind is configured.
- Quiz data and demo user data are in `src/data/initialData.js`.
- Each major screen is in its own file under `src/components/views/`.
- `App.jsx` owns navigation, shared state, localStorage persistence, and quiz completion.
- The original source's demo content and behavior have been retained as closely as possible.

## Authentication note

Login and sign-up screens are included as a front-end demo. They save demo accounts in browser localStorage, so this is not secure production authentication. For a real deployment, connect a backend/auth provider and never store plaintext passwords in localStorage.
