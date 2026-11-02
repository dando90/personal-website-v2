import HomePage from "@/features/home/home-page";
import SiteLayout from "@/components/layout/site-layout";
import { getSiteContent } from "@/content";

export default function EntryPage() {
  const content = getSiteContent("en");

  return (
    <SiteLayout locale="en" page="home" content={content.common}>
      <HomePage locale="en" home={content.home} common={content.common} />
    </SiteLayout>
  );
}
