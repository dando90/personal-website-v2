import Link from "next/link";
import type { CommonContent, HomeContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { localizedPath, type PageKey } from "@/lib/routes";
import ArrowMark from "@/components/ui/arrow-mark";
import ButtonLink from "@/components/ui/button-link";

const pageLabels = {
  about: "about",
  experience: "experience",
  skills: "skills",
  projects: "projects",
  contact: "contact",
} as const satisfies Record<Exclude<PageKey, "home">, keyof CommonContent["nav"]>;

export default function HomePage({
  locale,
  home,
  common,
}: {
  locale: Locale;
  home: HomeContent;
  common: CommonContent;
}) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <section
          aria-labelledby="hero-title"
          className="overflow-hidden rounded-3xl bg-hero px-6 py-12 text-hero-ink sm:rounded-4xl sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          <p className="mb-5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.13em] text-hero-muted sm:text-sm">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-ai" />
            {home.hero.eyebrow}
          </p>
          <h1
            className="max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-hero-ink sm:text-5xl md:text-6xl lg:text-7xl"
            id="hero-title"
          >
            {home.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-hero-muted sm:text-xl sm:leading-8">
            {home.hero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink
              href={localizedPath(locale, "projects")}
              variant="primary"
              arrow
            >
              {home.hero.projects}
            </ButtonLink>
            <ButtonLink
              href={localizedPath(locale, "about")}
              variant="dark-outline"
            >
              {home.hero.about}
            </ButtonLink>
          </div>
          <ul
            aria-label={home.hero.areasLabel}
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {home.hero.tags.map((tag, index) => (
              <li
                className="rounded-lg bg-white/8 px-3 py-2 text-xs font-medium text-hero-muted sm:text-sm"
                key={tag}
              >
                {index === 0 ? (
                  <span aria-hidden="true" className="mr-1.5 text-ai">
                    ●
                  </span>
                ) : null}
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        aria-labelledby="explore-title"
        className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
            {home.explore.eyebrow}
          </p>
          <h2
            className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl"
            id="explore-title"
          >
            {home.explore.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
            {home.explore.description}
          </p>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.explore.items.map((item) => (
              <li key={item.page}>
                <OverviewCard
                  locale={locale}
                  page={item.page}
                  label={common.nav[pageLabels[item.page]]}
                  description={item.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function OverviewCard({
  locale,
  page,
  label,
  description,
}: {
  locale: Locale;
  page: Exclude<PageKey, "home">;
  label: string;
  description: string;
}) {
  return (
    <Link
      className="group block h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand/40 hover:bg-brand-soft/40 focus-visible:outline-offset-4 sm:p-7"
      href={localizedPath(locale, page)}
    >
      <span className="flex items-center justify-between gap-4 text-lg font-semibold tracking-tight text-ink">
        {label}
        <ArrowMark />
      </span>
      <span className="mt-3 block text-sm leading-6 text-secondary sm:text-base sm:leading-7">
        {description}
      </span>
    </Link>
  );
}
