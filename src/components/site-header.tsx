import Link from "next/link";
import LocaleSwitcher from "@/components/locale-switcher";
import type { Locale, SiteCopy } from "@/lib/i18n";

export default function SiteHeader({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteCopy;
}) {
  const navigation = [
    { href: "#about", label: content.nav.about },
    { href: "#experience", label: content.nav.experience },
    { href: "#projects", label: content.nav.projects },
    { href: "#skills", label: content.nav.skills },
    { href: "#contact", label: content.nav.contact },
  ];

  return (
    <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-5 px-5 py-6 sm:px-8 lg:py-7">
      <Link
        className="order-1 rounded-sm text-base font-semibold tracking-tight text-ink"
        href="#top"
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
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="order-2 sm:order-3">
        <LocaleSwitcher locale={locale} label={content.nav.language} />
      </div>
    </header>
  );
}
