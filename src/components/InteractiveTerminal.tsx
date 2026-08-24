import React, { useState, useRef, useEffect } from 'react';
import { ProfileData } from '../types';
import { sfx } from '../utils/audio';
import { 
  Terminal as TerminalIcon, 
  Send, 
  Trash2, 
  CornerDownLeft,
  Sparkles
} from 'lucide-react';

interface TerminalMessage {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string | React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<{
  profile: ProfileData;
  isDarkMode: boolean;
}> = ({ profile, isDarkMode }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalMessage[]>([
    {
      id: 'welcome-1',
      type: 'system',
      content: `⚡ Shrishti Tiwari Interactive Portfolio Terminal CLI [Node 20.x / GLA Linux]
Type 'help' to see available commands or click the quick action chips below.`,
      timestamp: '00:00:01'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    sfx.playClick();

    const timestamp = new Date().toLocaleTimeString();
    const newHistory: TerminalMessage[] = [
      ...history,
      {
        id: `cmd-${Date.now()}`,
        type: 'input',
        content: cleanCmd,
        timestamp
      }
    ];

    let outputNode: React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-yellow-400 font-bold">AVAILABLE CLI COMMANDS:</p>
            <p><span className="text-yellow-300 font-bold">about</span> : View academic summary & bio</p>
            <p><span className="text-yellow-300 font-bold">skills</span> : Inspect technical stack rating</p>
            <p><span className="text-yellow-300 font-bold">projects</span> : List all 6 featured HTML/CSS/JS/Python projects</p>
            <p><span className="text-yellow-300 font-bold">python</span> : Python & logic programming summary</p>
            <p><span className="text-yellow-300 font-bold">java</span> : Java OOP & backend engineering</p>
            <p><span className="text-yellow-300 font-bold">contact</span> : Get direct email & phone coordinates</p>
            <p><span className="text-yellow-300 font-bold">clear</span> : Reset the terminal screen</p>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-yellow-400 font-bold">SHRISHTI TIWARI • B.TECH (HONS) CSE</p>
            <p>🎓 Institution: GLA University, Mathura, Uttar Pradesh</p>
            <p>📅 Cohort: B.Tech Computer Science (Hons) - 2021-2025</p>
            <p>💡 Core Focus: Python, Java, HTML/CSS/JS Web Applications, Cloud Infrastructure.</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-yellow-400 font-bold">CORE SKILLS & PROFICIENCY:</p>
            <p>🐍 Python (92%) - Data Structures, Algorithms, OOP, Web APIs</p>
            <p>☕ Java (88%) - OOP Concepts, Multithreading, Enterprise Architecture</p>
            <p>🎨 Frontend (95%) - HTML5, CSS3, Modern JavaScript (ES6+), React</p>
            <p>⚙️ Backend (86%) - REST APIs, Node.js, Express, Microservices</p>
            <p>☁️ Cloud & DevOps (82%) - AWS, Docker, Git/GitHub, CI/CD</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-yellow-400 font-bold">FEATURED WEB & HTML/CSS/JS PROJECTS:</p>
            <p>01. <strong className="text-yellow-300">⛅ Live Weather Dashboard</strong>: City search, live temperature & forecast (HTML/CSS/JS)</p>
            <p>02. <strong className="text-yellow-300">🧮 Interactive Scientific Calculator</strong>: Instant math evaluator & calculation history</p>
            <p>03. <strong className="text-yellow-300">🧠 CS & Tech Quiz Challenge</strong>: Timed quiz game with scoring & streak tracker</p>
            <p>04. <strong className="text-yellow-300">📋 Smart Todo & Task Organizer</strong>: Category filtering, priority tags & localStorage</p>
            <p>05. <strong className="text-yellow-300">💰 Personal Budget & Expense Tracker</strong>: Visual income/expense manager</p>
            <p>06. <strong className="text-yellow-300">🎨 Developer Portfolio</strong>: High-contrast yellow/black responsive showcase</p>
          </div>
        );
        break;

      case 'python':
        outputNode = (
          <div className="p-3 rounded-xl bg-zinc-900 border border-yellow-400/30 text-yellow-300 text-xs font-mono">
            <p className="font-bold mb-1">🐍 Python Competency:</p>
            <p>Solid foundation in Python algorithms, scripting, automated data processing, API endpoints, and clean problem solving.</p>
          </div>
        );
        break;

      case 'java':
        outputNode = (
          <div className="p-3 rounded-xl bg-zinc-900 border border-yellow-400/30 text-yellow-300 text-xs font-mono">
            <p className="font-bold mb-1">☕ Java Competency:</p>
            <p>Proficient in Java OOP principles, Collections Framework, Exception Handling, Threading, and building backend services.</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-yellow-400 font-bold">CONTACT COORDINATES:</p>
            <p>✉️ Email: <span className="text-white font-bold">{profile.email}</span></p>
            <p>📞 Phone: <span className="text-white font-bold">{profile.phone}</span></p>
            <p>📍 Campus: GLA University, Mathura, Uttar Pradesh, India</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <p className="text-red-400 text-xs font-mono">
            Command not recognized: '{cleanCmd}'. Type <span className="text-yellow-400 font-bold underline cursor-pointer" onClick={() => handleCommand('help')}>'help'</span> for list of commands.
          </p>
        );
        break;
    }

    newHistory.push({
      id: `out-${Date.now()}`,
      type: 'output',
      content: outputNode,
      timestamp
    });

    setHistory(newHistory);
    setInputVal('');
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'python', 'java', 'contact', 'clear'];

  return (
    <section id="terminal" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-mono text-xs font-black mb-3 shadow-md">
            <span>📟</span>
            <span>DEVELOPER CLI</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-tight text-white">
            Interactive Command Terminal
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-sans-body">
            Direct console interface for exploring Shrishti's skills, coursework, and simple projects.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="rounded-3xl bg-zinc-950 border-2 border-zinc-800 shadow-2xl overflow-hidden flex flex-col pro-card">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="text-xs font-mono text-zinc-400 font-bold ml-2">
                shrishti@gla-university:~
              </span>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setHistory([]);
              }}
              className="text-xs font-mono text-zinc-400 hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors"
              title="Clear terminal output"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Terminal Output Area */}
          <div className="p-6 font-mono text-xs bg-black min-h-[300px] max-h-[420px] overflow-y-auto space-y-3 text-zinc-200">
            {history.map((msg) => (
              <div key={msg.id} className="space-y-1">
                {msg.type === 'input' && (
                  <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <span className="text-white">shrishti@gla:~$</span>
                    <span>{msg.content}</span>
                  </div>
                )}
                {msg.type === 'output' && (
                  <div className="pl-4 border-l-2 border-yellow-400/40 text-zinc-300">
                    {msg.content}
                  </div>
                )}
                {msg.type === 'system' && (
                  <div className="text-zinc-300 whitespace-pre-line bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick command buttons bar */}
          <div className="p-2.5 bg-zinc-950 border-t border-zinc-800 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 font-bold px-2">
              QUICK COMMANDS:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-yellow-400 text-zinc-300 hover:text-black text-[11px] font-mono font-bold transition-all cursor-pointer border border-zinc-800 hover:border-yellow-400"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 p-3 bg-zinc-950 border-t border-zinc-800"
          >
            <span className="font-mono text-xs text-yellow-400 font-bold pl-2">
              shrishti@gla:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'help', 'skills', 'projects', 'contact'..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-yellow-400/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Run</span>
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
