import type { ExperienceContent } from "@/content/types";

export type ExperienceItem = ExperienceContent["experience"]["items"][number];

export default function ExperienceCard({
  item,
}: {
  item: ExperienceItem;
}) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            {item.role}
          </h2>
          <p className="mt-1 text-sm font-medium text-brand">{item.company}</p>
        </div>
        <span className="rounded-full bg-page px-3 py-1 text-xs font-medium text-secondary">
          {item.period}
        </span>
      </div>
      <p className="mt-5 text-sm leading-7 text-secondary sm:text-base">
        {item.description}
      </p>
    </li>
  );
}
