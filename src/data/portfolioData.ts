import { ProfileData, Project, SkillGroup, EducationInfo, ExperienceItem } from '../types';

export const initialProfileData: ProfileData = {
  name: "Shrishti Tiwari",
  titleRole: "Frontend Developer & B.Tech CSE Student",
  shortBio: "Computer Science undergraduate at GLA University passionate about creating clean, intuitive, and interactive web applications with HTML, CSS, JavaScript, React, and Python. Driven by modern UI/UX design and practical problem solving.",
  institution: "GLA University",
  degree: "B.Tech in Computer Science & Engineering",
  batch: "Class of 2025",
  studentIdCode: "GLA-CS2025-TIWARI",
  email: "shrishti.shrishti_cs.h25@gla.ac.in",
  altEmail: "shrishtit392@gmail.com",
  phone: "+91 9876XXXXXX",
  githubUrl: "https://github.com/shrishti-tiwari",
  linkedinUrl: "https://linkedin.com/in/shrishti-tiwari-cs",
  resumeUrl: "#",
  avatarUrl: "/profile.jpeg",
  location: "Mathura / UP, India",
  availableForRoles: true,
};

export const initialProjects: Project[] = [
  {
    id: "proj-weather",
    number: "01",
    title: "Live SkyPulse Weather App",
    tagline: "Interactive Real-Time Weather Forecast & Atmosphere Explorer",
    category: "Frontend",
    description: "A clean, responsive weather application featuring real-time city lookup, animated weather condition badges (Sunny, Rainy, Stormy, Snowy, Cloudy), Celsius/Fahrenheit conversion, humidity gauge, wind speed, UV index, and 5-day predictive forecasts.",
    highlights: [
      "Real-time city search with preset global hubs (Delhi, Mathura, London, Tokyo, New York, Paris)",
      "Interactive °C / °F toggle with dynamic temperature gradients and air quality indicators",
      "5-day forecast cards with precipitation probability and sunrise/sunset timings"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "React", "OpenWeather API", "Tailwind CSS"],
    githubUrl: "https://github.com/shrishti-tiwari/weather-app-live",
    liveUrl: "https://weather-skypulse.demo.app",
    featured: true,
    cartoonIcon: "⛅",
    badge: "Live Interactive App",
    demoType: "weather",
    codeSnippet: {
      language: "javascript",
      filename: "weatherApp.js",
      code: `async function fetchCityWeather(cityName) {
  const apiKey = 'PUBLIC_DEMO_KEY';
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${cityName}&units=metric&appid=\${apiKey}\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
  } catch (error) {
    console.error("Unable to load weather forecast", error);
  }
}`
    },
    architecture: {
      flow: ["Search Input / Geolocation", "Fetch Weather API", "Dynamic UI State Buffer", "Animated Weather Card View"],
      specs: ["Instant City Lookup", "Responsive CSS Flexbox/Grid", "Offline Cache Fallback"]
    }
  },
  {
    id: "proj-todo",
    number: "02",
    title: "TaskFlow Smart Kanban Planner",
    tagline: "Productivity Task Manager with Categories & Progress Analytics",
    category: "JavaScript",
    description: "A feature-rich personal task manager and to-do organizer with category tags (Study, Project, Personal, Urgent), completion filters, priority badges, progress percentage tracking, and persistent localStorage sync.",
    highlights: [
      "Add, edit, check off, and delete tasks with instant animated feedback",
      "Dynamic filter by status (All, Active, Completed) & category tags",
      "Real-time completion progress bar with sound chimes and reward confetti"
    ],
    techStack: ["HTML5", "CSS3 / Modern Flexbox", "JavaScript ES6", "LocalStorage API"],
    githubUrl: "https://github.com/shrishti-tiwari/taskflow-planner",
    liveUrl: "https://taskflow-planner.demo.app",
    featured: true,
    cartoonIcon: "📋",
    badge: "Productivity Tool",
    demoType: "todo",
    codeSnippet: {
      language: "javascript",
      filename: "taskManager.js",
      code: `function toggleTaskStatus(taskId) {
  const updatedTasks = tasks.map(task => {
    if (task.id === taskId) {
      const isCompleted = !task.completed;
      if (isCompleted) triggerConfettiEffect();
      return { ...task, completed: isCompleted };
    }
    return task;
  });
  
  saveTasksToLocalStorage(updatedTasks);
  renderTaskList(updatedTasks);
  updateProgressBar(updatedTasks);
}`
    },
    architecture: {
      flow: ["User Task Input Form", "Category & Priority Classifier", "LocalStorage Persistence", "Real-Time DOM Renderer"],
      specs: ["100% Client-Side", "Zero Latency State", "Local Storage Backup"]
    }
  },
  {
    id: "proj-quiz",
    number: "03",
    title: "DevQuest Web Tech Trivia",
    tagline: "Interactive Gamified Coding Quiz with Countdown & Live Scoring",
    category: "Frontend",
    description: "An engaging quiz application testing HTML, CSS, JavaScript, and Computer Science concepts. Includes a ticking countdown timer, immediate answer explanations, score calculations, cartoon mascots, and celebratory end screens.",
    highlights: [
      "Multi-topic questions across HTML, CSS3, JavaScript, and CS fundamentals",
      "Interactive 15-second countdown timer per question with visual penalty alerts",
      "Score tracker with accuracy percentage, custom feedback badges, and retake option"
    ],
    techStack: ["HTML5", "CSS Animations", "JavaScript", "Audio Web API", "React"],
    githubUrl: "https://github.com/shrishti-tiwari/devquest-trivia-game",
    liveUrl: "https://devquest-quiz.demo.app",
    featured: true,
    cartoonIcon: "🎮",
    badge: "Interactive Game",
    demoType: "quiz",
    codeSnippet: {
      language: "javascript",
      filename: "quizEngine.js",
      code: `function evaluateAnswer(selectedOptionIndex, currentQuestion) {
  const isCorrect = selectedOptionIndex === currentQuestion.correctIndex;
  
  if (isCorrect) {
    userScore += 10;
    playCorrectChime();
  } else {
    playErrorBuzz();
  }
  
  revealExplanation(currentQuestion.explanation);
  highlightCorrectOption(currentQuestion.correctIndex);
}`
    },
    architecture: {
      flow: ["Question Bank Loader", "Timer & State Machine", "Answer Validation Engine", "Score & Mascot Summary"],
      specs: ["Dynamic Question Shuffler", "Sound Effects Feedback", "Responsive Mobile View"]
    }
  },
  {
    id: "proj-palette",
    number: "04",
    title: "ChromaCraft Color Palette Studio",
    tagline: "Modern Palette Generator with 1-Click Hex & CSS Copy",
    category: "Utility",
    description: "A designer and frontend developer companion for generating harmonic color schemes, warm gradients, complementary palettes, and instant CSS linear-gradient code exports.",
    highlights: [
      "Spacebar / Click instant palette generator with lockable color swatches",
      "1-click copy for HEX, RGB, and CSS linear-gradient values with toast confirmation",
      "Preset curated color themes (Cyberpunk, Sunset Amber, Pastel, Monokai, Minimalist)"
    ],
    techStack: ["HTML5", "CSS3 Variables", "JavaScript", "Clipboard API"],
    githubUrl: "https://github.com/shrishti-tiwari/chromacraft-color-studio",
    liveUrl: "https://chromacraft.demo.app",
    featured: true,
    cartoonIcon: "🎨",
    badge: "Design Utility",
    demoType: "palette",
    codeSnippet: {
      language: "javascript",
      filename: "paletteGenerator.js",
      code: `function generateHarmonicPalette() {
  const hue = Math.floor(Math.random() * 360);
  return [
    hslToHex(hue, 85, 55),
    hslToHex((hue + 30) % 360, 75, 50),
    hslToHex((hue + 60) % 360, 80, 60),
    hslToHex((hue + 180) % 360, 90, 45),
    hslToHex((hue + 210) % 360, 65, 30)
  ];
}`
    },
    architecture: {
      flow: ["Color Math Generator", "HSL to Hex Converter", "Interactive Swatch Renderer", "Clipboard Exporter"],
      specs: ["Harmonic Color Schemes", "1-Click Copy", "Custom Contrast Check"]
    }
  },
  {
    id: "proj-calculator",
    number: "05",
    title: "Smart Split & Tip Calculator",
    tagline: "Clean Financial Splitter with Custom Tip % & Currency Selector",
    category: "Utility",
    description: "A slick, intuitive utility for calculating restaurant bills, service tips, and per-person split amounts in real-time with customizable tip sliders, rounding toggles, and currency choices (₹ INR, $ USD, € EUR, £ GBP).",
    highlights: [
      "Real-time reactive calculation on every input change with zero lag",
      "Custom tip percentage buttons (5%, 10%, 15%, 20%, 25%) plus manual custom slider",
      "Clear bill breakdown showing Tip Total, Grand Total, and Per-Person share"
    ],
    techStack: ["HTML5", "CSS Grid", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/shrishti-tiwari/smart-split-calculator",
    liveUrl: "https://smart-split.demo.app",
    featured: true,
    cartoonIcon: "💰",
    badge: "Financial Tool",
    demoType: "calculator",
    codeSnippet: {
      language: "javascript",
      filename: "splitCalculator.js",
      code: `function calculateBillSplit(billAmount, tipPercentage, numPeople) {
  if (numPeople <= 0) return { tipTotal: 0, grandTotal: 0, perPerson: 0 };
  
  const tipAmount = (billAmount * tipPercentage) / 100;
  const grandTotal = billAmount + tipAmount;
  const perPerson = grandTotal / numPeople;
  
  return {
    tipTotal: tipAmount.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
    perPerson: perPerson.toFixed(2)
  };
}`
    },
    architecture: {
      flow: ["Bill & Tip Input Listener", "Mathematical Calculation Engine", "Currency Formatter", "Summary Breakdown Card"],
      specs: ["Instant Calculation", "Multi-Currency Support", "Round-Up Helper"]
    }
  },
  {
    id: "proj-timer",
    number: "06",
    title: "FocusPomo Digital Stopwatch & Timer",
    tagline: "Pomodoro Focus Timer & Precision Stopwatch with Lap Logs",
    category: "JavaScript",
    description: "A productivity timer with dual modes: a 25-minute Pomodoro study sprint with break intervals, and a millisecond precision digital stopwatch with lap recording and reset controls.",
    highlights: [
      "Pomodoro study mode (25m Focus / 5m Break) with progress circle animation",
      "Precision stopwatch with millisecond counter and recorded lap splits",
      "Sound alerts and focus reminder notifications"
    ],
    techStack: ["HTML5", "CSS Animations", "JavaScript", "Web Audio API"],
    githubUrl: "https://github.com/shrishti-tiwari/focus-pomo-timer",
    liveUrl: "https://focus-pomo.demo.app",
    featured: true,
    cartoonIcon: "⏱️",
    badge: "Focus Tool",
    demoType: "timer",
    codeSnippet: {
      language: "javascript",
      filename: "timerEngine.js",
      code: `function startPomodoroTimer(durationSeconds) {
  let remaining = durationSeconds;
  
  timerInterval = setInterval(() => {
    remaining--;
    updateTimerDisplay(remaining);
    
    if (remaining <= 0) {
      clearInterval(timerInterval);
      playAlarmChime();
      alert("Session Complete! Time for a refreshing break.");
    }
  }, 1000);
}`
    },
    architecture: {
      flow: ["Interval Timer State", "Audio Trigger Service", "Lap Recorder Buffer", "Digital Display View"],
      specs: ["Sub-10ms Precision", "Background Safe", "Sound Chimes"]
    }
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Core",
    description: "Building responsive, semantic, and highly interactive user interfaces.",
    cartoonIcon: "✨",
    skills: [
      {
        name: "HTML5",
        level: 96,
        experience: "3+ Years",
        tag: "Semantic Structure, Forms, Accessibility, SEO, Canvas",
        iconName: "FileCode2",
        cartoonBadge: "🌐",
        snippet: "<main class=\"container\">\n  <section id=\"hero\" aria-label=\"Introduction\">\n    <h1>Hello, World!</h1>\n  </section>\n</main>"
      },
      {
        name: "CSS3 & Styling",
        level: 94,
        experience: "3+ Years",
        tag: "Flexbox, CSS Grid, Keyframe Animations, Transitions, Variables",
        iconName: "Palette",
        cartoonBadge: "🎨",
        snippet: ".hero-badge {\n  display: flex;\n  align-items: center;\n  background: #facc15;\n  color: #000;\n  border-radius: 9999px;\n}"
      },
      {
        name: "JavaScript (ES6+)",
        level: 92,
        experience: "2.5+ Years",
        tag: "DOM Manipulation, Fetch API, Async/Await, Events, Array Methods",
        iconName: "Code2",
        cartoonBadge: "⚡",
        snippet: "const activeTasks = tasks.filter(task => !task.completed);\nconsole.log(`Remaining tasks: ${activeTasks.length}`);"
      },
      {
        name: "Tailwind CSS",
        level: 95,
        experience: "2+ Years",
        tag: "Utility Styling, Responsive Layouts, Yellow-Black Theme, Animations",
        iconName: "Palette",
        cartoonBadge: "🚀",
        snippet: "className=\"bg-black text-white border-2 border-yellow-400 p-6 rounded-2xl shadow-lg\""
      }
    ]
  },
  {
    category: "Frameworks & Libraries",
    description: "Modern component-driven development and rich UI ecosystems.",
    cartoonIcon: "⚛️",
    skills: [
      {
        name: "React.js",
        level: 90,
        experience: "2+ Years",
        tag: "Hooks (useState, useEffect, useMemo), Props, Custom Components",
        iconName: "Layers",
        cartoonBadge: "⚛️",
        snippet: "const [weather, setWeather] = useState({ city: 'Mathura', temp: 28, condition: 'Sunny' });"
      },
      {
        name: "TypeScript",
        level: 88,
        experience: "1.5+ Years",
        tag: "Static Typing, Interfaces, Generics, Component Props Safety",
        iconName: "Code2",
        cartoonBadge: "🛡️",
        snippet: "interface WeatherData {\n  city: string;\n  tempCelsius: number;\n  humidity: number;\n}"
      },
      {
        name: "Responsive & Mobile UI",
        level: 95,
        experience: "3+ Years",
        tag: "Mobile-First Design, Breakpoints, Touch Targets, Cross-Browser Testing",
        iconName: "Monitor",
        cartoonBadge: "📱",
        snippet: "@media (max-width: 768px) {\n  .grid-container { grid-template-columns: 1fr; }\n}"
      }
    ]
  },
  {
    category: "Programming & Backend",
    description: "Scripting, algorithm problem solving, and API fundamentals.",
    cartoonIcon: "💻",
    skills: [
      {
        name: "Python",
        level: 90,
        experience: "3+ Years",
        tag: "Data Structures, Automation, Scripting, Basic AI/ML concepts",
        iconName: "FileCode2",
        cartoonBadge: "🐍",
        snippet: "def get_top_scores(students):\n    return sorted(students, key=lambda x: x['gpa'], reverse=True)[:5]"
      },
      {
        name: "Java",
        level: 88,
        experience: "2.5+ Years",
        tag: "Object-Oriented Programming, Classes, Inheritance, Collections",
        iconName: "Cpu",
        cartoonBadge: "☕",
        snippet: "public class Student {\n    private String name;\n    private double cgpa;\n}"
      },
      {
        name: "SQL & Databases",
        level: 86,
        experience: "2+ Years",
        tag: "MySQL, PostgreSQL, Table Joins, Aggregate Functions, Queries",
        iconName: "Database",
        cartoonBadge: "🗄️",
        snippet: "SELECT department, COUNT(*) FROM students GROUP BY department;"
      }
    ]
  },
  {
    category: "Tools & Workflow",
    description: "Version control, collaboration, package management, and developer tools.",
    cartoonIcon: "🛠️",
    skills: [
      {
        name: "Git & GitHub",
        level: 94,
        experience: "3+ Years",
        tag: "Branching, Pull Requests, Merge Conflict Resolution, GitHub Pages",
        iconName: "GitBranch",
        cartoonBadge: "🐙",
        snippet: "git checkout -b feature/weather-card\ngit commit -m 'feat: add 5-day forecast'"
      },
      {
        name: "VS Code & DevTools",
        level: 95,
        experience: "3+ Years",
        tag: "Chrome DevTools, Console Debugging, Network Tab, Lighthouse",
        iconName: "Terminal",
        cartoonBadge: "🔍",
        snippet: "console.table(taskList);\n// Inspecting performance metrics"
      },
      {
        name: "NPM & Build Tools",
        level: 88,
        experience: "2+ Years",
        tag: "Vite, Package Management, Scripts, Asset Optimization",
        iconName: "Boxes",
        cartoonBadge: "📦",
        snippet: "npm create vite@latest my-app -- --template react-ts"
      }
    ]
  }
];

export const educationInfo: EducationInfo = {
  degree: "Bachelor of Technology (B.Tech)",
  specialization: "Computer Science & Engineering",
  institution: "GLA University, Mathura",
  batch: "2021 – 2025",
  duration: "4 Years (Undergraduate)",
  status: "Final Year Student (Graduating 2025)",
  milestones: [
    {
      institution: "GLA University, Mathura",
      degree: "Bachelor of Technology (B.Tech) - Computer Science & Engineering",
      location: "Mathura, Uttar Pradesh",
      period: "2021 – 2025",
      scoreOrGrade: "8.6+ CGPA / First Class with Distinction",
      badge: "Current / Graduation 2025",
      cartoonEmoji: "🎓",
      description: "Pursuing rigorous computer science degree with focus on Web Development, Algorithms, Database Systems, and Object-Oriented Software Design.",
      keySubjects: [
        "Data Structures & Algorithms",
        "Web Technologies (HTML, CSS, JS)",
        "Database Management Systems (SQL)",
        "Object-Oriented Programming (Java/Python)",
        "Computer Networks",
        "Software Engineering"
      ],
      achievements: [
        "Developed multiple interactive web applications & utility tools",
        "Active participant in collegiate coding hackathons & technical fests",
        "Academic honors batch: CS.H25"
      ]
    },
    {
      institution: "Senior Secondary School Education (10+2)",
      degree: "Class XII (Senior Secondary) - Science & Mathematics (PCM)",
      location: "Uttar Pradesh",
      period: "2019 – 2021",
      scoreOrGrade: "Distinction in Physics, Chemistry & Mathematics",
      badge: "Completed with Distinction",
      cartoonEmoji: "🏫",
      description: "Completed higher secondary education with strong analytical foundation in Mathematics, Physics, Chemistry, and Computer Science fundamentals.",
      keySubjects: ["Mathematics", "Physics", "Chemistry", "English", "Computer Fundamentals"],
      achievements: [
        "Consistently ranked in top percentiles in Mathematics & Science",
        "Participated in inter-school science exhibitions & quiz competitions"
      ]
    },
    {
      institution: "Secondary School Examination (Class X)",
      degree: "High School Examination (CBSE / State Board)",
      location: "Uttar Pradesh",
      period: "2018 – 2019",
      scoreOrGrade: "High Distinction Honors",
      badge: "Completed",
      cartoonEmoji: "📚",
      description: "Solid academic foundation with distinction across Science, Mathematics, and Languages.",
      keySubjects: ["Science", "Mathematics", "Social Studies", "English", "Hindi"],
      achievements: ["Academic Excellence Award for overall top performance"]
    }
  ],
  coursework: [
    {
      name: "Web Development & Frontend Design",
      grade: "A+ / Honors",
      desc: "HTML5 semantic markup, CSS3 layouts (Flex/Grid), responsive design, and JavaScript DOM manipulation.",
      icon: "🌐"
    },
    {
      name: "Data Structures & Algorithms",
      grade: "A Grade",
      desc: "Arrays, Linked Lists, Trees, Graphs, Sorting algorithms, Big-O asymptotic analysis, and problem-solving.",
      icon: "🧩"
    },
    {
      name: "Database Management Systems (DBMS)",
      grade: "A Grade",
      desc: "Relational schema design, SQL querying, normalization (1NF to BCNF), indexing, and transaction ACID properties.",
      icon: "🗄️"
    },
    {
      name: "Object-Oriented Programming (Java & Python)",
      grade: "A+ Grade",
      desc: "Inheritance, polymorphism, encapsulation, abstraction, exception handling, and design patterns.",
      icon: "☕"
    },
    {
      name: "Computer Networks & Protocols",
      grade: "A Grade",
      desc: "OSI & TCP/IP stack, HTTP/HTTPS, DNS, WebSockets, IP addressing, and client-server architecture.",
      icon: "📡"
    },
    {
      name: "Software Engineering & Agile",
      grade: "A Grade",
      desc: "SDLC methodologies, Git version control, unit testing, requirements engineering, and CI/CD pipelines.",
      icon: "⚙️"
    }
  ],
  highlights: [
    "GLA University B.Tech Computer Science & Engineering Undergraduate",
    "Strong hands-on experience building interactive web applications with modern HTML, CSS, JavaScript, and React",
    "Passionate about clean code, intuitive UI/UX design, and practical software utilities"
  ]
};

export const academicExperience: ExperienceItem[] = [
  {
    role: "Frontend Developer & Student Engineer",
    organization: "GLA University Project Labs",
    period: "2022 – Present",
    type: "Academic & Projects",
    cartoonIcon: "👩‍💻",
    description: "Built and deployed multiple responsive web applications including live weather tools, task managers, quizzes, and calculators with clean UI and interactive state.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Git"]
  },
  {
    role: "Technical Team Member & Hackathon Participant",
    organization: "Collegiate Tech Club",
    period: "2023 – 2024",
    type: "Co-Curricular",
    cartoonIcon: "🚀",
    description: "Collaborated in multi-member teams during hackathons to design intuitive user interfaces and rapid prototypes for student utilities.",
    skills: ["Teamwork", "UI/UX Prototyping", "Rapid Development", "Problem Solving"]
  },
  {
    role: "Peer Coding Assistant",
    organization: "GLA University Study Groups",
    period: "2023 – Present",
    type: "Mentorship",
    cartoonIcon: "💡",
    description: "Helped junior students understand HTML/CSS responsive layouts, JavaScript fundamentals, and Git workflow best practices.",
    skills: ["Mentorship", "Code Review", "Debugging", "Communication"]
  }
];
