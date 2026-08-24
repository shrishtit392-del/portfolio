import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Code2, 
  FolderGit2, 
  GraduationCap, 
  Mail, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal,
  Sparkles,
  Menu,
  X,
  Play
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface NavbarProps {
  onOpenEditor: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  avatarUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEditor,
  isDarkMode,
  onToggleDarkMode,
  avatarUrl,
}) => {
  const [isMuted, setIsMuted] = useState(sfx.getIsMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'playground', 'projects', 'academics', 'terminal', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sfx.setMuted(newMuted);
    if (!newMuted) {
      sfx.playSuccess();
    }
  };

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: '👩‍💻' },
    { name: 'Skills', href: '#skills', id: 'skills', icon: '⚡' },
    { name: 'Projects', href: '#projects', id: 'projects', icon: '🚀', count: '6' },
    { name: 'Education', href: '#academics', id: 'academics', icon: '🎓' },
    { name: 'Playground', href: '#playground', id: 'playground', icon: '💻' },
    { name: 'Terminal', href: '#terminal', id: 'terminal', icon: '📟' },
    { name: 'Contact', href: '#contact', id: 'contact', icon: '📬' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 shadow-xl py-2.5' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Profile Avatar */}
          <a
            href="#hero"
            onClick={() => sfx.playClick()}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl p-0.5 bg-yellow-400 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <img
                  src={avatarUrl || '/profile.jpeg'}
                  alt="Shrishti Tiwari"
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-yellow-400 border-2 border-black rounded-full animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-black text-lg tracking-tight flex items-center gap-1.5 text-white group-hover:text-yellow-400 transition-colors">
                <span>Shrishti Tiwari</span>
                <span className="text-sm">✨</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <span>GLA Univ CS '25</span>
                <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
                <span className="text-yellow-400 font-bold">Open to Opportunities</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => sfx.playClick()}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-yellow-400 text-black shadow-md font-black scale-102'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-sm">{link.icon}</span>
                  <span>{link.name}</span>
                  {link.count && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold ${
                      isActive ? 'bg-black text-yellow-400' : 'bg-zinc-800 text-yellow-400'
                    }`}>
                      {link.count}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 border border-zinc-800 transition-all text-xs flex items-center gap-1 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-yellow-400 animate-pulse" />
              )}
            </button>

            {/* Link Customizer / Settings */}
            <button
              onClick={() => {
                sfx.playClick();
                onOpenEditor();
              }}
              title="Customize Links & URLs"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 border border-zinc-800 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
              <span className="hidden sm:inline font-mono text-[11px] font-bold">Edit URLs</span>
            </button>

            {/* Direct Contact Button */}
            <a
              href="#contact"
              onClick={() => sfx.playSuccess()}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black rounded-xl shadow-md shadow-yellow-400/20 hover:scale-103 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Shrishti</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 text-white border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sfx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-zinc-200 hover:text-black hover:bg-yellow-400 rounded-xl transition-all"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => {
                sfx.playSuccess();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-center px-4 py-2.5 bg-yellow-400 text-black text-sm font-black rounded-xl mt-2"
            >
              Contact Shrishti
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
