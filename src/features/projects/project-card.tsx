import ProjectImage from "@/components/project-image";
import SocialIcon from "@/components/social-icon";
import ArrowMark from "@/components/ui/arrow-mark";
import type { ProjectsContent } from "@/content/types";
import { projectAssets } from "@/lib/project-assets";

type ProjectItem = ProjectsContent["projects"]["items"][number];

export default function ProjectCard({
  project,
  content,
}: {
  project: ProjectItem;
  content: ProjectsContent["projects"];
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
        <h2 className="mt-7 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {project.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-secondary sm:text-base sm:leading-7">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={content.tagsLabel}>
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
            aria-label={`${content.sourceCode}: ${project.title}`}
            className="group/link inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft hover:text-brand-hover focus-visible:outline-offset-2"
            href={assets.githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            <SocialIcon className="size-4" name="github" />
            {content.sourceCode}
          </a>
          {assets.demoUrl ? (
            <a
              aria-label={`${content.liveDemo}: ${project.title}`}
              className="group/link inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft hover:text-brand-hover focus-visible:outline-offset-2"
              href={assets.demoUrl}
              rel="noreferrer"
              target="_blank"
            >
              {content.liveDemo}
              <ArrowMark />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
