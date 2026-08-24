import React, { useState } from 'react';
import { Project } from '../types';
import { sfx } from '../utils/audio';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  SlidersHorizontal,
  Play,
  CheckCircle2,
  Code2,
  Sparkles,
  Smartphone,
  Eye
} from 'lucide-react';

interface ProjectsIndexProps {
  projects: Project[];
  onOpenEditor: () => void;
  onOpenLiveDemo: (project: Project) => void;
  isDarkMode: boolean;
}

export const ProjectsIndex: React.FC<ProjectsIndexProps> = ({
  projects,
  onOpenEditor,
  onOpenLiveDemo,
  isDarkMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Frontend', 'JavaScript', 'Utility'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
              <span className="text-base">🚀</span>
              <span>INTERACTIVE PROJECT LAB (01–06)</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-white">
              Frontend & Interactive Web Apps
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-sans-body">
              Click <strong className="text-yellow-400">"🎮 Live Demo"</strong> on any project to immediately open and interact with the live working app right in the browser!
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => {
                sfx.playSuccess();
                onOpenEditor();
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-yellow-400 hover:text-black text-zinc-300 border border-zinc-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-yellow-400" />
              <span>Edit Links / Repos</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sfx.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-102 font-extrabold'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="pro-card rounded-2xl p-6 flex flex-col justify-between border border-zinc-800 bg-zinc-950/80 group hover:border-yellow-400 transition-all duration-300"
            >
              <div>
                {/* Top Row: Cartoon Sticker Badge, Number, Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-2 bg-yellow-400/10 border border-yellow-400/30 rounded-xl group-hover:scale-110 transition-transform">
                      {project.cartoonIcon || '⚡'}
                    </span>
                    <div>
                      <span className="text-xs font-black text-yellow-400 block">
                        PROJ #{project.number}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-400">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-yellow-400 text-black rounded-md uppercase tracking-wider">
                    {project.badge || 'Ready'}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="font-heading font-black text-xl text-white group-hover:text-yellow-400 transition-colors mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs text-yellow-400/90 font-semibold mb-3">
                  {project.tagline}
                </p>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-4">
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-850 flex items-center gap-2">
                <button
                  onClick={() => {
                    sfx.playSuccess();
                    onOpenLiveDemo(project);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-yellow-400/15 cursor-pointer"
                >
                  <Play size={14} className="fill-black" />
                  <span>Live Demo</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  title="Source Code on GitHub"
                >
                  <Github size={15} />
                </a>

                <button
                  onClick={() => {
                    sfx.playClick();
                    onOpenLiveDemo(project);
                  }}
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 border border-zinc-800 transition-colors cursor-pointer"
                  title="View Architecture & Code"
                >
                  <Code2 size={15} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
