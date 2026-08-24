import React, { useState } from 'react';
import { educationInfo, academicExperience } from '../data/portfolioData';
import { sfx } from '../utils/audio';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Calendar,
  Layers,
  MapPin,
  ChevronRight,
  School,
  ExternalLink,
  Code2
} from 'lucide-react';

export const AboutAndAcademics: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'coursework' | 'experience'>('milestones');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(0);

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
            <span className="text-base">🎓</span>
            <span>ACADEMICS & EDUCATION JOURNEY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-white">
            GLA University & Academic Foundation
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans-body">
            Computer Science & Engineering undergraduate at <strong className="text-yellow-400">GLA University</strong> (Class of 2025). Explore verified milestones, coursework scores, and co-curricular projects.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('milestones');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'milestones'
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-102'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span>🎓</span>
            <span>1. Education Milestones</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('coursework');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'coursework'
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-102'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span>📚</span>
            <span>2. Interactive Coursework Explorer</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('experience');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-102'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span>👩‍💻</span>
            <span>3. Collegiate Experience</span>
          </button>
        </div>

        {/* Tab 1: Education Milestones */}
        {activeTab === 'milestones' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {educationInfo.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-yellow-400 transition-all shadow-xl pro-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-850 pb-5 mb-5">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl shrink-0">
                      {m.cartoonEmoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                          {m.institution}
                        </h3>
                        <span className="px-2.5 py-0.5 text-xs font-black bg-yellow-400 text-black rounded-md">
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-yellow-400 mt-1">
                        {m.degree}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-zinc-500" />
                          {m.location}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-zinc-300 font-semibold">{m.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-zinc-400 block">Performance</span>
                    <span className="text-sm font-black text-yellow-400">{m.scoreOrGrade}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {m.description}
                </p>

                {/* Key Subjects & Achievements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-850">
                  <div>
                    <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2">
                      Key Subjects:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {m.keySubjects.map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-zinc-900 text-zinc-300 text-xs rounded border border-zinc-800"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2">
                      Key Highlights:
                    </h5>
                    <ul className="space-y-1 text-xs text-zinc-400">
                      {m.achievements.map((ach, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-yellow-400 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Interactive Coursework Explorer */}
        {activeTab === 'coursework' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Course Selection List */}
              <div className="md:col-span-5 space-y-2.5">
                {educationInfo.coursework.map((course, idx) => {
                  const isSelected = selectedCourse === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        sfx.playClick();
                        setSelectedCourse(idx);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-lg shadow-yellow-400/20 scale-102'
                          : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.icon}</span>
                        <div>
                          <h4 className="text-sm font-extrabold leading-tight">{course.name}</h4>
                          <span className={`text-xs ${isSelected ? 'text-zinc-900 font-bold' : 'text-yellow-400 font-semibold'}`}>
                            {course.grade}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className={isSelected ? 'text-black' : 'text-zinc-500'} />
                    </div>
                  );
                })}
              </div>

              {/* Selected Course Deep Dive Card */}
              <div className="md:col-span-7">
                {selectedCourse !== null && educationInfo.coursework[selectedCourse] && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border-2 border-yellow-400/60 shadow-2xl h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-4xl p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl">
                          {educationInfo.coursework[selectedCourse].icon}
                        </span>
                        <span className="px-3 py-1 bg-yellow-400 text-black font-extrabold text-xs rounded-full">
                          {educationInfo.coursework[selectedCourse].grade}
                        </span>
                      </div>

                      <h3 className="font-heading font-black text-2xl text-white mb-2">
                        {educationInfo.coursework[selectedCourse].name}
                      </h3>
                      <p className="text-xs text-yellow-400 font-semibold mb-4">
                        GLA University B.Tech CSE Core Curriculum
                      </p>

                      <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-sm text-zinc-300 leading-relaxed mb-6">
                        {educationInfo.coursework[selectedCourse].desc}
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                          Applied Competencies & Labs:
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                          <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-yellow-400 shrink-0" />
                            <span>Hands-on Lab Assignments</span>
                          </div>
                          <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-yellow-400 shrink-0" />
                            <span>Practical Code Evaluations</span>
                          </div>
                          <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-yellow-400 shrink-0" />
                            <span>Project Demonstrations</span>
                          </div>
                          <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-yellow-400 shrink-0" />
                            <span>University Examinations</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                      <span>GLA University Academic Standard</span>
                      <span className="text-yellow-400 font-bold">Class of 2025</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Experience & Leadership */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {academicExperience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-yellow-400 shadow-xl space-y-3 pro-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                      {exp.cartoonIcon || '👩‍💻'}
                    </span>
                    <div>
                      <h4 className="font-heading font-black text-lg text-white">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-yellow-400 font-bold">
                        {exp.organization} • {exp.type}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-zinc-400 font-semibold">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans-body">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 text-xs font-bold text-yellow-400 border border-zinc-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
