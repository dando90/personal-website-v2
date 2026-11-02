import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";
import ArrowMark from "@/components/ui/arrow-mark";
import type { ProjectsContent } from "@/content/types";
import ProjectCard from "@/features/projects/project-card";

const githubUrl = "https://github.com/dando90";

export default function ProjectsPage({
  content,
}: {
  content: ProjectsContent;
}) {
  return (
    <section className="bg-white/55 px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
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
              content={content.projects}
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
  );
}
