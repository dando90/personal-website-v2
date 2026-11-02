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
              key={`${item.company}-${item.role}`}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
