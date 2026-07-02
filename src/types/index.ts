export type ProjectCategory = "websites" | "react-native" | "flutter";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "email" | "phone";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  accentColor: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface CommandItem {
  id: string;
  label: string;
  action: string;
  shortcut?: string;
  group: string;
}

export interface HeroContent {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface AboutContent {
  title: string;
  roles: string[];
  intro: string;
  technologies: string[];
}

export interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  social: SocialLink[];
}

export interface SeoContent {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle: string;
}
