"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { ContactContent } from "@/content/types";

type ContactFormCopy = ContactContent["contact"]["form"];
type FormState = "loading" | "ready" | "sending" | "sent" | "error";
type ApiResponse = { ok?: boolean; code?: string; csrfToken?: string };

function countWords(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

export default function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [csrfToken, setCsrfToken] = useState("");
  const [state, setState] = useState<FormState>("loading");
  const [message, setMessage] = useState(copy.loading);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    let active = true;

    fetch("/api/contact.php", {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        const data = (await response.json()) as ApiResponse;
        if (!response.ok || !data.csrfToken) {
          throw new Error("contact_service_unavailable");
        }
        return data.csrfToken;
      })
      .then((token) => {
        if (!active) return;
        setCsrfToken(token);
        setState("ready");
        setMessage("");
      })
      .catch(() => {
        if (!active) return;
        setState("error");
        setMessage(copy.unavailable);
      });

    return () => {
      active = false;
    };
  }, [copy.loading, copy.unavailable]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || !csrfToken) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentMessage = String(formData.get("message") ?? "");
    if (countWords(currentMessage) > 500) {
      setState("error");
      setMessage(copy.tooManyWords);
      return;
    }

    setState("sending");
    setMessage(copy.sending);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          locale: document.documentElement.lang,
          name: formData.get("name"),
          email: formData.get("email"),
          message: currentMessage,
          website: formData.get("website"),
        }),
      });
      const data = (await response.json()) as ApiResponse;

      if (response.ok && data.ok) {
        setState("sent");
        setMessage(copy.sent);
        form.reset();
        setWordCount(0);
        return;
      }

      if (response.status === 429) {
        setMessage(copy.rateLimited);
      } else if (response.status === 422) {
        setMessage(data.code === "word_limit" ? copy.tooManyWords : copy.invalid);
      } else if (response.status === 403 || response.status === 419) {
        setMessage(copy.unavailable);
        setState("error");
        setCsrfToken("");
        window.location.reload();
        return;
      } else if (response.status >= 500) {
        setMessage(copy.unavailable);
      } else {
        setMessage(copy.genericError);
      }
      setState("error");
    } catch {
      setState("error");
      setMessage(copy.unavailable);
    }
  }

  return (
    <form
      className="mt-8 grid max-w-3xl gap-5"
      onSubmit={handleSubmit}
      aria-describedby="contact-form-status contact-message-help"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-ink" htmlFor="contact-name">
            {copy.name} <span className="font-normal text-secondary">({copy.nameOptional})</span>
          </label>
          <input
            autoComplete="name"
            className="min-h-12 rounded-xl border border-border bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-focus/40"
            id="contact-name"
            maxLength={100}
            name="name"
            type="text"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-ink" htmlFor="contact-email">
            {copy.email}
          </label>
          <input
            autoComplete="email"
            className="min-h-12 rounded-xl border border-border bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-focus/40"
            id="contact-email"
            maxLength={254}
            name="email"
            placeholder={copy.emailPlaceholder}
            required
            type="email"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-ink" htmlFor="contact-message">
          {copy.message}
        </label>
        <textarea
          className="min-h-44 resize-y rounded-xl border border-border bg-white px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-focus/40"
          id="contact-message"
          maxLength={10000}
          name="message"
          onChange={(event) => setWordCount(countWords(event.currentTarget.value))}
          required
          rows={6}
        />
        <p className="text-sm text-secondary" id="contact-message-help">
          {copy.messageHelp} <span aria-live="polite">{wordCount}/500</span>
        </p>
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60"
          disabled={state === "loading" || state === "sending" || state === "sent" || !csrfToken}
          type="submit"
        >
          {state === "sending" ? copy.sending : copy.send}
        </button>
        <p
          aria-live="polite"
          className={`text-sm leading-6 ${state === "sent" ? "text-emerald-700" : state === "error" ? "text-red-700" : "text-secondary"}`}
          id="contact-form-status"
          role={state === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
