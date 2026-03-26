import { Github, Globe, Linkedin, Mail } from "lucide-react";
import type {
  ContactLink,
  ExperienceItem,
  NavItem,
  ProjectItem,
  SocialItem,
  StatItem,
  WritingItem,
} from "@/types/home";

export const navItems: NavItem[] = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "About Me", href: "/about" },
  { label: "Hobbies", href: "/hobbies" },
  { label: "Connect", href: "#contact" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Operations / IT / CNC Systems",
    company: "Fine Finish Inc.",
    period: "Current",
    desc: "Running shop systems, CNC workflows, server infrastructure, and production tech between trades and digital systems.",
    tags: ["CNC", "Infrastructure", "IT Systems"],
  },
  {
    role: "Co-Owner",
    company: "Dump & Go",
    period: "Current",
    desc: "Building and scaling a dumpster and logistics company through customer-focused operational systems, quoting strategy, and field execution.",
    tags: ["Operations", "Logistics", "Growth"],
  },
  {
    role: "Technical Engineer / Product Designer",
    company: "C2 Ventures",
    period: "2017-2021",
    desc: "Designed and launched full-stack websites for venture capital firms, integrating secure IAM and malware detection with custom CMS and analytics dashboards.",
    tags: ["Startup", "Analytics", "Product Design"],
  },
];

export const projects: ProjectItem[] = [
  {
    name: "BackSnap",
    desc: "AI-powered storytelling photo platform focused on preserving memories through voice and narrative.",
    tags: ["AI", "Product"],
    status: "Building",
    detail:
      "BackSnap is built around turning photo libraries into living memories. The focus is voice capture, family storytelling, and a smoother way to preserve context that usually gets lost in a camera roll.",
    highlights: [
      "Voice-first memory capture",
      "Narrative timelines built from photos",
      "Consumer-friendly AI storytelling flows",
    ],
  },
  {
    name: "Kad",
    desc: "Text-to-CAD and generative design tooling for faster, more intuitive creation.",
    tags: ["CAD", "AI", "Design"],
    status: "Testing",
    detail:
      "Kad explores a faster bridge between plain language and geometry. The goal is reducing the friction between an idea, a manufacturable model, and the iterations needed to make it practical.",
    highlights: [
      "Prompt-driven design generation",
      "Rapid concept iteration",
      "Manufacturing-minded workflows",
    ],
  },
  {
    name: "GenScape",
    desc: "AI landscape design system built around image input, plant intelligence, and rendering.",
    tags: ["AI", "Design"],
    status: "Beta",
    detail:
      "GenScape helps turn rough site images into more informed landscape concepts. It is aimed at combining inspiration, planting logic, and visual communication in one system.",
    highlights: [
      "Image-based concept generation",
      "Plant-aware design suggestions",
      "Faster client presentation mockups",
    ],
  },
  {
    name: "Tech Hub",
    desc: "A self-hosted AI and automation lab for local inference, security, networking, and experimentation.",
    tags: ["Infrastructure", "AI"],
    status: "Live",
    detail:
      "Tech Hub is the internal sandbox where infrastructure, local AI, and security workflows get tested before becoming usable systems. It supports experimentation without sacrificing control.",
    highlights: [
      "Self-hosted infrastructure",
      "Local inference experiments",
      "Automation and security testing",
    ],
  },
  {
    name: "Dump & Go Systems",
    desc: "Operational tooling and quoting flows that support a fast-moving logistics business.",
    tags: ["Logistics", "Systems"],
    status: "Scaling",
    detail:
      "This work focuses on making an operating business run cleaner: lead intake, quoting, dispatch thinking, and the little systems that reduce confusion during growth.",
    highlights: [
      "Customer-first quoting flow",
      "Operational visibility improvements",
      "Tools shaped by real field work",
    ],
  },
  {
    name: "Shop Automation Stack",
    desc: "Internal systems for CNC workflows, file handling, infrastructure, and process reliability.",
    tags: ["CNC", "Automation"],
    status: "Active",
    detail:
      "The automation stack connects real shop needs to technical systems. It covers repeatable production processes, cleaner file movement, and infrastructure that helps work stay consistent.",
    highlights: [
      "Workflow reliability for production",
      "Automation around repetitive tasks",
      "Practical infrastructure for the shop floor",
    ],
  },
];

export const writingItems: WritingItem[] = [
  {
    title: "Building Across Trades and Tech",
    blurb:
      "What changes when product thinking is grounded in operations, machines, and the real world.",
    type: "Essay",
    detail:
      "This piece is about the advantage of building from field experience instead of theory alone. It connects trade work, systems thinking, and product decisions that stay useful under pressure.",
  },
  {
    title: "Why Systems Beat Hustle",
    blurb:
      "Notes on replacing reactive work with infrastructure that compounds over time.",
    type: "Notes",
    detail:
      "A deeper look at how operating systems, documentation, and repeatable workflows create leverage. The writing leans practical, with examples from logistics, shop operations, and technical setup.",
  },
  {
    title: "AI That Helps People Work",
    blurb:
      "Exploring a grounded approach to automation that supports execution instead of hype.",
    type: "Draft",
    detail:
      "This writing focuses on building AI tools that fit inside existing workflows. Instead of novelty for its own sake, the emphasis is on speed, clarity, and better decisions for working teams.",
  },
];

export const socials: SocialItem[] = [
  { label: "Email", icon: Mail, href: "mailto:gregorycunninghamglc@gmail.com" },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gregory-cunningham333/",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/gregory3?tab=repositories",
  },
  { label: "X", icon: Globe, href: "https://x.com/theonearmgreggy" },
];

export const stats: StatItem[] = [
  { value: "3+", label: "Active Lanes" },
  { value: "6", label: "Live Builds" },
  { value: "∞", label: "In Motion" },
];

export const introLines = [
  "Builder across logistics, systems, operations, and AI.",
  "Running Fine Finish workflows and growing Dump & Go.",
  "Designing ventures in CAD, automation, and product infrastructure.",
  "Documenting the process while building in the real world.",
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:gregorycunninghamglc@gmail.com",
    primary: true,
  },
  {
    label: "Dump & Go",
    href: "mailto:office@dumpandgo.co",
    primary: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/gregory3?tab=repositories",
    primary: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gregory-cunningham333/",
    primary: false,
  },
  {
    label: "X",
    href: "https://x.com/theonearmgreggy",
    primary: false,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/the.one.arm.greggy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    primary: false,
  },
  {
    label: "Call",
    href: "tel:7815341405",
    primary: false,
  },
];
