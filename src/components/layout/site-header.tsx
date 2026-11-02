import Link from "next/link";
import LocaleSwitcher from "@/components/layout/locale-switcher";
import type { CommonContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { localizedPath, type PageKey } from "@/lib/routes";

export default function SiteHeader({
  locale,
  content,
  page,
}: {
  locale: Locale;
  content: CommonContent;
  page: PageKey;
}) {
  const navigation = [
    { page: "about" as const, label: content.nav.about },
    { page: "experience" as const, label: content.nav.experience },
    { page: "projects" as const, label: content.nav.projects },
    { page: "skills" as const, label: content.nav.skills },
    { page: "contact" as const, label: content.nav.contact },
  ];

  return (
    <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-5 px-5 py-6 sm:px-8 lg:py-7">
      <Link
        className="order-1 rounded-sm text-base font-semibold tracking-tight text-ink"
        href={localizedPath(locale, "home")}
      >
        Stefano Chiabrando<span className="text-brand">.</span>
      </Link>

      <nav
        aria-label={content.nav.navigation}
        className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-secondary sm:order-2 sm:w-auto"
      >
        {navigation.map((item) => (
          <Link
            className="rounded-sm transition-colors hover:text-brand"
            aria-current={page === item.page ? "page" : undefined}
            href={localizedPath(locale, item.page)}
            key={item.page}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="order-2 sm:order-3">
        <LocaleSwitcher
          locale={locale}
          label={content.nav.language}
          page={page}
        />
      </div>
    </header>
  );
}
