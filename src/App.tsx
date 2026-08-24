/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialProfileData, initialProjects } from './data/portfolioData';
import { ProfileData, Project } from './types';
import { Navbar } from './components/Navbar';
import { HeroModern } from './components/HeroModern';
import { InteractiveCodePlayground } from './components/InteractiveCodePlayground';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ProjectsIndex } from './components/ProjectsIndex';
import { AboutAndAcademics } from './components/AboutAndAcademics';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { LinkEditorModal } from './components/LinkEditorModal';
import { LiveProjectDemoModal } from './components/LiveProjectDemoModal';
import { Footer } from './components/Footer';

export default function App() {
  // Load saved profile data or use defaults with Shrishti's real photo
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('shrishti_portfolio_profile_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      ...initialProfileData,
      avatarUrl: '/profile.jpeg'
    };
  });

  // Load saved projects or use defaults
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('shrishti_portfolio_projects_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return initialProjects;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState(false);
  const [selectedLiveProject, setSelectedLiveProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync profile changes to localStorage
  const handleUpdateProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('shrishti_portfolio_profile_v3', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Sync project link changes to localStorage
  const handleUpdateProjects = (updated: Project[]) => {
    setProjects(updated);
    try {
      localStorage.setItem('shrishti_portfolio_projects_v3', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleResetDefaults = () => {
    const resetData = {
      ...initialProfileData,
      avatarUrl: '/profile.jpeg'
    };
    setProfile(resetData);
    setProjects(initialProjects);
    try {
      localStorage.removeItem('shrishti_portfolio_profile_v3');
      localStorage.removeItem('shrishti_portfolio_projects_v3');
    } catch {
      // Ignore
    }
  };

  const handleOpenLiveDemo = (project: Project) => {
    setSelectedLiveProject(project);
    setIsLiveDemoOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      
      {/* Top Floating Navigation */}
      <Navbar
        onOpenEditor={() => setIsEditorOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        avatarUrl={profile.avatarUrl || '/profile.jpeg'}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="space-y-4">
        
        {/* 1. Hero Section with Real Photo & Professional Yellow/White/Black theme */}
        <HeroModern
          profile={profile}
          onOpenEditor={() => setIsEditorOpen(true)}
          isDarkMode={isDarkMode}
        />

        {/* 2. About & GLA University Academics & Education */}
        <AboutAndAcademics isDarkMode={isDarkMode} />

        {/* 3. Skills Matrix (Python, Java, Frontend, Backend, Cloud) */}
        <SkillsMatrix isDarkMode={isDarkMode} />

        {/* 4. Projects Archive (Weather App, Calculator, Quiz Game, Todo App, etc.) with Functional Live Demos */}
        <ProjectsIndex
          projects={projects}
          onOpenEditor={() => setIsEditorOpen(true)}
          onOpenLiveDemo={handleOpenLiveDemo}
          isDarkMode={isDarkMode}
        />

        {/* 5. Live Interactive Code Runner (Python, Java, HTML/JS) */}
        <InteractiveCodePlayground isDarkMode={isDarkMode} />

        {/* 6. Interactive Developer CLI Terminal */}
        <InteractiveTerminal
          profile={profile}
          isDarkMode={isDarkMode}
        />

        {/* 7. Contact Section & Direct Email Transmission */}
        <ContactSection
          profile={profile}
          onOpenEditor={() => setIsEditorOpen(true)}
          isDarkMode={isDarkMode}
        />
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />

      {/* Interactive Live Project Demo Modal */}
      <LiveProjectDemoModal
        isOpen={isLiveDemoOpen}
        onClose={() => {
          setIsLiveDemoOpen(false);
          setSelectedLiveProject(null);
        }}
        project={selectedLiveProject}
        isDarkMode={isDarkMode}
      />

      {/* Customizer Modal for Updating URLs and Profile info */}
      <LinkEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        projects={projects}
        onUpdateProjects={handleUpdateProjects}
        onResetDefaults={handleResetDefaults}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
