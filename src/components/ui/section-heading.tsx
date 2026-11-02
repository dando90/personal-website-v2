export default function SectionHeading({
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
      <h1
        className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl"
        id={id}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
