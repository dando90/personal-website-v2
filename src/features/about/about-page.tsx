import ProfileImage from "@/components/profile-image";
import SectionHeading from "@/components/ui/section-heading";
import type { AboutContent } from "@/content/types";

export default function AboutPage({ content }: { content: AboutContent }) {
  const about = content.about;

  return (
    <section
      aria-labelledby="about-title"
      className="px-5 py-12 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-8 md:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_18rem] xl:items-center">
        <ProfileImage alt={about.imageAlt} />
        <div>
          <SectionHeading
            id="about-title"
            eyebrow={about.eyebrow}
            title={about.title}
            description={about.description}
          />
        </div>
        <aside className="rounded-2xl border border-border bg-surface p-6 sm:p-8 md:col-span-2 md:col-start-1 xl:col-span-1 xl:col-start-3 xl:row-start-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            {about.principlesTitle}
          </h2>
          <ol className="mt-6 space-y-5">
            {about.principles.map((principle, index) => (
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
  );
}
