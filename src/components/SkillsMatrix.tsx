import React, { useState } from 'react';
import { skillGroups } from '../data/portfolioData';
import { SkillItem } from '../types';
import { sfx } from '../utils/audio';
import { 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Zap,
  Terminal
} from 'lucide-react';

export const SkillsMatrix: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillGroups[0].skills[0]);

  const currentGroup = skillGroups[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
            <span className="text-base">⚡</span>
            <span>CORE COMPETENCIES & TECH MATRIX</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-white">
            Frontend, Programming & Tools
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 font-sans-body">
            Solid foundations in web technologies, object-oriented design in Java & Python, backend APIs, and developer tools.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {skillGroups.map((group, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={group.category}
                onClick={() => {
                  sfx.playClick();
                  setActiveCategoryIndex(idx);
                  setSelectedSkill(group.skills[0]);
                }}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-102 font-black'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                <span>{group.category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? 'bg-black text-yellow-400 font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {group.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Skills Grid + Live Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Skill Cards List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="mb-4">
              <h3 className="font-heading font-black text-lg text-white flex items-center gap-2">
                <span className="text-yellow-400 font-mono">&gt;</span>
                <span>{currentGroup.category}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {currentGroup.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentGroup.skills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    onClick={() => {
                      sfx.playClick();
                      setSelectedSkill(skill);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between pro-card ${
                      isSelected
                        ? 'bg-zinc-900 border-yellow-400 shadow-lg shadow-yellow-400/10 ring-2 ring-yellow-400 scale-102'
                        : 'bg-zinc-950/80 hover:bg-zinc-900/90 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                          {skill.cartoonEmoji || '⚡'}
                        </div>
                        <span className="text-[11px] font-mono font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
                          {skill.experience}
                        </span>
                      </div>

                      <div className="font-heading font-black text-base text-white mb-1">
                        {skill.name}
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                        {skill.tag}
                      </p>
                    </div>

                    {/* Proficiency bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-zinc-400">
                        <span>Proficiency</span>
                        <span className="text-yellow-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Interactive Skill Inspector & Code Snapshot (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-950 border-2 border-yellow-400/60 shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl p-2 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                  {selectedSkill.cartoonEmoji || '⚡'}
                </span>
                <div>
                  <h4 className="font-heading font-black text-lg text-white">
                    {selectedSkill.name}
                  </h4>
                  <p className="text-[11px] font-mono text-yellow-400 font-semibold">
                    Core Competency Breakdown
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-yellow-400 text-black font-extrabold">
                {selectedSkill.level}% Score
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1 font-bold">
                  Practical Domain & Application
                </label>
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 leading-relaxed font-sans-body">
                  {selectedSkill.tag}
                </div>
              </div>

              {selectedSkill.snippet && (
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1 font-bold">
                    Syntax & Code Snapshot
                  </label>
                  <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-yellow-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-48">
                    <code>{selectedSkill.snippet}</code>
                  </pre>
                </div>
              )}

              <div className="pt-2">
                <a
                  href="#projects"
                  onClick={() => sfx.playClick()}
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-yellow-400/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>See In Live Project Demos</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
