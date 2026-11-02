import SectionHeading from "@/components/ui/section-heading";
import type { SkillsContent } from "@/content/types";
import SkillGroup from "@/features/skills/skill-group";

export default function SkillsPage({ content }: { content: SkillsContent }) {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
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
  );
}
