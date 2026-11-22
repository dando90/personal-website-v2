import SectionHeading from "@/components/ui/section-heading";
import type { ExperienceContent } from "@/content/types";
import ExperienceCard from "@/features/experience/experience-card";

export default function ExperiencePage({
  content,
}: {
  content: ExperienceContent;
}) {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="experience-title"
          eyebrow={content.experience.eyebrow}
          title={content.experience.title}
        />
        <ol className="grid gap-4 md:grid-cols-2">
          {content.experience.items.map((item) => (
            <ExperienceCard
              item={item}
              detailsLabel={content.experience.detailsLabel}
              key={`${item.company}-${item.role}`}
            />
          ))}
        </ol>
        <section aria-labelledby="education-title" className="mt-14 sm:mt-16">
          <h2
            className="mb-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            id="education-title"
          >
            {content.experience.educationTitle}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.experience.education.map((item) => (
              <li
                className="rounded-xl border border-border bg-surface px-5 py-4"
                key={`${item.program}-${item.institution ?? ""}`}
              >
                <h3 className="font-semibold text-ink">{item.program}</h3>
                {item.institution || item.period ? (
                  <p className="mt-1 text-sm text-secondary">
                    {item.institution}
                    {item.institution && item.period ? " · " : ""}
                    {item.period}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
