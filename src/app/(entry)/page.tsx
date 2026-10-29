import LocaleRedirect from "@/components/locale-redirect";
import PortfolioPage from "@/components/portfolio-page";

export default function EntryPage() {
  return (
    <>
      <LocaleRedirect />
      <PortfolioPage locale="en" />
    </>
  );
}
