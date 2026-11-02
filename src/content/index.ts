import type { Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/routes";
import { aboutCopy } from "./about";
import { commonCopy } from "./common";
import { contactCopy } from "./contact";
import { experienceCopy } from "./experience";
import { homeCopy } from "./home";
import { projectsCopy } from "./projects";
import { skillsCopy } from "./skills";

export function getSiteContent(locale: Locale) {
  return {
    common: commonCopy[locale],
    home: homeCopy[locale],
    about: aboutCopy[locale],
    experience: experienceCopy[locale],
    projects: projectsCopy[locale],
    skills: skillsCopy[locale],
    contact: contactCopy[locale],
  };
}

export type SiteContent = ReturnType<typeof getSiteContent>;

export function getPageMetadata(locale: Locale, page: PageKey) {
  const content = getSiteContent(locale);

  switch (page) {
    case "home":
      return content.home.metadata;
    case "about":
      return {
        title: content.about.about.title,
        description: content.about.about.description,
      };
    case "experience":
      return {
        title: content.experience.experience.title,
        description: content.experience.experience.items[0].description,
      };
    case "skills":
      return {
        title: content.skills.skills.title,
        description: content.skills.skills.groups
          .map((group) => `${group.title}: ${group.items.join(", ")}`)
          .join("; "),
      };
    case "projects":
      return {
        title: content.projects.projects.title,
        description: content.projects.projects.description,
      };
    case "contact":
      return {
        title: content.contact.contact.title,
        description: content.contact.contact.description,
      };
  }
}
