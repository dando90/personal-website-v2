import type { SkillsContent } from "@/content/types";

type SkillGroupItem = SkillsContent["skills"]["groups"][number];

export default function SkillGroup({
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
      <h2 className="mt-5 text-lg font-semibold tracking-tight text-ink">
        {group.title}
      </h2>
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
