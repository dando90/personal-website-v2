import Link from "next/link";
import SocialIcon, { type SocialIconName } from "@/components/social-icon";
import type { CommonContent } from "@/content/types";

const socialLinks: {
  name: SocialIconName;
  label: string;
  href: string;
  hoverColor: string;
}[] = [
  {
    name: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/stefanochiabrandoit/",
    hoverColor: "hover:text-[#3b5998]",
  },
  {
    name: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCpTh04i44v7Hc0kL-mOaasA",
    hoverColor: "hover:text-[#c4302b]",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stefanochiabrando/",
    hoverColor: "hover:text-[#0e76a8]",
  },
  {
    name: "github",
    label: "GitHub",
    href: "https://github.com/dando90",
    hoverColor: "hover:text-[#211f1f]",
  },
];

export default function SiteFooter({
  content,
}: {
  content: CommonContent["footer"];
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-wrap items-end gap-4 px-5 pb-7 sm:px-8">
      <div>
        <p className="text-xl font-semibold tracking-tight text-ink">
          © {currentYear} Stefano Chiabrando
        </p>
        <p className="mt-1 text-sm text-secondary">{content.tagline}</p>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <nav
          aria-label={content.socialLinks}
          className="flex items-center gap-1"
        >
          {socialLinks.map((social) => (
            <a
              aria-label={social.label}
              className={`inline-flex size-10 items-center justify-center rounded-full text-secondary transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${social.hoverColor}`}
              href={social.href}
              key={social.name}
              rel="noreferrer"
              target="_blank"
            >
              <SocialIcon className="size-5" name={social.name} />
            </a>
          ))}
        </nav>
        <Link
          className="rounded-sm font-medium transition-colors hover:text-brand"
          href="#top"
        >
          {content.backToTop} ↑
        </Link>
      </div>
    </footer>
  );
}
