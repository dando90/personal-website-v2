import type { Locale } from "@/lib/i18n";
import type { ProjectId } from "@/lib/project-assets";
import type { PageKey } from "@/lib/routes";

export type Localized<T> = Record<Locale, T>;

export interface CommonContent {
  nav: {
    navigation: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    language: string;
  };
  footer: {
    note: string;
    socialLinks: string;
    backToTop: string;
  };
}

export interface HomeContent {
  metadata: { title: string; description: string };
  hero: {
    areasLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    projects: string;
    about: string;
    tags: readonly string[];
  };
  explore: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly { page: Exclude<PageKey, "home">; description: string }[];
  };
}

export interface AboutContent {
  about: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
    principlesTitle: string;
    principles: readonly string[];
  };
}

export interface ExperienceContent {
  experience: {
    eyebrow: string;
    title: string;
    items: readonly {
      role: string;
      company: string;
      period: string;
      description: string;
    }[];
  };
}

export interface ProjectsContent {
  projects: {
    tagsLabel: string;
    sourceCode: string;
    liveDemo: string;
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      id: ProjectId;
      number: string;
      title: string;
      imageAlt: string;
      description: string;
      tags: readonly string[];
    }[];
    github: string;
  };
}

export interface SkillsContent {
  skills: {
    eyebrow: string;
    title: string;
    groups: readonly { title: string; items: readonly string[] }[];
  };
}

export interface ContactContent {
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    linkedin: string;
    github: string;
  };
}
