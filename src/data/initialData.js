// --- DESIGN TOKENS & SYSTEM INITIALIZATION ---
export const SYSTEM_THEME_KEY = 'quizora_theme';
export const LOCAL_DATA_KEY = 'quizora_app_state_v1';

// Initial Mock Question Bank
export const INITIAL_QUIZZES = [
  {
    id: 'quiz-dsa-1',
    title: 'Data Structures & Algorithms Fundamentals',
    category: 'Data Structures & Algorithms',
    difficulty: 'Intermediate',
    duration: 10, // minutes
    description: 'Master core concepts of BSTs, Hash Tables, Big-O Notation, and Graph traversals.',
    questions: [
      {
        id: 'q-dsa-1',
        text: 'What is the average time complexity of searching for an element in a balanced Binary Search Tree (BST)?',
        code: null,
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 1,
        explanation: 'In a balanced BST, the height of the tree is log(n). Each comparison eliminates half of the remaining nodes, yielding O(log n) time complexity.'
      },
      {
        id: 'q-dsa-2',
        text: 'Which data structure uses LIFO (Last In First Out) ordering?',
        code: null,
        options: ['Queue', 'Priority Queue', 'Stack', 'Array List'],
        correctIndex: 2,
        explanation: 'A Stack strictly operates on Last In, First Out (LIFO) discipline, where the last pushed element is the first to be popped.'
      },
      {
        id: 'q-dsa-3',
        text: 'What happens when two distinct keys hash to the same index in a Hash Table?',
        code: null,
        options: ['Hash Overflow', 'Collision', 'Segmentation Fault', 'Re-hashing Exception'],
        correctIndex: 1,
        explanation: 'When two keys produce the same hash index, it is termed a Hash Collision. Techniques like chaining or open addressing resolve this.'
      },
      {
        id: 'q-dsa-4',
        text: 'Analyze the worst-case space complexity of Depth-First Search (DFS) on a tree of max depth H:',
        code: 'function dfs(node) {\n  if(!node) return;\n  visit(node);\n  dfs(node.left);\n  dfs(node.right);\n}',
        options: ['O(1)', 'O(V + E)', 'O(H)', 'O(N^2)'],
        correctIndex: 2,
        explanation: 'The function call stack holds frames corresponding to the current path from root to leaf, leading to O(H) auxiliary space complexity.'
      },
      {
        id: 'q-dsa-5',
        text: 'Which algorithm is guaranteed to find the shortest path in an unweighted graph?',
        code: null,
        options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Prim Algorithm', 'Bellman-Ford Algorithm'],
        correctIndex: 0,
        explanation: 'BFS explores nodes layer by layer from the starting vertex, ensuring the shortest path in terms of edge count is discovered first.'
      }
    ]
  },
  {
    id: 'quiz-web-1',
    title: 'Modern Web Development & React Standards',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: 8,
    description: 'Test your knowledge of ES6+, React Hooks, CSS Layouts, and async handling.',
    questions: [
      {
        id: 'q-web-1',
        text: 'Which React hook should be used to perform side effects like fetching data or subscribing to events?',
        code: null,
        options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
        correctIndex: 2,
        explanation: 'useEffect is specifically designed to manage side effects in functional components after renders.'
      },
      {
        id: 'q-web-2',
        text: 'What will be logged to the console by executing the snippet below?',
        code: 'console.log(typeof typeof 1);',
        options: ['"number"', '"string"', '"undefined"', 'SyntaxError'],
        correctIndex: 1,
        explanation: 'typeof 1 returns "number". Then typeof "number" evaluates to "string".'
      },
      {
        id: 'q-web-3',
        text: 'In CSS Flexbox, which property aligns flex items along the cross axis?',
        code: null,
        options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
        correctIndex: 1,
        explanation: 'justify-content controls main-axis alignment, whereas align-items controls cross-axis alignment.'
      },
      {
        id: 'q-web-4',
        text: 'What is the primary benefit of using React.memo on a component?',
        code: null,
        options: [
          'It automatically handles asynchronous state updates',
          'It prevents re-renders when props remain unchanged',
          'It binds methods to the component instance',
          'It converts class components into functional components'
        ],
        correctIndex: 1,
        explanation: 'React.memo is a higher-order component that memoizes render output to prevent unnecessary re-renders when props do not change.'
      },
      {
        id: 'q-web-5',
        text: 'Which status code represents a successful resource creation in HTTP REST APIs?',
        code: null,
        options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
        correctIndex: 1,
        explanation: 'HTTP 201 Created indicates that the request succeeded and resulted in the creation of a new resource.'
      }
    ]
  },
  {
    id: 'quiz-sec-1',
    title: 'Computer Networks & Network Security',
    category: 'Computer Science',
    difficulty: 'Advanced',
    duration: 12,
    description: 'Deep dive into OSI layers, transport protocol mechanics, DNS, and encryption standard practice.',
    questions: [
      {
        id: 'q-sec-1',
        text: 'At which OSI layer does the Router primarily operate?',
        code: null,
        options: ['Layer 2 - Data Link', 'Layer 3 - Network', 'Layer 4 - Transport', 'Layer 7 - Application'],
        correctIndex: 1,
        explanation: 'Routers route packets based on IP addresses, operating at Layer 3 (Network Layer).'
      },
      {
        id: 'q-sec-2',
        text: 'Which key mechanism distinguishes TCP from UDP protocol?',
        code: null,
        options: [
          'TCP is connectionless and faster',
          'TCP provides reliable, ordered stream delivery via handshakes',
          'UDP enforces strict flow control and windowing',
          'TCP operates at the Application Layer'
        ],
        correctIndex: 1,
        explanation: 'TCP guarantees packet delivery and ordering using sequence numbers and 3-way handshakes, whereas UDP is connectionless and lightweight.'
      },
      {
        id: 'q-sec-3',
        text: 'Which cryptographic approach uses a pair of public and private keys?',
        code: null,
        options: ['Symmetric Encryption', 'Asymmetric Encryption', 'AES-256 Hashing', 'HMAC SHA-256'],
        correctIndex: 1,
        explanation: 'Asymmetric encryption (e.g. RSA, ECC) relies on mathematically linked public and private key pairs.'
      },
      {
        id: 'q-sec-4',
        text: 'What attack vector involves injecting malicious SQL commands into input fields to manipulate database queries?',
        code: null,
        options: ['Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'SQL Injection (SQLi)', 'Buffer Overflow'],
        correctIndex: 2,
        explanation: 'SQL Injection exploits unvalidated database input inputs to execute unauthorized database queries.'
      },
      {
        id: 'q-sec-5',
        text: 'What is the primary role of DNS in web communications?',
        code: null,
        options: [
          'Encrypting web traffic between client and server',
          'Mapping human-friendly domain names to IP addresses',
          'Balancing server loads across geographic regions',
          'Caching HTML content on local proxies'
        ],
        correctIndex: 1,
        explanation: 'Domain Name System (DNS) translates user-friendly hostnames (e.g. quizora.edu) into computer-understandable IP addresses.'
      }
    ]
  },
  {
    id: 'quiz-apt-1',
    title: 'Logical Reasoning & Quantitative Aptitude',
    category: 'Aptitude',
    difficulty: 'Beginner',
    duration: 10,
    description: 'Sharpen your analytical speed, numerical accuracy, and pattern recognition capability.',
    questions: [
      {
        id: 'q-apt-1',
        text: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
        code: null,
        options: ['125', '127', '129', '131'],
        correctIndex: 1,
        explanation: 'Each step follows the rule (x * 2) + 1. Therefore, (63 * 2) + 1 = 127.'
      },
      {
        id: 'q-apt-2',
        text: 'If 6 workers can complete a project in 12 days, how many days will 9 workers take working at the same pace?',
        code: null,
        options: ['6 days', '8 days', '9 days', '10 days'],
        correctIndex: 1,
        explanation: 'Total Work = 6 * 12 = 72 worker-days. Time taken by 9 workers = 72 / 9 = 8 days.'
      },
      {
        id: 'q-apt-3',
        text: 'A car travels at 60 km/h for the first half of the distance and 40 km/h for the second half. What is its average speed?',
        code: null,
        options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
        correctIndex: 0,
        explanation: 'Average speed for equal distance legs = (2 * v1 * v2) / (v1 + v2) = (2 * 60 * 40) / 100 = 48 km/h.'
      },
      {
        id: 'q-apt-4',
        text: 'Look at the sequence: CAT, FDW, IGZ, ____. Which word completes the pattern?',
        code: null,
        options: ['LJC', 'LKC', 'MJD', 'KIB'],
        correctIndex: 0,
        explanation: '1st letters +3 (C->F->I->L), 2nd letters +2 (A->D->G->J), 3rd letters +3 (T->W->Z->C). Result: LJC.'
      },
      {
        id: 'q-apt-5',
        text: 'A item is bought for $80 and sold for $100. What is the profit percentage?',
        code: null,
        options: ['20%', '25%', '30%', '15%'],
        correctIndex: 1,
        explanation: 'Profit = $20. Profit % = (20 / 80) * 100 = 25%.'
      }
    ]
  }
];

export const INITIAL_USER_STATE = {
  profile: {
    name: 'Sarah Jenkins',
    email: 'sarah.j@university.edu',
    avatar: null,
    targetDailyQuizzes: 3,
    preferredCategory: 'Data Structures & Algorithms',
    examDate: '2026-11-20'
  },
  stats: {
    xp: 450,
    streak: 7,
    lastActiveDate: new Date().toISOString().split('T')[0]
  },
  attempts: [
    {
      id: 'att-101',
      quizId: 'quiz-dsa-1',
      quizTitle: 'Data Structures & Algorithms Fundamentals',
      category: 'Data Structures & Algorithms',
      score: 80,
      correctCount: 4,
      incorrectCount: 1,
      skippedCount: 0,
      totalQuestions: 5,
      timeSpentSeconds: 280,
      completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      userAnswers: { 'q-dsa-1': 1, 'q-dsa-2': 2, 'q-dsa-3': 1, 'q-dsa-4': 0, 'q-dsa-5': 0 }
    },
    {
      id: 'att-102',
      quizId: 'quiz-web-1',
      quizTitle: 'Modern Web Development & React Standards',
      category: 'Web Development',
      score: 100,
      correctCount: 5,
      incorrectCount: 0,
      skippedCount: 0,
      totalQuestions: 5,
      timeSpentSeconds: 210,
      completedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      userAnswers: { 'q-web-1': 2, 'q-web-2': 1, 'q-web-3': 1, 'q-web-4': 1, 'q-web-5': 1 }
    }
  ],
  mistakes: [
    {
      questionId: 'q-dsa-4',
      quizId: 'quiz-dsa-1',
      quizTitle: 'Data Structures & Algorithms Fundamentals',
      category: 'Data Structures & Algorithms',
      text: 'Analyze the worst-case space complexity of Depth-First Search (DFS) on a tree of max depth H:',
      code: 'function dfs(node) {\n  if(!node) return;\n  visit(node);\n  dfs(node.left);\n  dfs(node.right);\n}',
      options: ['O(1)', 'O(V + E)', 'O(H)', 'O(N^2)'],
      correctIndex: 2,
      userWrongIndex: 0,
      explanation: 'The function call stack holds frames corresponding to the current path from root to leaf, leading to O(H) auxiliary space complexity.',
      addedAt: new Date().toISOString()
    }
  ],
  bookmarks: ['quiz-sec-1'],
  studyPlan: [
    { id: 'sp-1', title: 'Revise Graph Traversals (BFS & DFS)', date: new Date().toISOString().split('T')[0], category: 'Data Structures & Algorithms', completed: false },
    { id: 'sp-2', title: 'Complete Networks & Protocols Quiz', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], category: 'Computer Science', completed: false },
    { id: 'sp-3', title: 'Review Time Complexities of Sorting', date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], category: 'Data Structures & Algorithms', completed: true }
  ],
  achievements: [
    { id: 'ach-1', title: 'First Steps', desc: 'Completed your first quiz attempt', icon: 'Zap', unlocked: true, unlockedAt: '2 days ago' },
    { id: 'ach-2', title: 'Streak Master 7D', desc: 'Maintained a 7-day study streak', icon: 'Flame', unlocked: true, unlockedAt: 'Today' },
    { id: 'ach-3', title: 'Perfectionist', desc: 'Scored 100% on any quiz', icon: 'Trophy', unlocked: true, unlockedAt: 'Yesterday' },
    { id: 'ach-4', title: 'Speed Demon', desc: 'Finished a quiz in under half the allocated time', icon: 'Clock', unlocked: false },
    { id: 'ach-5', title: 'Quiz Creator', desc: 'Built and published your own custom quiz', icon: 'Plus', unlocked: false }
  ]
};
