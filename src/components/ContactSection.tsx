import React, { useState } from 'react';
import { ProfileData } from '../types';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  ExternalLink, 
  SlidersHorizontal, 
  Sparkles, 
  MapPin,
  MessageSquare
} from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileData;
  onOpenEditor: () => void;
  isDarkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onOpenEditor,
  isDarkMode,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    sfx.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#facc15', '#ffffff', '#000000', '#eab308']
      });
    } catch {
      // Ignore
    }

    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSuccess();

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#facc15', '#ffffff', '#000000']
      });
    } catch {
      // Ignore
    }

    setIsSubmitted(true);

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry / SDE Opportunity'
    )}&body=${encodeURIComponent(
      `Hi Shrishti,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
            <span className="text-base">📬</span>
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-white">
            Get In Touch With Shrishti
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans-body">
            Open for software engineering opportunities, internships, technical discussions, and collaborative projects.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary University Email Card */}
            <div className="p-6 rounded-3xl bg-zinc-950 border-2 border-zinc-850 hover:border-yellow-400/60 shadow-2xl space-y-3 pro-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold">
                  <span className="text-xl">✉️</span>
                  <span>PRIMARY UNIVERSITY EMAIL</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-yellow-400 text-black">
                  GLA.AC.IN
                </span>
              </div>

              <div className="font-mono text-sm font-bold text-yellow-300 break-all select-all bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                {profile.email}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-mono text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-yellow-400/15 transition-all cursor-pointer"
                >
                  {copiedKey === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'email' ? 'Copied!' : 'Copy Email'}</span>
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => sfx.playClick()}
                  className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold border border-zinc-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Mail</span>
                  <ExternalLink className="w-3 h-3 text-yellow-400" />
                </a>
              </div>
            </div>

            {/* Direct Phone / WhatsApp */}
            <div className="p-6 rounded-3xl bg-zinc-950 border-2 border-zinc-850 hover:border-yellow-400/60 shadow-2xl space-y-3 pro-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold">
                  <span className="text-xl">📞</span>
                  <span>CONTACT NUMBER / PHONE</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-yellow-400 border border-yellow-400/30">
                  DIRECT
                </span>
              </div>

              <div className="font-mono text-sm font-bold text-white bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                {profile.phone}
              </div>

              <button
                onClick={() => copyToClipboard(profile.phone, 'phone')}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-white hover:text-yellow-400 border border-zinc-700 font-mono text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-yellow-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'phone' ? 'Copied Phone Number!' : 'Copy Phone Number'}</span>
              </button>
            </div>

            {/* Social Grid (GitHub & LinkedIn) */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playBlip(550)}
                className="p-4 rounded-2xl bg-zinc-950 border-2 border-zinc-850 hover:border-yellow-400 text-center transition-all group block shadow-lg pro-card"
              >
                <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🐱</div>
                <div className="font-heading font-black text-sm text-white">GitHub</div>
                <div className="font-mono text-[10px] text-yellow-400 truncate mt-0.5 font-bold">
                  @shrishti-tiwari
                </div>
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playBlip(600)}
                className="p-4 rounded-2xl bg-zinc-950 border-2 border-zinc-850 hover:border-yellow-400 text-center transition-all group block shadow-lg pro-card"
              >
                <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">💼</div>
                <div className="font-heading font-black text-sm text-white">LinkedIn</div>
                <div className="font-mono text-[10px] text-yellow-400 truncate mt-0.5 font-bold">
                  /in/shrishti-tiwari
                </div>
              </a>
            </div>

            {/* Campus Coordinates */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono flex items-center gap-2.5 text-zinc-300">
              <span className="text-xl">📍</span>
              <span>Campus: GLA University, Mathura • Uttar Pradesh, India</span>
            </div>

            {/* Customizer Button */}
            <button
              onClick={() => {
                sfx.playSuccess();
                onOpenEditor();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white hover:text-yellow-400 border border-zinc-700 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-yellow-400" />
              <span>Configure My Links & Real URLs</span>
            </button>

          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-zinc-950 border-2 border-zinc-850 hover:border-yellow-400/50 shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-6">
                <div>
                  <h3 className="font-heading font-black text-2xl text-white">
                    Send Direct Message
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-0.5">
                    Transmits directly to {profile.email}
                  </p>
                </div>
                <span className="text-2xl p-2 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">💬</span>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mx-auto text-2xl font-black shadow-lg shadow-yellow-400/30">
                    ✓
                  </div>
                  <h4 className="font-heading font-black text-2xl text-white">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs font-sans-body text-zinc-400 max-w-sm mx-auto">
                    Thank you for reaching out. Your default email client has also launched with your message.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-mono text-xs font-black"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 font-bold uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Smith"
                        className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 font-bold uppercase mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="recruiter@company.com"
                        className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 font-bold uppercase mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Software Engineering Opportunity / Collaboration"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 font-bold uppercase mb-1.5">
                      Message Content *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Shrishti, I came across your portfolio and would love to connect regarding..."
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 hover:scale-101 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Shrishti</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
