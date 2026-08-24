import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';

export const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const scrollToTop = () => {
    sfx.playSuccess();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-black text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-zinc-800 pb-8 mb-8">
          
          {/* Left branding */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black font-black text-xs flex items-center justify-center shadow-md">
                ST
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-white">
                Shrishti Tiwari
              </span>
              <span className="font-mono text-[11px] bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-md border border-yellow-400/30 font-bold">
                GLA UNIV '25
              </span>
            </div>
            <p className="font-sans-body text-xs text-zinc-400 max-w-md">
              B.Tech (Hons) Computer Science & Engineering • GLA University, Mathura.
              Core skills in Python, Java, Frontend (HTML/CSS/JS/React), Backend APIs, and Cloud.
            </p>
          </div>

          {/* Right quick actions */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3 font-mono text-xs">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-yellow-400 border border-zinc-700 font-black transition-all cursor-pointer shadow-md hover:border-yellow-400"
            >
              <ArrowUp className="w-4 h-4 text-yellow-400" />
              <span>RETURN TO TOP ↑</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © 2025 Shrishti Tiwari • Designed with Yellow, White & Black ⚡
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            <span className="text-zinc-300 font-bold">GLA University B.Tech CS (Hons)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
