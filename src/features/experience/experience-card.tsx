import type { ExperienceContent } from "@/content/types";

export type ExperienceItem = ExperienceContent["experience"]["items"][number];

export default function ExperienceCard({
  item,
  detailsLabel,
}: {
  item: ExperienceItem;
  detailsLabel: string;
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
      <details className="group mt-5 border-t border-border pt-4">
        <summary className="flex w-fit cursor-pointer list-none items-center gap-2 rounded text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
          {detailsLabel}
          <svg
            aria-hidden="true"
            className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </summary>
        <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-secondary marker:text-brand sm:text-base sm:leading-7">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </details>
    </li>
  );
}
