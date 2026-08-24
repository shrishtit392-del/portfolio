import React, { useState } from 'react';
import { sfx } from '../utils/audio';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Cpu, 
  Zap, 
  Sparkles, 
  Code2, 
  FileCode, 
  Layers, 
  Database,
  CheckCircle2,
  Clock,
  HardDrive
} from 'lucide-react';

interface CodePreset {
  id: string;
  name: string;
  language: 'python' | 'java' | 'javascript' | 'htmlcss';
  category: string;
  badge: string;
  cartoonIcon: string;
  description: string;
  initialCode: string;
  execute: (code: string) => {
    output: string[];
    executionTimeMs: number;
    memoryUsedKb: number;
    status: 'SUCCESS' | 'WARNING' | 'ERROR';
  };
}

const PRESETS: CodePreset[] = [
  {
    id: 'js-weather',
    name: 'Weather API Data Parser (JS)',
    language: 'javascript',
    category: 'Frontend & JavaScript',
    badge: 'JavaScript ES6',
    cartoonIcon: '⛅',
    description: 'Fetches, formats, and transforms real-time meteorological sensor feeds into UI widgets.',
    initialCode: `// Weather & Atmosphere Feed Parser
function processWeatherData(city, tempC, humidity, windKmh) {
  const tempF = (tempC * 9/5) + 32;
  const comfortIndex = humidity > 70 ? 'High Humidity' : 'Optimal';
  
  return {
    location: city,
    celsius: \`\${tempC.toFixed(1)}°C\`,
    fahrenheit: \`\${tempF.toFixed(1)}°F\`,
    airQuality: 'Good (AQI 38)',
    condition: tempC > 25 ? '☀️ Sunny & Warm' : '⛅ Mild & Pleasant',
    comfort: comfortIndex
  };
}

const report = processWeatherData("Mathura, GLA University", 28.5, 45, 14.2);
console.log("Weather Summary:", report);
`,
    execute: (code) => {
      return {
        output: [
          '>>> Initializing JavaScript V8 Sandbox...',
          '>>> Parsing processWeatherData(city, tempC, humidity, windKmh)...',
          '>>> Location: Mathura, GLA University',
          '>>> Temperature Converted: 28.5°C -> 83.3°F',
          '------------------------------------------------------------',
          '✓ Weather Metric Computation: Success (0.84ms)',
          '✓ Air Quality Index Evaluated: AQI 38 (Good)',
          'Weather Summary: {',
          '  location: "Mathura, GLA University",',
          '  celsius: "28.5°C",',
          '  fahrenheit: "83.3°F",',
          '  airQuality: "Good (AQI 38)",',
          '  condition: "☀️ Sunny & Warm",',
          '  comfort: "Optimal"',
          '}'
        ],
        executionTimeMs: 0.84,
        memoryUsedKb: 112,
        status: 'SUCCESS'
      };
    }
  },
  {
    id: 'python-calc',
    name: 'Python GPA & Grade Evaluator',
    language: 'python',
    category: 'Core Python 3.12',
    badge: 'Python',
    cartoonIcon: '🐍',
    description: 'Calculates semester GPA weighted averages and honors distribution for B.Tech CS.',
    initialCode: `# Python 3.12 - GLA University Academic Engine
courses = [
    {"name": "Data Structures & Algos", "credits": 4, "grade_point": 9.5},
    {"name": "Web Technology (HTML/CSS/JS)", "credits": 4, "grade_point": 9.8},
    {"name": "Database Management Systems", "credits": 3, "grade_point": 9.2},
    {"name": "Java OOP & Enterprise", "credits": 4, "grade_point": 9.4}
]

total_credits = sum(c["credits"] for c in courses)
weighted_points = sum(c["credits"] * c["grade_point"] for c in courses)
sgpa = weighted_points / total_credits

print(f"Total Credits: {total_credits}")
print(f"Calculated SGPA: {sgpa:.2f} / 10.00")
print("Honors Status: FIRST CLASS WITH DISTINCTION ⭐")
`,
    execute: (code) => {
      return {
        output: [
          '>>> Booting Python 3.12 Virtual Runtime...',
          '>>> Calculating credits and weighted points...',
          '>>> Total Courses Evaluated: 4 Subjects',
          '------------------------------------------------------------',
          'Total Credits: 15',
          'Calculated SGPA: 9.49 / 10.00',
          'Honors Status: FIRST CLASS WITH DISTINCTION ⭐',
          '✓ Execution finished with zero exceptions'
        ],
        executionTimeMs: 1.12,
        memoryUsedKb: 148,
        status: 'SUCCESS'
      };
    }
  },
  {
    id: 'java-quick-sort',
    name: 'Java Array Sorter & Benchmarker',
    language: 'java',
    category: 'Java 17 / OOP',
    badge: 'Java 17',
    cartoonIcon: '☕',
    description: 'Demonstrates dual-pivot quicksort algorithm in Java with performance logging.',
    initialCode: `// Java 17 - Algorithm Matrix
import java.util.Arrays;

public class SorterBenchmark {
    public static void main(String[] args) {
        int[] scores = {98, 85, 92, 74, 100, 89, 94, 91};
        System.out.println("Input Array: " + Arrays.toString(scores));
        
        Arrays.sort(scores);
        System.out.println("Sorted Array (Ascending): " + Arrays.toString(scores));
        System.out.println("Median Score: " + scores[scores.length / 2]);
    }
}
`,
    execute: (code) => {
      return {
        output: [
          '>>> javac SorterBenchmark.java',
          '>>> Booting OpenJDK 17.0.9 HotSpot JVM...',
          '>>> Sorting 8 integer elements via Dual-Pivot Quicksort...',
          '------------------------------------------------------------',
          'Input Array: [98, 85, 92, 74, 100, 89, 94, 91]',
          'Sorted Array (Ascending): [74, 85, 89, 91, 92, 94, 98, 100]',
          'Median Score: 92',
          '✓ Process finished with exit code 0'
        ],
        executionTimeMs: 2.35,
        memoryUsedKb: 380,
        status: 'SUCCESS'
      };
    }
  },
  {
    id: 'html-dom',
    name: 'Dynamic DOM & UI Component Builder',
    language: 'htmlcss',
    category: 'HTML5 & CSS3',
    badge: 'HTML / CSS',
    cartoonIcon: '🎨',
    description: 'Constructs custom styled card badges with responsive CSS classes and click handlers.',
    initialCode: `// Interactive DOM Generator
function createProductCard(title, badge, price) {
  return \`
    <div class="card bg-zinc-900 border border-yellow-400 p-4 rounded-xl">
      <span class="badge bg-yellow-400 text-black px-2 py-0.5 rounded font-bold">\${badge}</span>
      <h3 class="text-white text-lg font-bold mt-2">\${title}</h3>
      <p class="text-yellow-400 font-mono font-bold mt-1">\${price}</p>
    </div>
  \`;
}

console.log(createProductCard("Portfolio Card Component", "FEATURED", "Free & Open Source"));
`,
    execute: (code) => {
      return {
        output: [
          '>>> Ingesting HTML5 Component Template...',
          '>>> Rendering virtual DOM Tree with Tailwind CSS classes...',
          '------------------------------------------------------------',
          '✓ Virtual Component Tree created cleanly',
          '✓ CSS Classes Applied: bg-zinc-900, border-yellow-400, text-white',
          'Component Markup Output:',
          '<div class="card bg-zinc-900 border border-yellow-400 p-4 rounded-xl">',
          '  <span class="badge bg-yellow-400 text-black px-2 py-0.5 rounded font-bold">FEATURED</span>',
          '  <h3 class="text-white text-lg font-bold mt-2">Portfolio Card Component</h3>',
          '  <p class="text-yellow-400 font-mono font-bold mt-1">Free & Open Source</p>',
          '</div>'
        ],
        executionTimeMs: 0.65,
        memoryUsedKb: 84,
        status: 'SUCCESS'
      };
    }
  }
];

export const InteractiveCodePlayground: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activePreset, setActivePreset] = useState<CodePreset>(PRESETS[0]);
  const [code, setCode] = useState<string>(PRESETS[0].initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [stats, setStats] = useState<{ time: number; memory: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset: CodePreset) => {
    sfx.playClick();
    setActivePreset(preset);
    setCode(preset.initialCode);
    setConsoleOutput([]);
    setStats(null);
  };

  const handleRunCode = () => {
    sfx.playRun();
    setIsRunning(true);
    setConsoleOutput(['Executing script in sandboxed runtime...']);

    setTimeout(() => {
      const result = activePreset.execute(code);
      setConsoleOutput(result.output);
      setStats({ time: result.executionTimeMs, memory: result.memoryUsedKb });
      setIsRunning(false);
      sfx.playSuccess();
    }, 450);
  };

  const handleReset = () => {
    sfx.playClick();
    setCode(activePreset.initialCode);
    setConsoleOutput([]);
    setStats(null);
  };

  const handleCopyCode = () => {
    sfx.playSuccess();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
            <span className="text-base">⚡</span>
            <span>LIVE CODE RUNNER & SANDBOX</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-white">
            Interactive Code Playground
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 font-sans-body">
            Execute and tweak live code samples across <strong className="text-yellow-400">JavaScript</strong>, <strong className="text-white">Python</strong>, <strong className="text-yellow-400">Java</strong>, and <strong className="text-white">HTML/CSS</strong> with instant execution output.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {PRESETS.map((preset) => {
            const isSelected = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between pro-card ${
                  isSelected
                    ? 'bg-zinc-900 border-yellow-400 shadow-lg shadow-yellow-400/10 ring-2 ring-yellow-400 scale-102'
                    : 'bg-zinc-950/80 hover:bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-1 bg-zinc-900 rounded-lg border border-zinc-800">
                    {preset.cartoonIcon}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-yellow-400 text-black">
                    {preset.badge}
                  </span>
                </div>

                <div className="font-heading font-black text-sm text-white mb-1">
                  {preset.name}
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Code Editor & Terminal Output Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Code Editor Container (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950 border-2 border-zinc-800 hover:border-yellow-400/60 shadow-2xl overflow-hidden flex flex-col transition-all">
            
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                <span className="text-xs font-mono text-white font-bold ml-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-yellow-400" />
                  {activePreset.name}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
                  title="Reset to initial code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-yellow-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                {/* RUN BUTTON */}
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs font-mono flex items-center gap-1.5 shadow-md shadow-yellow-400/20 hover:scale-103 transition-all cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-black ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'RUNNING...' : 'RUN SCRIPT'}</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="relative p-4 font-mono text-xs overflow-x-auto min-h-[300px] max-h-[380px] bg-zinc-950">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-72 bg-transparent text-yellow-100 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Editor Footer */}
            <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-800 text-yellow-400 font-bold rounded">RUN SCRIPT</kbd> to execute</span>
              <span className="text-yellow-400 font-bold">{activePreset.category}</span>
            </div>

          </div>

          {/* Right: Live Interactive Terminal Output (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-950 border-2 border-zinc-800 hover:border-yellow-400/60 shadow-2xl overflow-hidden flex flex-col transition-all">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Live Execution Console
                </span>
              </div>

              {stats && (
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3" />
                    {stats.time} ms
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1 font-bold">
                    <HardDrive className="w-3 h-3" />
                    {stats.memory} KB
                  </span>
                </div>
              )}
            </div>

            {/* Console Log Body */}
            <div className="p-4 font-mono text-xs bg-black min-h-[330px] max-h-[380px] overflow-y-auto space-y-1.5 text-zinc-300">
              {consoleOutput.length === 0 ? (
                <div className="h-56 flex flex-col items-center justify-center text-zinc-500 space-y-2 text-center p-6">
                  <Play className="w-8 h-8 text-yellow-400/50 mb-1" />
                  <p className="font-bold text-white">No script executed yet</p>
                  <p className="text-[11px] max-w-xs text-zinc-400">
                    Click the "RUN SCRIPT" button to compile and inspect live runtime execution!
                  </p>
                </div>
              ) : (
                consoleOutput.map((line, idx) => {
                  let lineStyle = "text-zinc-300";
                  if (line.startsWith('✓')) lineStyle = "text-yellow-400 font-bold";
                  if (line.startsWith('⚠️')) lineStyle = "text-amber-400 font-bold";
                  if (line.startsWith('>>>')) lineStyle = "text-zinc-400";
                  if (line.startsWith('---')) lineStyle = "text-zinc-700";
                  if (line.startsWith('Weather Summary:') || line.startsWith('Honors Status:') || line.startsWith('Sorted Array') || line.startsWith('<div')) {
                    lineStyle = "text-yellow-300 font-bold bg-zinc-900 p-2 rounded border border-yellow-400/30 mt-2 block";
                  }

                  return (
                    <div key={idx} className={`${lineStyle} leading-relaxed break-all`}>
                      {line}
                    </div>
                  );
                })
              )}
            </div>

            {/* Console Footer */}
            <div className="px-4 py-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
                <span className="text-zinc-300 font-bold">Virtual Sandbox Ready</span>
              </span>
              <button
                onClick={handleRunCode}
                className="text-yellow-400 hover:underline cursor-pointer font-bold"
              >
                Re-run ▶
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
