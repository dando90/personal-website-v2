"use client";

import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  localeNames,
  localePreferenceKey,
  locales,
  type Locale,
} from "@/lib/i18n";

export default function LocaleSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();

  function changeLocale(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.currentTarget.value as Locale;

    try {
      window.localStorage.setItem(localePreferenceKey, nextLocale);
    } catch {
      // Navigation still works when storage is unavailable.
    }

    document.documentElement.lang = nextLocale;
    router.push(`/${nextLocale}/`);
  }

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-secondary">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink transition-colors hover:border-brand focus-visible:outline-offset-2"
        value={locale}
        onChange={changeLocale}
      >
        {locales.map((option) => (
          <option key={option} value={option}>
            {localeNames[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
