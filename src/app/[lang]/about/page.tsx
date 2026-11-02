import LocalizedPage, {
  localizedPageMetadata,
  type LocalizedPageProps,
} from "@/lib/localized-page";

export function generateMetadata({ params }: LocalizedPageProps) {
  return localizedPageMetadata(params, "about");
}

export default function AboutRoute({ params }: LocalizedPageProps) {
  return <LocalizedPage params={params} page="about" />;
}
