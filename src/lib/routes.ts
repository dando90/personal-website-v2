import type { Locale } from "@/lib/i18n";

export const pageKeys = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

export type PageKey = (typeof pageKeys)[number];

const pageSlugs: Record<PageKey, string> = {
  home: "",
  about: "about",
  experience: "experience",
  skills: "skills",
  projects: "projects",
  contact: "contact",
};

export function localizedPath(locale: Locale, page: PageKey): string {
  const slug = pageSlugs[page];
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

export function canonicalPath(locale: Locale, page: PageKey): string {
  return localizedPath(locale, page);
}
