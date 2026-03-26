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
    imageSrc: "/projects/backsnap.jpg",
    imageAlt: "BackSnap project preview",
    imageCaption: "Concept preview for the BackSnap storytelling experience.",
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
    imageSrc: "/projects/kad.jpg",
    imageAlt: "Kad generative CAD interface preview",
    imageCaption: "Early direction for the text-to-CAD workflow inside Kad.",
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
    imageSrc: "/projects/genscape.jpg",
    imageAlt: "GenScape landscape design preview",
    imageCaption: "Visual mockup showing the GenScape landscape planning style.",
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
    imageSrc: "/projects/tech-hub.jpg",
    imageAlt: "Tech Hub infrastructure dashboard preview",
    imageCaption: "A snapshot representing the internal Tech Hub lab environment.",
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
    imageSrc: "/projects/dump-go.jpg",
    imageAlt: "Dump and Go systems workflow preview",
    imageCaption: "Operational tooling concept for quoting and logistics visibility.",
  },
  {
    name: "Shop Automation Stack",
    desc: "Internal systems for CNC workflows, file handling, infrastructure, and process reliability.",
    tags: ["CNC", "Automation"],
    status: "Back-Burner",
    detail:
      "The automation stack connects real shop needs to technical systems. It covers repeatable production processes, cleaner file movement, and infrastructure that helps work stay consistent.",
    highlights: [
      "Workflow reliability for production",
      "Automation around repetitive tasks",
      "Practical infrastructure for the shop floor",
    ],
    imageSrc: "/projects/shop-automation.jpg",
    imageAlt: "Shop automation stack preview",
    imageCaption: "Representative visual for the CNC and automation workflow stack.",
  },
  {
    name: "America Made UAS",
    desc: "Drone Autonomous theory startup",
    tags: ["CNC", "Automation"],
    status: "Submitted",
    detail:
      "Engineered and developed a business model for an autonomous drone company combating real-world problems for public safety and firstresponders.",
    highlights: [
      "TAK integration for real-time situational awareness",
      "Autonomous flight systems for rapid deployment",
      "American Made certification for government contracting",
    ],
    imageSrc: "/projects/shop-automation.jpg",
    imageAlt: "Shop automation stack preview",
    imageCaption: "Representative visual for the CNC and automation workflow stack.",
  },
  {
    name: "Brossi Enterprises",
    desc: "Problem Solving hub for small businesses",
    tags: ["Advisory", "Capital"],
    status: "Active",
    detail:
      "One stop shop for problem solving and advisory services for small businesses.",
    highlights: [
      "How to and do it yourself guides for small business owners",
      "Network of vetted service providers for small businesses",
      "Capital access for small businesses with a focus on underserved communities",
    ],
    imageSrc: "/projects/shop-automation.jpg",
    imageAlt: "Shop automation stack preview",
    imageCaption: "Representative visual for the CNC and automation workflow stack.",
  },
];

export const writingItems: WritingItem[] = [
  {
    slug: "building-across-trades-and-tech",
    title: "Building Across Trades and Tech",
    blurb:
      "What changes when product thinking is grounded in operations, machines, and the real world.",
    type: "Essay",
    detail:
      "This piece is about the advantage of building from field experience instead of theory alone. It connects trade work, systems thinking, and product decisions that stay useful under pressure.",
    publishedLabel: "Featured Essay",
    body: [
      "A lot of software gets imagined far away from the actual work it is supposed to support. When that happens, the result often looks polished but feels disconnected once it hits a real shop, a real field team, or a real operating business.",
      "Building across trades and tech changes that. You start to notice where tools create friction, where a workflow breaks down under time pressure, and where a seemingly small detail matters because it affects whether someone can actually get through the day cleanly.",
      "That is the lens I keep coming back to. Product thinking becomes stronger when it is informed by operations, by repetition, by physical constraints, and by people who do not have time for extra complexity. The goal is not to add software for the sake of software. The goal is to create something that makes the work clearer, faster, or more reliable.",
      "That approach also changes how I think about AI. The interesting question is not whether a system can do something impressive in isolation. The real question is whether it can fit into the rhythm of the work without introducing new confusion. When a tool respects the environment it is entering, it becomes much easier to trust and keep using.",
    ],
  },
  {
    slug: "Can-systems-beat-hustle",
    title: "Can Systems Beat Hustle",
    blurb:
      "Notes on replacing reactive work with infrastructure that compounds over time.",
    type: "Notes",
    detail:
      "A deeper look at how operating systems, documentation, and repeatable workflows create leverage. The writing leans practical, with examples from logistics, shop operations, and technical setup.",
    publishedLabel: "Operating Notes",
    body: [
      "Hustle can get something off the ground, but it is a weak long-term operating model. It depends too much on memory, urgency, and individual effort. That usually works right up until the work scales, gets busy, or depends on other people.",
      "Systems are what turn effort into leverage. A good system does not need to be complicated. It might just be a cleaner intake process, a better naming convention, a documented handoff, or a repeatable checklist that removes guesswork. Small systems can create a surprising amount of momentum because they reduce the mental load of doing the work well.",
      "What matters is compounding. A process that saves ten minutes once is not very interesting. A process that saves ten minutes every day across a team, while reducing mistakes at the same time, starts to shape the business in a more meaningful way.",
      "That is why I usually trust infrastructure over adrenaline. Hustle is sometimes necessary. Systems are what let you keep growing without having to relive the same problems over and over again.",
    ],
  },
  {
    slug: "ai-that-helps-people-work",
    title: "AI That Helps People Work",
    blurb:
      "Exploring a grounded approach to automation that supports execution instead of hype.",
    type: "Draft",
    detail:
      "This writing focuses on building AI tools that fit inside existing workflows. Instead of novelty for its own sake, the emphasis is on speed, clarity, and better decisions for working teams.",
    publishedLabel: "Draft in Progress",
    body: [
      "A useful AI tool should make someone feel more capable, not more dependent. That sounds obvious, but a lot of AI products still optimize for surprise instead of utility. They demo well, but they do not always hold up inside the practical messiness of day-to-day work.",
      "The better path is usually narrower and more grounded. Start with a real task, understand the existing workflow, and look for places where a model can reduce friction without forcing people to relearn everything around it. That might mean summarizing context faster, preparing a first draft, helping with classification, or making a complex system easier to query.",
      "The reason I care about that framing is simple: teams adopt tools that help them move. They do not adopt tools just because the underlying technology is interesting. The measure is whether the output is clearer, faster, and more reliable in context.",
      "That is the kind of AI I want to build more of. Not just impressive systems, but practical ones that actually earn a place in the workflow.",
    ],
  },
];

export function getWritingBySlug(slug: string) {
  return writingItems.find((item) => item.slug === slug);
}

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
