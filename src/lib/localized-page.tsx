import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteLayout from "@/components/layout/site-layout";
import type { PageKey } from "@/lib/routes";
import HomePage from "@/features/home/home-page";
import AboutPage from "@/features/about/about-page";
import ExperiencePage from "@/features/experience/experience-page";
import SkillsPage from "@/features/skills/skills-page";
import ProjectsPage from "@/features/projects/projects-page";
import ContactPage from "@/features/contact/contact-page";
import { getPageMetadata, getSiteContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

const siteUrl = "https://www.stefanochiabrando.com";

export type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

export async function resolveLocale(
  params: LocalizedPageProps["params"],
): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

export async function localizedPageMetadata(
  params: LocalizedPageProps["params"],
  page: PageKey,
): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const metadata = getPageMetadata(locale, page);

  return {
    metadataBase: new URL(siteUrl),
    title:
      page === "home" ? metadata.title : `${metadata.title} | Stefano Chiabrando`,
    description: metadata.description,
    alternates: {
      canonical: localizedPath(locale, page),
      languages: {
        en: localizedPath("en", page),
        it: localizedPath("it", page),
        es: localizedPath("es", page),
        "x-default": localizedPath("en", page),
      },
    },
  };
}

export default async function LocalizedPage({
  params,
  page,
}: LocalizedPageProps & { page: PageKey }) {
  const locale = await resolveLocale(params);
  const content = getSiteContent(locale);

  let pageContent: ReactNode;
  switch (page) {
    case "home":
      pageContent = (
        <HomePage locale={locale} home={content.home} common={content.common} />
      );
      break;
    case "about":
      pageContent = <AboutPage content={content.about} />;
      break;
    case "experience":
      pageContent = <ExperiencePage content={content.experience} />;
      break;
    case "skills":
      pageContent = <SkillsPage content={content.skills} />;
      break;
    case "projects":
      pageContent = <ProjectsPage content={content.projects} />;
      break;
    case "contact":
      pageContent = <ContactPage content={content.contact} />;
      break;
  }

  return (
    <SiteLayout locale={locale} page={page} content={content.common}>
      {pageContent}
    </SiteLayout>
  );
}
