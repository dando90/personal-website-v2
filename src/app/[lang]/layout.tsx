import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { copy, defaultLocale, isLocale, locales } from "@/lib/i18n";
import { geistMono, geistSans } from "@/lib/fonts";

const siteUrl = "https://www.stefanochiabrando.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const content = copy[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        it: "/it/",
        es: "/es/",
        "x-default": "/en/",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
