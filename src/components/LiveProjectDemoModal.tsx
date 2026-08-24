import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import {
  X, ExternalLink, Play, CheckCircle2, RefreshCw, Volume2, VolumeX,
  Sparkles, Plus, Trash2, Check, Clock, CloudSun, Wind, Droplets,
  Sun, Moon, Award, ArrowRight, Share2, Copy
} from 'lucide-react';

interface LiveProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const LiveProjectDemoModal: React.FC<LiveProjectDemoModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'app' | 'code' | 'specs'>('app');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const copyCode = (codeStr: string) => {
    navigator.clipboard.writeText(codeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-zinc-950 border-2 border-yellow-400/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-1.5 bg-yellow-400/20 border border-yellow-400/40 rounded-xl">
              {project.cartoonIcon || '⚡'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
                <span className="px-2 py-0.5 text-xs font-extrabold bg-yellow-400 text-black rounded-md">
                  LIVE INTERACTIVE
                </span>
              </div>
              <p className="text-xs text-zinc-400">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('app')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'app' ? 'bg-yellow-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                🎮 Live App
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'code' ? 'bg-yellow-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                💻 Source Code
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'specs' ? 'bg-yellow-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ⚙️ Architecture
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-black hover:bg-yellow-400 transition-colors ml-2"
              title="Close Demo"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-950 text-white">
          {activeTab === 'app' && (
            <div className="w-full">
              {project.demoType === 'weather' && <LiveWeatherApp />}
              {project.demoType === 'todo' && <LiveTodoApp />}
              {project.demoType === 'quiz' && <LiveQuizApp />}
              {project.demoType === 'palette' && <LivePaletteApp />}
              {project.demoType === 'calculator' && <LiveSplitCalculator />}
              {project.demoType === 'timer' && <LiveTimerApp />}
              {project.demoType === 'external' && (
                <div className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-xl">
                  <span className="text-4xl mb-3 block">🚀</span>
                  <h4 className="text-lg font-bold text-white mb-2">Live Demo Sandbox</h4>
                  <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">
                    This project is hosted on cloud infrastructure. Launch the live demo directly or explore the repository.
                  </p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
                    >
                      <span>Explore GitHub Repository</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-zinc-900 px-4 py-2.5 rounded-t-xl border border-zinc-800">
                <span className="text-xs font-mono text-yellow-400">
                  {project.codeSnippet?.filename || 'main.js'}
                </span>
                <button
                  onClick={() => copyCode(project.codeSnippet?.code || '')}
                  className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  {copied ? <Check size={14} className="text-yellow-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-b-xl overflow-x-auto text-xs font-mono text-zinc-200 leading-relaxed">
                <code>{project.codeSnippet?.code || '// Code preview not available'}</code>
              </pre>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>✨ Key Highlights</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🛠️ Tech Stack & Libraries</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-semibold bg-zinc-800 border border-zinc-700 text-white rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {project.architecture && (
                <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">
                    📐 Data Flow & Architecture Pipeline
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {project.architecture.flow.map((step, i) => (
                      <div key={i} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-center">
                        <span className="text-xs text-yellow-400 font-mono font-bold block mb-1">
                          Step 0{i + 1}
                        </span>
                        <span className="text-xs text-zinc-200 font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Running in Sandbox Mode</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-yellow-400 font-semibold inline-flex items-center gap-1.5"
            >
              <span>GitHub Code</span>
              <ExternalLink size={13} />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors"
            >
              Done Testing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   1. LIVE WEATHER APP DEMO
   ========================================================================= */
const CITIES_WEATHER_DATA: Record<string, { tempC: number; condition: string; desc: string; icon: string; humidity: number; wind: number; uv: number; airQuality: string }> = {
  "Mathura": { tempC: 32, condition: "Sunny", desc: "Clear Blue Skies over Yamuna Ghats", icon: "☀️", humidity: 45, wind: 12, uv: 8, airQuality: "Moderate" },
  "Delhi": { tempC: 34, condition: "Partly Cloudy", desc: "Warm breeze with high visibility", icon: "⛅", humidity: 50, wind: 14, uv: 7, airQuality: "Moderate" },
  "London": { tempC: 18, condition: "Light Rain", desc: "Gentle drizzle over Westminster", icon: "🌧️", humidity: 82, wind: 22, uv: 3, airQuality: "Excellent" },
  "Tokyo": { tempC: 22, condition: "Clear", desc: "Crisp sunny afternoon in Shibuya", icon: "☀️", humidity: 55, wind: 8, uv: 6, airQuality: "Good" },
  "New York": { tempC: 24, condition: "Sunny", desc: "Bright sunshine across Manhattan", icon: "🌤️", humidity: 48, wind: 16, uv: 7, airQuality: "Good" },
  "Paris": { tempC: 20, condition: "Cloudy", desc: "Soft overcast clouds over Eiffel", icon: "☁️", humidity: 68, wind: 10, uv: 4, airQuality: "Good" },
  "Bengaluru": { tempC: 26, condition: "Pleasant Rain", desc: "Refreshing garden city drizzle", icon: "🌦️", humidity: 70, wind: 15, uv: 5, airQuality: "Excellent" }
};

const LiveWeatherApp: React.FC = () => {
  const [city, setCity] = useState("Mathura");
  const [searchQuery, setSearchQuery] = useState("");
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [customData, setCustomData] = useState<typeof CITIES_WEATHER_DATA["Mathura"] | null>(null);

  const currentWeather = customData || CITIES_WEATHER_DATA[city] || CITIES_WEATHER_DATA["Mathura"];
  const displayTemp = unit === 'C' ? currentWeather.tempC : Math.round((currentWeather.tempC * 9/5) + 32);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const matchKey = Object.keys(CITIES_WEATHER_DATA).find(
      c => c.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (matchKey) {
      setCity(matchKey);
      setCustomData(null);
    } else {
      // Simulate dynamic real-feeling weather lookup for any typed city
      const randomTemp = Math.floor(Math.random() * 20) + 15;
      const conditions = [
        { condition: "Sunny", desc: "Clear vibrant sunshine", icon: "☀️" },
        { condition: "Cloudy", desc: "Scattered cumulus clouds", icon: "⛅" },
        { condition: "Light Rain", desc: "Passing rain showers", icon: "🌧️" }
      ];
      const pick = conditions[Math.floor(Math.random() * conditions.length)];
      setCity(searchQuery.trim());
      setCustomData({
        tempC: randomTemp,
        condition: pick.condition,
        desc: pick.desc,
        icon: pick.icon,
        humidity: Math.floor(Math.random() * 40) + 40,
        wind: Math.floor(Math.random() * 15) + 5,
        uv: Math.floor(Math.random() * 7) + 2,
        airQuality: "Good"
      });
    }
    setSearchQuery("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-yellow-400/60 rounded-2xl shadow-xl">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>SkyPulse Live Weather</span>
            <span className="text-xs px-2 py-0.5 bg-yellow-400 text-black font-extrabold rounded-full">v2.4</span>
          </h4>
          <p className="text-xs text-zinc-400">Search any city or select a quick preset</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setUnit(u => u === 'C' ? 'F' : 'C')}
            className="px-3 py-1.5 text-xs font-bold bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white rounded-lg border border-zinc-700 transition-colors shrink-0"
          >
            °{unit} Switcher
          </button>
        </div>
      </div>

      {/* City Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type a city name (e.g. London, Mathura, Tokyo)..."
          className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors shrink-0"
        >
          Look Up
        </button>
      </form>

      {/* Quick City Preset Chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {Object.keys(CITIES_WEATHER_DATA).map((c) => (
          <button
            key={c}
            onClick={() => { setCity(c); setCustomData(null); }}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
              city === c
                ? 'bg-yellow-400 text-black font-bold shadow-md'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Weather Card Display */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl mb-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-3xl font-black text-white">{city}</h3>
              <span className="text-xs px-2 py-0.5 bg-zinc-800 text-yellow-400 rounded font-semibold">LIVE</span>
            </div>
            <p className="text-sm text-zinc-400">{currentWeather.desc}</p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">{displayTemp}°</span>
              <span className="text-xl font-bold text-yellow-400">{unit}</span>
              <span className="text-xs text-zinc-400 ml-2 font-medium">({currentWeather.condition})</span>
            </div>
          </div>

          <div className="text-center p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
            <span className="text-6xl block animate-bounce" style={{ animationDuration: '3s' }}>
              {currentWeather.icon}
            </span>
            <span className="text-xs font-bold text-zinc-300 mt-2 block">{currentWeather.condition}</span>
          </div>
        </div>

        {/* 4-Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-800">
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-xs font-semibold mb-1">
              <Droplets size={14} />
              <span>Humidity</span>
            </div>
            <span className="text-base font-bold text-white">{currentWeather.humidity}%</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-xs font-semibold mb-1">
              <Wind size={14} />
              <span>Wind Speed</span>
            </div>
            <span className="text-base font-bold text-white">{currentWeather.wind} km/h</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-xs font-semibold mb-1">
              <Sun size={14} />
              <span>UV Index</span>
            </div>
            <span className="text-base font-bold text-white">{currentWeather.uv} of 10</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-xs font-semibold mb-1">
              <Sparkles size={14} />
              <span>Air Quality</span>
            </div>
            <span className="text-base font-bold text-white">{currentWeather.airQuality}</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Strip */}
      <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">5-Day Predictive Forecast</h5>
      <div className="grid grid-cols-5 gap-2">
        {[
          { day: "Mon", temp: 31, icon: "☀️" },
          { day: "Tue", temp: 33, icon: "⛅" },
          { day: "Wed", temp: 29, icon: "🌧️" },
          { day: "Thu", temp: 30, icon: "🌤️" },
          { day: "Fri", temp: 32, icon: "☀️" },
        ].map((f, idx) => (
          <div key={idx} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-center hover:border-yellow-400 transition-colors">
            <span className="text-xs text-zinc-400 font-semibold block">{f.day}</span>
            <span className="text-xl my-1 block">{f.icon}</span>
            <span className="text-xs font-bold text-white">{unit === 'C' ? f.temp : Math.round((f.temp * 9/5) + 32)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   2. LIVE TO-DO & TASK KANBAN DEMO
   ========================================================================= */
interface Task {
  id: string;
  title: string;
  category: 'Study' | 'Project' | 'Personal' | 'Urgent';
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const LiveTodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review B.Tech Algorithms & Graph Traversals", category: "Study", completed: true, priority: "High" },
    { id: "2", title: "Build responsive CSS Flexbox weather layout", category: "Project", completed: true, priority: "Medium" },
    { id: "3", title: "Practice JavaScript DOM manipulation exercises", category: "Study", completed: false, priority: "High" },
    { id: "4", title: "Prepare portfolio links for GLA University showcase", category: "Personal", completed: false, priority: "Medium" }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [category, setCategory] = useState<Task['category']>("Study");
  const [priority, setPriority] = useState<Task['priority']>("Medium");
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category,
      completed: false,
      priority
    };
    setTasks([newTask, ...tasks]);
    setNewTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-yellow-400/60 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>TaskFlow Smart Planner</span>
            <span className="text-xs px-2 py-0.5 bg-yellow-400 text-black font-extrabold rounded-full">v3.0</span>
          </h4>
          <p className="text-xs text-zinc-400">Interactive task management with live progress tracking</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-yellow-400">{completedCount} / {tasks.length} Completed</span>
          <div className="w-28 h-2 bg-zinc-800 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={addTask} className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl mb-4 space-y-2.5">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new task (e.g. Master CSS Grid layout)..."
            className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Category:</span>
            {(['Study', 'Project', 'Personal', 'Urgent'] as const).map(c => (
              <button
                type="button"
                key={c}
                onClick={() => setCategory(c)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  category === c ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span>Priority:</span>
            {(['Low', 'Medium', 'High'] as const).map(p => (
              <button
                type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  priority === p ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-3">
        {(['All', 'Active', 'Completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
              filter === f ? 'bg-yellow-400 text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            {f} {f === 'All' && `(${tasks.length})`}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-xs">
            No tasks found in this filter view.
          </div>
        ) : (
          filteredTasks.map(t => (
            <div
              key={t.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                t.completed
                  ? 'bg-zinc-950/60 border-zinc-800 opacity-60'
                  : 'bg-zinc-900 border-zinc-800 hover:border-yellow-400/60'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    t.completed ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-zinc-600 hover:border-yellow-400'
                  }`}
                >
                  {t.completed && <Check size={14} className="stroke-[3]" />}
                </button>
                <div className="truncate">
                  <p className={`text-sm font-medium ${t.completed ? 'line-through text-zinc-500' : 'text-white'}`}>
                    {t.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 text-yellow-400 font-semibold rounded">
                      {t.category}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      t.priority === 'High' ? 'bg-red-950 text-red-300' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(t.id)}
                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                title="Delete Task"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   3. LIVE DEV QUIZ & TRIVIA DEMO
   ========================================================================= */
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which HTML5 element is semantically ideal for wrapping standalone self-contained content?",
    options: ["<section>", "<article>", "<aside>", "<main>"],
    correctIndex: 1,
    explanation: "<article> represents a self-contained composition in a document, page, or application."
  },
  {
    question: "In CSS Flexbox, which property defines how items are positioned along the cross axis?",
    options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
    correctIndex: 1,
    explanation: "align-items controls cross-axis alignment, while justify-content controls main-axis alignment."
  },
  {
    question: "Which JavaScript method creates a new array populated with the results of calling a provided function?",
    options: ["filter()", "forEach()", "map()", "reduce()"],
    correctIndex: 2,
    explanation: "map() transforms elements into a new array of the same length without mutating the original."
  },
  {
    question: "What is the primary purpose of the CSS 'box-sizing: border-box' rule?",
    options: [
      "Include padding and border in element total width & height",
      "Remove all shadows from the box",
      "Make borders rounded automatically",
      "Hide overflow content"
    ],
    correctIndex: 0,
    explanation: "border-box ensures padding and borders are calculated inside the specified width/height."
  }
];

const LiveQuizApp: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const q = QUIZ_QUESTIONS[currentQ];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === q.correctIndex) {
      setScore(s => s + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-yellow-400/60 rounded-2xl shadow-xl">
      {!showResult ? (
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
            <div>
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">{q.question}</h4>
            </div>
            <div className="px-3 py-1 bg-yellow-400 text-black font-extrabold text-xs rounded-full">
              Score: {score}
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 mb-5">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-yellow-400";
              if (isAnswered) {
                if (idx === q.correctIndex) {
                  btnStyle = "bg-green-950 border-green-500 text-green-300 font-bold";
                } else if (selectedOpt === idx) {
                  btnStyle = "bg-red-950 border-red-500 text-red-300 font-bold";
                } else {
                  btnStyle = "bg-zinc-950 border-zinc-800 text-zinc-600";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-3.5 text-left text-sm rounded-xl border transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === q.correctIndex && <CheckCircle2 size={16} className="text-green-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Alert */}
          {isAnswered && (
            <div className="p-3.5 bg-zinc-900 border border-yellow-400/30 rounded-xl mb-4 text-xs text-zinc-300">
              <span className="font-bold text-yellow-400 block mb-1">💡 Explanation:</span>
              <span>{q.explanation}</span>
            </div>
          )}

          {isAnswered && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>{currentQ < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="p-6 text-center">
          <span className="text-5xl block mb-2">🎉</span>
          <h3 className="text-2xl font-black text-white mb-1">Quiz Completed!</h3>
          <p className="text-sm text-zinc-400 mb-4">You scored {score} out of {QUIZ_QUESTIONS.length * 10} points</p>

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm mx-auto mb-6">
            <span className="text-xs text-yellow-400 font-bold block mb-1">Accuracy Grade</span>
            <span className="text-3xl font-black text-white">
              {score >= 30 ? '🏆 Master Developer' : '🌟 Great Effort!'}
            </span>
          </div>

          <button
            onClick={resetQuiz}
            className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   4. LIVE COLOR PALETTE STUDIO DEMO
   ========================================================================= */
const LivePaletteApp: React.FC = () => {
  const [palette, setPalette] = useState([
    { hex: "#FACC15", name: "Sunflower Yellow", locked: false },
    { hex: "#09090B", name: "Jet Black", locked: true },
    { hex: "#FFFFFF", name: "Pure White", locked: false },
    { hex: "#EAB308", name: "Amber Gold", locked: false },
    { hex: "#27272A", name: "Zinc Dark", locked: false }
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generateNewColors = () => {
    setPalette(palette.map(p => {
      if (p.locked) return p;
      const randColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
      return { ...p, hex: randColor, name: "Custom Color" };
    }));
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-yellow-400/60 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xl font-extrabold text-white">ChromaCraft Color Palette</h4>
          <p className="text-xs text-zinc-400">Click any color code to copy HEX or generate fresh harmony</p>
        </div>
        <button
          onClick={generateNewColors}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RefreshCw size={14} />
          <span>Generate New</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
        {palette.map((p, idx) => (
          <div
            key={idx}
            className="group p-4 rounded-xl border border-zinc-800 flex flex-col justify-between h-36 relative overflow-hidden transition-transform hover:-translate-y-1"
            style={{ backgroundColor: p.hex }}
          >
            <div className="flex justify-between items-start">
              <button
                onClick={() => copyColor(p.hex)}
                className="px-2 py-1 bg-black/70 backdrop-blur text-white text-xs font-mono font-bold rounded hover:bg-black"
                title="Copy HEX"
              >
                {copiedHex === p.hex ? '✓ Copied' : p.hex}
              </button>
            </div>

            <div className="bg-black/60 backdrop-blur p-1.5 rounded text-[11px] text-white font-medium text-center">
              {p.name}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between text-xs text-zinc-400">
        <span>💡 Pro Tip: Tap any color box to instantly copy HEX to clipboard.</span>
        <button
          onClick={() => copyColor(`linear-gradient(135deg, ${palette[0].hex}, ${palette[3].hex})`)}
          className="text-yellow-400 font-bold hover:underline"
        >
          Copy CSS Gradient
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   5. LIVE BILL & TIP SPLIT CALCULATOR DEMO
   ========================================================================= */
const LiveSplitCalculator: React.FC = () => {
  const [bill, setBill] = useState(1200);
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(3);
  const [currency, setCurrency] = useState('₹');

  const tipAmount = (bill * tipPct) / 100;
  const totalAmount = bill + tipAmount;
  const perPerson = people > 0 ? totalAmount / people : 0;

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-yellow-400/60 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xl font-extrabold text-white">Smart Split & Tip Calculator</h4>
          <p className="text-xs text-zinc-400">Real-time group bill splitting & tip computation</p>
        </div>
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
          {['₹', '$', '€', '£'].map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-2 py-1 rounded font-bold ${
                currency === c ? 'bg-yellow-400 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 block mb-1">Bill Amount ({currency})</label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-lg font-bold text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 block mb-1">Tip Percentage ({tipPct}%)</label>
            <div className="flex gap-1.5 mb-2">
              {[5, 10, 15, 20, 25].map(p => (
                <button
                  key={p}
                  onClick={() => setTipPct(p)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    tipPct === p ? 'bg-yellow-400 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={tipPct}
              onChange={(e) => setTipPct(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 block mb-1">Number of People ({people})</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPeople(p => Math.max(1, p - 1))}
                className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold rounded-xl text-lg"
              >
                -
              </button>
              <span className="text-xl font-bold text-white flex-1 text-center">{people} {people === 1 ? 'Person' : 'People'}</span>
              <button
                onClick={() => setPeople(p => p + 1)}
                className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold rounded-xl text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="p-5 bg-zinc-900 border border-yellow-400/40 rounded-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
              <span>Tip Amount:</span>
              <span className="font-bold text-white">{currency}{tipAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
              <span>Total Bill + Tip:</span>
              <span className="font-bold text-white">{currency}{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-center mt-4">
            <span className="text-xs text-yellow-400 font-bold block mb-1 uppercase tracking-wider">
              Each Person Pays
            </span>
            <span className="text-3xl font-black text-white">
              {currency}{perPerson.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   6. LIVE DIGITAL STOPWATCH & POMODORO TIMER DEMO
   ========================================================================= */
const LiveTimerApp: React.FC = () => {
  const [seconds, setSeconds] = useState(1500); // 25 min default
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'pomo' | 'break'>('pomo');

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode: 'pomo' | 'break' = mode) => {
    setIsActive(false);
    setMode(newMode);
    setSeconds(newMode === 'pomo' ? 1500 : 300);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-yellow-400/60 rounded-2xl shadow-xl text-center">
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => resetTimer('pomo')}
          className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            mode === 'pomo' ? 'bg-yellow-400 text-black' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          25m Focus Sprint
        </button>
        <button
          onClick={() => resetTimer('break')}
          className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            mode === 'break' ? 'bg-yellow-400 text-black' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          5m Quick Break
        </button>
      </div>

      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm mx-auto mb-6">
        <span className="text-6xl font-black font-mono text-white tracking-widest block mb-2">
          {formatTime(seconds)}
        </span>
        <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
          {mode === 'pomo' ? '💻 Focus & Code Sprint' : '☕ Refreshing Break'}
        </span>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={toggleTimer}
          className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold rounded-xl transition-colors text-sm"
        >
          {isActive ? 'Pause' : 'Start Timer'}
        </button>
        <button
          onClick={() => resetTimer(mode)}
          className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl border border-zinc-700 transition-colors text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
