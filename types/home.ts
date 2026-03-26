import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  desc: string;
  tags: string[];
};

export type ProjectItem = {
  name: string;
  desc: string;
  tags: string[];
  status: string;
  detail: string;
  highlights: string[];
};

export type WritingItem = {
  title: string;
  blurb: string;
  type: string;
  detail: string;
};

export type SocialItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ContactLink = {
  label: string;
  href: string;
  primary: boolean;
};
