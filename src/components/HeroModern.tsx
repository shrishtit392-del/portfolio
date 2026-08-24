import React, { useState, useEffect } from 'react';
import { ProfileData } from '../types';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  ArrowRight, 
  ExternalLink,
  GraduationCap,
  Play,
  Cpu,
  Layers,
  MapPin,
  Flame,
  Star,
  Terminal,
  Code2
} from 'lucide-react';

interface HeroModernProps {
  profile: ProfileData;
  onOpenEditor: () => void;
  isDarkMode: boolean;
}

export const HeroModern: React.FC<HeroModernProps> = ({
  profile,
  onOpenEditor,
  isDarkMode,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const roles = [
    "Full-Stack Frontend & Web Developer",
    "JavaScript, Python & Java Programmer",
    "B.Tech (Hons) CSE @ GLA University",
    "Interactive UI & Clean Code Creator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleCopyEmail = () => {
    sfx.playSuccess();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#FFFFFF', '#000000', '#FDE047']
      });
    } catch {
      // Ignore
    }

    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/50 text-xs font-black text-yellow-400 shadow-lg shadow-yellow-400/10">
              <span className="text-base animate-bounce">⚡</span>
              <span className="font-extrabold uppercase tracking-wider">
                OPEN FOR SDE & FRONTEND OPPORTUNITIES
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-white font-mono text-[11px] font-bold">GLA UNIV '25</span>
            </div>

            {/* Main Greeting & Display Name */}
            <div>
              <p className="text-zinc-400 font-mono text-sm tracking-wider uppercase mb-1 font-semibold flex items-center justify-center lg:justify-start gap-2">
                <span>👋 Hi there! I am</span>
              </p>
              
              <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none text-white">
                <span>{profile.name}</span>
                <span className="text-yellow-400">.</span>
              </h1>
            </div>

            {/* Dynamic Rotating Subtitle */}
            <div className="h-10 flex items-center justify-center lg:justify-start">
              <span className="text-lg sm:text-2xl font-black text-yellow-400 font-mono flex items-center gap-2">
                <span className="text-white">&gt;</span>
                <span className="border-b-2 border-yellow-400 pb-0.5 animate-fadeIn">
                  {roles[activeRoleIndex]}
                </span>
              </span>
            </div>

            {/* Bio Description */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl font-sans-body leading-relaxed mx-auto lg:mx-0">
              B.Tech Honors Computer Science student at <strong className="text-white font-black underline decoration-yellow-400 decoration-2">GLA University</strong>. 
              Passionate about building responsive, interactive web apps using <strong className="text-yellow-400">HTML5, CSS3, JavaScript, React</strong>, alongside core programming in <strong className="text-white">Python & Java</strong>.
            </p>

            {/* Cartoon Tech Stickers Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-bold flex items-center gap-1.5">
                <span className="text-base">🐍</span> Python & Java
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-bold flex items-center gap-1.5">
                <span className="text-base">🎨</span> HTML, CSS & JavaScript
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-bold flex items-center gap-1.5">
                <span className="text-base">⚛️</span> React & Tailwind
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-bold flex items-center gap-1.5">
                <span className="text-base">🎓</span> GLA Univ CSE Hons
              </span>
            </div>

            {/* Call to Actions & Interactive Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              
              {/* Try Interactive Live Projects Button */}
              <a
                href="#projects"
                onClick={() => sfx.playSuccess()}
                className="px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-yellow-400/20 hover:scale-103 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Explore Live Project Demos</span>
              </a>

              {/* View Education */}
              <a
                href="#education"
                onClick={() => sfx.playClick()}
                className="px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 font-bold text-sm flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-yellow-400" />
                <span>GLA University Education</span>
              </a>

              {/* Copy Email Button with instant feedback */}
              <button
                onClick={handleCopyEmail}
                className="px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 border border-zinc-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy University Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-yellow-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

            </div>

            {/* Quick Social / Coordinates links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-zinc-400">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playBlip(550)}
                className="flex items-center gap-1.5 text-xs font-bold hover:text-yellow-400 transition-colors"
              >
                <Github className="w-4 h-4 text-zinc-300" />
                <span>GitHub Profile</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playBlip(600)}
                className="flex items-center gap-1.5 text-xs font-bold hover:text-yellow-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-zinc-300" />
                <span>LinkedIn Profile</span>
              </a>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1 text-xs text-zinc-400 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                <span>Mathura, India</span>
              </span>
            </div>

          </div>

          {/* Right Hero: Professional Yellow-Bordered Profile Card featuring Shrishti's Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md"
            >
              {/* Outer Vibrant Yellow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-3xl blur-sm opacity-80" />

              {/* Main Card Container */}
              <div className="relative rounded-3xl bg-zinc-950 border-2 border-yellow-400 p-6 shadow-2xl overflow-hidden">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black text-xs shadow-md">
                      ST
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-sm text-white tracking-tight">
                        GLA UNIVERSITY
                      </h3>
                      <p className="text-[10px] font-mono text-yellow-400 font-bold">
                        B.TECH (HONS) CSE • CS.H25
                      </p>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400/20 border border-yellow-400 text-yellow-400 text-[10px] font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"></span>
                    VERIFIED STUDENT
                  </span>
                </div>

                {/* Shrishti's Photo in Clean Modern Frame */}
                <div className="relative mb-5 group">
                  <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 shadow-inner">
                    <img
                      src={profile.avatarUrl || '/profile.jpeg'}
                      alt="Shrishti Tiwari"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-85" />

                    {/* Bottom overlay inside photo */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-heading font-black text-white text-base">
                          Shrishti Tiwari
                        </div>
                        <div className="font-mono text-[11px] text-yellow-400 font-semibold">
                          shrishti.shrishti_cs.h25@gla.ac.in
                        </div>
                      </div>

                      <button
                        onClick={onOpenEditor}
                        className="px-2.5 py-1 bg-yellow-400 text-black font-extrabold rounded-lg text-[11px] hover:bg-yellow-300 transition-colors cursor-pointer"
                        title="Change Photo or Links"
                      >
                        Edit Links
                      </button>
                    </div>
                  </div>
                </div>

                {/* Key Metrics / Highlights Grid */}
                <div className="grid grid-cols-3 gap-2 text-center font-mono border-t border-zinc-850 pt-4">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-lg font-black text-yellow-400">06</div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Projects</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-lg font-black text-white">2025</div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Graduation</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-lg font-black text-yellow-400">GLA</div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Honors CS</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
