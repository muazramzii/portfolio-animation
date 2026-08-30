export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export const portraitSrc = "/character.png"

export const socials = {
  github: "https://github.com/muazramzii",
  linkedin: "https://linkedin.com/in/muazramzi",
  email: "muazramzi.123@gmail.com",
}

export type StatCard = {
  label: string
  value: string
}

export const stats: StatCard[] = [
  { label: "Final Year Student", value: "IT (Hons)" },
  { label: "Full Stack Developer", value: "MERN & More" },
  { label: "AI Enthusiast", value: "LLMs & CV" },
  { label: "Based In", value: "Malaysia" },
]

export type TechCategory = {
  title: string
  items: string[]
}

export const techStack: TechCategory[] = [
  { title: "Frontend", items: ["React", "Next.js", "Flutter", "Tailwind"] },
  { title: "Backend", items: ["Node.js", "Django", "Express", "Java"] },
  { title: "Database", items: ["MySQL", "PostgreSQL", "Firebase", "Supabase"] },
  { title: "AI / Tools", items: ["Python", "GitHub", "Docker", "Figma"] },
]

export type Project = {
  title: string
  subtitle: string
  description: string
  badges: string[]
}

export const projects: Project[] = [
  {
    title: "ARAMS",
    subtitle: "Academic Research Analytics & Monitoring System",
    description:
      "Research management platform with analytics dashboard, reporting, role management, PDF generation, and institutional workflow.",
    badges: ["PHP", "MySQL", "JavaScript"],
  },
  {
    title: "Hear & Speak Together",
    subtitle: "AI-Assisted Pronunciation Learning",
    description:
      "AI-assisted pronunciation learning application designed for hearing-impaired children with speech evaluation and progress tracking.",
    badges: ["Flutter", "Firebase", "Whisper AI"],
  },
  {
    title: "Tabara",
    subtitle: "Smart Personal Finance",
    description:
      "Personal finance application featuring receipt scanning, AI chatbot assistant, spending analytics, and smart budgeting.",
    badges: ["React Native", "Supabase", "Gemini AI"],
  },
]

export type ExperienceItem = {
  year: string
  title: string
  place: string
}

export const experience: ExperienceItem[] = [
  {
    year: "2023",
    title: "Diploma in Information Technology",
    place: "Politeknik Ungku Omar",
  },
  {
    year: "2025",
    title: "Bachelor of Information Technology (Hons)",
    place: "Universiti Tun Hussein Onn Malaysia",
  },
  {
    year: "2026",
    title: "Software Engineer Intern",
    place: "SecureLabX Sdn. Bhd.",
  },
]
