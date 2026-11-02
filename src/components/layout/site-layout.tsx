import type { ReactNode } from "react";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import type { CommonContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/routes";

export default function SiteLayout({
  locale,
  page,
  content,
  children,
}: {
  locale: Locale;
  page: PageKey;
  content: CommonContent;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} page={page} content={content} />
      <main className="flex-1" id="top">
        {children}
      </main>
      <SiteFooter content={content.footer} />
    </>
  );
}
