import ButtonLink from "@/components/ui/button-link";
import type { ContactContent } from "@/content/types";

const githubUrl = "https://github.com/dando90";
const linkedInUrl = "https://www.linkedin.com/in/stefanochiabrando/";

export default function ContactPage({ content }: { content: ContactContent }) {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-surface p-6 sm:rounded-4xl sm:p-10 lg:p-14">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              {content.contact.eyebrow}
            </p>
            <h1
              className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl"
              id="contact-title"
            >
              {content.contact.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              {content.contact.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={linkedInUrl} variant="primary" external arrow>
              {content.contact.linkedin}
            </ButtonLink>
            <ButtonLink href={githubUrl} variant="outline" external arrow>
              {content.contact.github}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
