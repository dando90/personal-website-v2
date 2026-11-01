import Link from "next/link";
import type { ReactNode } from "react";
import ProjectImage from "@/components/project-image";
import ProfileImage from "@/components/profile-image";
import SocialIcon, { type SocialIconName } from "@/components/social-icon";
import { projectAssets, type ProjectId } from "@/lib/project-assets";
import SiteHeader from "@/components/site-header";
import { copy, type Locale } from "@/lib/i18n";

const githubUrl = "https://github.com/dando90";
const linkedInUrl = "https://www.linkedin.com/in/stefanochiabrando/";

const socialLinks: {
  name: SocialIconName;
  label: string;
  href: string;
  hoverColor: string;
}[] = [
  {
    name: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/stefanochiabrandoit/",
    hoverColor: "hover:text-[#3b5998]",
  },
  {
    name: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCpTh04i44v7Hc0kL-mOaasA",
    hoverColor: "hover:text-[#c4302b]",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: linkedInUrl,
    hoverColor: "hover:text-[#0e76a8]",
  },
  {
    name: "github",
    label: "GitHub",
    href: githubUrl,
    hoverColor: "hover:text-[#211f1f]",
  },
];

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-9 max-w-3xl sm:mb-12">
      <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
        {eyebrow}
      </p>
      <h2
        className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl"
        id={id}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ArrowMark() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block transition-transform group-hover:translate-x-0.5"
    >
      ↗
    </span>
  );
}

type ProjectItem = {
  id: ProjectId;
  number: string;
  title: string;
  description: string;
  imageAlt: string;
  tags: readonly string[];
};

type SkillGroupItem = {
  title: string;
  items: readonly string[];
};

function ButtonLink({
  href,
  variant,
  children,
  external = false,
  arrow = false,
}: {
  href: string;
  variant: "primary" | "dark-outline" | "outline";
  children: ReactNode;
  external?: boolean;
  arrow?: boolean;
}) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-hover",
    "dark-outline":
      "border border-white/25 text-hero-ink hover:border-white/50 hover:bg-white/8",
    outline:
      "border border-border text-ink hover:border-brand/50 hover:bg-brand-soft",
  };
  const className = `inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${styles[variant]}${arrow ? " group" : ""}`;
  const linkContent = (
    <>
      {children}
      {arrow ? <ArrowMark /> : null}
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {linkContent}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {linkContent}
    </Link>
  );
}

function ProjectCard({
  project,
  tagsLabel,
  sourceCodeLabel,
  liveDemoLabel,
}: {
  project: ProjectItem;
  tagsLabel: string;
  sourceCodeLabel: string;
  liveDemoLabel: string;
}) {
  const assets = projectAssets[project.id];
  const imageSizes =
    "(min-width: 1344px) 25.83rem, (min-width: 768px) calc((100vw - 6.5rem) / 3), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-brand/40">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-page">
        <ProjectImage
          alt={project.imageAlt}
          sizes={imageSizes}
          src={assets.image}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs font-semibold tracking-wide text-secondary">
            {project.number}
          </span>
          <span aria-hidden="true" className="mt-1 size-2 rounded-full bg-ai" />
        </div>
        <h3 className="mt-7 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-secondary sm:text-base sm:leading-7">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={tagsLabel}>
          {project.tags.map((tag) => (
            <li
              className="rounded-full bg-ai-soft px-2.5 py-1 text-xs font-medium text-ai-ink"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-border pt-4">
          <a
            aria-label={`${sourceCodeLabel}: ${project.title}`}
            className="group/link inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft hover:text-brand-hover focus-visible:outline-offset-2"
            href={assets.githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            <SocialIcon className="size-4" name="github" />
            {sourceCodeLabel}
          </a>
          {assets.demoUrl ? (
            <a
              aria-label={`${liveDemoLabel}: ${project.title}`}
              className="group/link inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft hover:text-brand-hover focus-visible:outline-offset-2"
              href={assets.demoUrl}
              rel="noreferrer"
              target="_blank"
            >
              {liveDemoLabel}
              <ArrowMark />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SkillGroup({
  group,
  highlighted,
}: {
  group: SkillGroupItem;
  highlighted: boolean;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <span
        aria-hidden="true"
        className={`inline-block size-2.5 rounded-full ${highlighted ? "bg-ai" : "bg-brand"}`}
      />
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
        {group.title}
      </h3>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            className="rounded-lg bg-page px-3 py-2 text-sm font-medium text-secondary"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <SiteHeader locale={locale} content={content} />

      <main id="top" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <section
            aria-labelledby="hero-title"
            className="overflow-hidden rounded-3xl bg-hero px-6 py-12 text-hero-ink sm:rounded-4xl sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          >
            <p className="mb-5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.13em] text-hero-muted sm:text-sm">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full bg-ai"
              />
              {content.hero.eyebrow}
            </p>
            <h1
              className="max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-hero-ink sm:text-5xl md:text-6xl lg:text-7xl"
              id="hero-title"
            >
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-hero-muted sm:text-xl sm:leading-8">
              {content.hero.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#projects" variant="primary" arrow>
                {content.hero.projects}
              </ButtonLink>
              <ButtonLink href="#about" variant="dark-outline">
                {content.hero.about}
              </ButtonLink>
            </div>

            <ul
              aria-label={content.hero.areasLabel}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {content.hero.tags.map((tag, index) => (
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
          aria-labelledby="about-title"
          className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
          id="about"
        >
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-8 md:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_18rem] xl:items-center">
            <ProfileImage alt={content.about.imageAlt} />
            <div>
              <SectionHeading
                id="about-title"
                eyebrow={content.about.eyebrow}
                title={content.about.title}
              />
              <p className="max-w-3xl text-base leading-8 text-secondary sm:text-lg">
                {content.about.description}
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-surface p-6 sm:p-8 md:col-start-2 xl:col-start-3 xl:row-start-1">
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {content.about.principlesTitle}
              </h3>
              <ol className="mt-6 space-y-5">
                {content.about.principles.map((principle, index) => (
                  <li
                    className="flex gap-4 text-sm leading-6 text-secondary sm:text-base"
                    key={principle}
                  >
                    <span className="mt-0.5 font-mono text-xs font-semibold text-brand">
                      0{index + 1}
                    </span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section
          aria-labelledby="experience-title"
          className="scroll-mt-8 bg-white/55 px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
          id="experience"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              id="experience-title"
              eyebrow={content.experience.eyebrow}
              title={content.experience.title}
            />
            <ol className="grid gap-4 md:grid-cols-2">
              {content.experience.items.map((item) => (
                <li
                  className="rounded-2xl border border-border bg-surface p-6 sm:p-7"
                  key={`${item.company}-${item.role}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-ink">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-brand">
                        {item.company}
                      </p>
                    </div>
                    <span className="rounded-full bg-page px-3 py-1 text-xs font-medium text-secondary">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-secondary sm:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="projects-title"
          className="scroll-mt-8 bg-white/55 px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
          id="projects"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              id="projects-title"
              eyebrow={content.projects.eyebrow}
              title={content.projects.title}
              description={content.projects.description}
            />
            <div className="grid gap-4 md:grid-cols-3 md:gap-5">
              {content.projects.items.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  liveDemoLabel={content.projects.liveDemo}
                  sourceCodeLabel={content.projects.sourceCode}
                  tagsLabel={content.projects.tagsLabel}
                />
              ))}
            </div>
            <Link
              className="group mt-7 inline-flex min-h-11 items-center rounded-lg px-1 py-2 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              {content.projects.github}
              <ArrowMark />
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="skills-title"
          className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
          id="skills"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              id="skills-title"
              eyebrow={content.skills.eyebrow}
              title={content.skills.title}
            />
            <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
              {content.skills.groups.map((group, index) => (
                <SkillGroup
                  group={group}
                  highlighted={index === 1}
                  key={group.title}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="contact-title"
          className="scroll-mt-8 px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
          id="contact"
        >
          <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-surface p-6 sm:rounded-4xl sm:p-10 lg:p-14">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                  {content.contact.eyebrow}
                </p>
                <h2
                  className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl"
                  id="contact-title"
                >
                  {content.contact.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
                  {content.contact.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={linkedInUrl} variant="primary" external arrow>
                  {content.contact.linkedin}
                </ButtonLink>
                <ButtonLink href={githubUrl} variant="outline" external arrow>
                  {content.contact.github}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-5 pb-7 text-sm text-secondary sm:px-8">
        <p>© Stefano Chiabrando · {content.footer.note}</p>
        <div className="ml-auto flex items-center gap-4">
          <nav
            aria-label={content.footer.socialLinks}
            className="flex items-center gap-1"
          >
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                className={`inline-flex size-10 items-center justify-center rounded-full text-secondary transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${social.hoverColor}`}
                href={social.href}
                key={social.name}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon className="size-5" name={social.name} />
              </a>
            ))}
          </nav>
          <Link
            className="rounded-sm font-medium transition-colors hover:text-brand"
            href="#top"
          >
            {content.footer.backToTop} ↑
          </Link>
        </div>
      </footer>
    </>
  );
}
