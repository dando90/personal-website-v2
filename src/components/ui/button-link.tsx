import Link from "next/link";
import type { ReactNode } from "react";
import ArrowMark from "@/components/ui/arrow-mark";

export default function ButtonLink({
  href,
  variant,
  children,
  external = false,
  arrow = false,
}: {
  href: string;
  variant: "primary" | "dark-outline" | "outline";
  children: ReactNode;
  external?: boolean;
  arrow?: boolean;
}) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-hover",
    "dark-outline":
      "border border-white/25 text-hero-ink hover:border-white/50 hover:bg-white/8",
    outline:
      "border border-border text-ink hover:border-brand/50 hover:bg-brand-soft",
  };
  const className = `inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${styles[variant]}${arrow ? " group" : ""}`;
  const linkContent = (
    <>
      {children}
      {arrow ? <ArrowMark /> : null}
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {linkContent}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {linkContent}
    </Link>
  );
}
