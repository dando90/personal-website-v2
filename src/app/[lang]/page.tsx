import LocalizedPage, {
  localizedPageMetadata,
  type LocalizedPageProps,
} from "@/lib/localized-page";

export function generateMetadata({ params }: LocalizedPageProps) {
  return localizedPageMetadata(params, "home");
}

export default function HomeRoute({ params }: LocalizedPageProps) {
  return <LocalizedPage params={params} page="home" />;
}
