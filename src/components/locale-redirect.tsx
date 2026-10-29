"use client";

import { useEffect } from "react";
import { localePreferenceKey, resolveLocale } from "@/lib/i18n";

export default function LocaleRedirect() {
  useEffect(() => {
    let savedLocale: string | null = null;

    try {
      savedLocale = window.localStorage.getItem(localePreferenceKey);
    } catch {
      // Storage can be disabled; browser language detection still works.
    }

    const browserLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const locale = resolveLocale(browserLanguages, savedLocale);

    if (locale !== "en") {
      window.location.replace(`/${locale}/`);
    }
  }, []);

  return null;
}
