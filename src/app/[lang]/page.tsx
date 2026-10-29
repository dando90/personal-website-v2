import { notFound } from "next/navigation";
import PortfolioPage from "@/components/portfolio-page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedPage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <PortfolioPage locale={lang} />;
}
