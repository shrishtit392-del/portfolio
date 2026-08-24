export type ProjectCategory = 'Frontend' | 'JavaScript' | 'Utility' | 'Fullstack' | 'Python' | 'Java';

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  cartoonIcon: string;
  badge: string;
  demoType: 'weather' | 'quiz' | 'todo' | 'palette' | 'calculator' | 'timer' | 'external';
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  architecture?: {
    flow: string[];
    specs: string[];
  };
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  experience: string;
  tag: string;
  iconName: string;
  cartoonBadge?: string;
  cartoonEmoji?: string;
  snippet?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  cartoonIcon: string;
  skills: SkillItem[];
}

export interface EducationMilestone {
  institution: string;
  degree: string;
  location: string;
  period: string;
  scoreOrGrade: string;
  badge: string;
  cartoonEmoji: string;
  description: string;
  keySubjects: string[];
  achievements: string[];
}

export interface EducationInfo {
  degree: string;
  specialization: string;
  institution: string;
  batch: string;
  duration: string;
  status: string;
  coursework: { name: string; grade: string; desc: string; icon: string }[];
  milestones: EducationMilestone[];
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  type: string;
  cartoonIcon: string;
  description: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  titleRole: string;
  shortBio: string;
  institution: string;
  degree: string;
  batch: string;
  studentIdCode: string;
  email: string;
  altEmail: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl?: string;
  avatarUrl: string;
  location: string;
  availableForRoles: boolean;
}

