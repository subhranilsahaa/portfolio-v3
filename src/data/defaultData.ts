import { PortfolioData } from '../types';

export const DEFAULT_DATA: PortfolioData = {
  name: "Your Name",
  title: "Full-Stack Developer",
  roles: ["Developer", "Designer", "Problem Solver", "Builder"],
  bio: "I craft thoughtful digital experiences — from architecture to interface. Focused on clean code, sharp design, and work that lasts.",
  email: "hello@yourname.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  adminPassword: "portfolio2025",
  skills: [
    { id: 1, name: "React", category: "Frontend", level: 90 },
    { id: 2, name: "TypeScript", category: "Frontend", level: 85 },
    { id: 3, name: "Tailwind CSS", category: "Frontend", level: 88 },
    { id: 4, name: "Node.js", category: "Backend", level: 82 },
    { id: 5, name: "Python", category: "Backend", level: 78 },
    { id: 6, name: "PostgreSQL", category: "Backend", level: 75 },
    { id: 7, name: "AWS", category: "DevOps", level: 70 },
    { id: 8, name: "Docker", category: "DevOps", level: 72 },
    { id: 9, name: "Figma", category: "Design", level: 80 },
  ],
  projects: [
    { id: 1, title: "Project Alpha", description: "A full-stack web application built with React and Node.js.", tags: ["React", "Node.js", "PostgreSQL"], url: "#" },
    { id: 2, title: "Project Beta", description: "A mobile-first design system and component library.", tags: ["TypeScript", "Tailwind", "Figma"], url: "#" },
    { id: 3, title: "Project Gamma", description: "Automated cloud infrastructure and deployment pipeline.", tags: ["AWS", "Docker", "Python"], url: "#" },
  ],
};
