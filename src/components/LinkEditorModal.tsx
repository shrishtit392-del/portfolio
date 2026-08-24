import React, { useState } from 'react';
import { ProfileData, Project } from '../types';
import { sfx } from '../utils/audio';
import { 
  X, 
  Save, 
  RotateCcw, 
  Github, 
  Linkedin, 
  Phone, 
  Mail, 
  Image, 
  Check, 
  Sparkles,
  Link2
} from 'lucide-react';

interface LinkEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onUpdateProfile: (updated: ProfileData) => void;
  projects: Project[];
  onUpdateProjects: (updated: Project[]) => void;
  onResetDefaults: () => void;
  isDarkMode: boolean;
}

export const LinkEditorModal: React.FC<LinkEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  projects,
  onUpdateProjects,
  onResetDefaults,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile');
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);
  const [tempProjects, setTempProjects] = useState<Project[]>(projects);
  const [savedStatus, setSavedStatus] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    sfx.playSuccess();
    onUpdateProfile(tempProfile);
    onUpdateProjects(tempProjects);
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
      onClose();
    }, 800);
  };

  const handleProjectLinkChange = (id: string, field: 'githubUrl' | 'liveUrl', value: string) => {
    setTempProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-zinc-800 shadow-2xl rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-black border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black text-xs">
              ⚙️
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                Profile & Links Customizer
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Update URLs, Social Links, and Profile Details
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-zinc-800 bg-black font-mono text-xs font-bold">
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('profile');
            }}
            className={`flex-1 py-3.5 px-4 text-center transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-zinc-900 text-yellow-400 border-b-2 border-yellow-400 font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            1. Social & Contact Links
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('projects');
            }}
            className={`flex-1 py-3.5 px-4 text-center transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-zinc-900 text-yellow-400 border-b-2 border-yellow-400 font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            2. Project URLs (01–06)
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs space-y-4 flex-1">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-yellow-400" />
                  <span>GitHub Profile Link</span>
                </label>
                <input
                  type="url"
                  value={tempProfile.githubUrl}
                  onChange={(e) => setTempProfile({ ...tempProfile, githubUrl: e.target.value })}
                  placeholder="https://github.com/shrishti-tiwari"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-yellow-400" />
                  <span>LinkedIn Profile Link</span>
                </label>
                <input
                  type="url"
                  value={tempProfile.linkedinUrl}
                  onChange={(e) => setTempProfile({ ...tempProfile, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/shrishti-tiwari-cs"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-yellow-400" />
                    <span>University Email</span>
                  </label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Contact Number</span>
                  </label>
                  <input
                    type="text"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Profile Photo URL</span>
                </label>
                <input
                  type="text"
                  value={tempProfile.avatarUrl}
                  onChange={(e) => setTempProfile({ ...tempProfile, avatarUrl: e.target.value })}
                  placeholder="/profile.jpeg"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {tempProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3"
                >
                  <div className="font-bold flex items-center justify-between text-white">
                    <span className="flex items-center gap-1.5">
                      <span>{proj.cartoonIcon || '🚀'}</span>
                      <span>{proj.number}. {proj.title}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-400 text-black font-bold">
                      {proj.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-1">
                        GITHUB REPO URL:
                      </span>
                      <input
                        type="url"
                        value={proj.githubUrl}
                        onChange={(e) => handleProjectLinkChange(proj.id, 'githubUrl', e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-black border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-1">
                        LIVE DEMO URL / INTERACTIVE TYPE:
                      </span>
                      <input
                        type="url"
                        value={proj.liveUrl}
                        onChange={(e) => handleProjectLinkChange(proj.id, 'liveUrl', e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-black border border-zinc-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              sfx.playBlip(400);
              onResetDefaults();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-mono text-xs font-black shadow-md shadow-yellow-400/20 cursor-pointer"
            >
              {savedStatus ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedStatus ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
