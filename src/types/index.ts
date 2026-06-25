export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  roles: string[];
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  adminPassword?: string;
  skills: Skill[];
  projects: Project[];
}
