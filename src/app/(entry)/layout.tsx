/* eslint-disable @next/next/no-sync-scripts -- The root locale check must finish before the English static body can paint. */
import type { Metadata } from "next";
import "@/app/globals.css";
import { getSiteContent } from "@/content";
import { geistMono, geistSans } from "@/lib/fonts";

const siteUrl = "https://www.stefanochiabrando.com";
const homeMetadata = getSiteContent("en").home.metadata;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: homeMetadata.title,
  description: homeMetadata.description,
  alternates: {
    canonical: "/en/",
    languages: {
      en: "/en/",
      it: "/it/",
      es: "/es/",
      "x-default": "/en/",
    },
  },
};

export default function EntryLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script src="/locale-bootstrap.js" />
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
